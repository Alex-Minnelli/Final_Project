import Axios from "axios";
import "./App.css";
import { useEffect, useState, React } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

export function App() {
  let [rowData, setRowData] = useState();
  useEffect(() => {Axios.get('http://localhost:5100/people').then((res) => {setRowData(res.data)})}, [])
  
  const actionButton = (params) => {
    Axios.delete(`http://localhost:5100/delete/${params.data.id}`)
    alert(`Person #${params.data.id} has been deleted`)
    Axios.get('http://localhost:5100/people').then((res) => {setRowData(res.data)})
  }

  const columnDefs = [
    { field: "id", width: 100},
    { field: "first_name", cellRenderer: (params) => <div>{params.data.first_name} <button type='button'><i class="fa fa-pencil"></i></button></div>},
    { field: "last_name", cellRenderer: (params) => <div>{params.data.last_name} <button type='button'><i class="fa fa-pencil"></i></button></div>},
    { field: "image", width:100, cellRenderer: (params) => <div><img href={params.data.image} alt='Person'></img></div>},
    { field: "email", width:400, cellRenderer: (params) => <div>{params.data.email} <button type='button'><i class="fa fa-pencil"></i></button></div>},
    { field: "city", cellRenderer: (params) => <div>{params.data.city} <button type='button'><i class="fa fa-pencil"></i></button></div>},
    { field: "country", cellRenderer: (params) => <div>{params.data.country} <button type='button'><i class="fa fa-pencil"></i></button></div>},
    { headerName: 'Delete', width: 100, cellRenderer: (params) => <div><button type='button' onClick={()=>actionButton(params)}><i class="fa fa-trash"></i></button></div>}
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
