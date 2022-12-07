import Axios from "axios";
import "./App.css";
import { useEffect, useState, React } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

export function App() {
  let [rowData, setRowData] = useState();
  useEffect(() => {Axios.get('http://localhost:5100/people').then((res) => {setRowData(res.data)})}, [])
  
  const deleteButton = (params) => {
    Axios.delete(`http://localhost:5100/delete/${params.data.id}`)
    alert(`Person #${params.data.id} has been deleted`)
    Axios.get('http://localhost:5100/people').then((res) => {setRowData(res.data)})
  }

  const edit = (column, params) => {
    let ans = prompt(`Edit the ${column}`)
    Axios.put(`http://localhost:5100/people/update/${column}/${params.data.id}`, {[column]: ans})
    alert(`Person #${params.data.id}'s ${column} has been updated`)
    Axios.get('http://localhost:5100/people').then((res) => {setRowData(res.data)})
  }

  const columnDefs = [
    {field: "id", width: 100},
    {field: "first_name", cellRenderer: (params) => <div>{params.data.first_name} <button type='button' onClick={()=>edit('first_name', params)}><i className="fa fa-pencil"></i></button></div>},
    {field: "last_name", cellRenderer: (params) => <div>{params.data.last_name} <button type='button' onClick={()=>edit('last_name', params)}><i className="fa fa-pencil"></i></button></div>},
    {field: "image", width:100, cellRenderer: (params) => <div><img href={params.data.image} alt='Person'></img></div>},
    {field: "email", width:300, cellRenderer: (params) => <div>{params.data.email} <button type='button' onClick={()=>edit('email', params)}><i className="fa fa-pencil"></i></button></div>},
    {field: "city", cellRenderer: (params) => <div>{params.data.city} <button type='button' onClick={()=>edit('city', params)}><i className="fa fa-pencil"></i></button></div>},
    {field: "country", cellRenderer: (params) => <div>{params.data.country} <button type='button' onClick={()=>edit('country', params)}><i className="fa fa-pencil"></i></button></div>},
    {headerName: 'Delete', width: 100, cellRenderer: (params) => <div><button type='button' onClick={()=>deleteButton(params)}><i className="fa fa-trash"></i></button></div>}
  ];

  const defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 777, width: 'auto' }}>
      <AgGridReact
        rowData={rowData}
        pagination
        paginationPageSize={20}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
