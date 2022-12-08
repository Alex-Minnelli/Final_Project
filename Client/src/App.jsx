import Axios from "axios";
import "./App.css";
import { useCallback, useEffect, useState, React } from 'react';
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

/*   const edit = (column, params) => {
    let ans = prompt(`Edit the ${column}`)
    Axios.put(`http://localhost:5100/people/update/${column}/${params.data.id}`, {[column]: ans})
    alert(`Person #${params.data.id}'s ${column} has been updated`)
    Axios.get('http://localhost:5100/people').then((res) => {setRowData(res.data)})
  } */

  const editButton = (params) => {
    
  }

  const columnDefs = [
    {field: "id", width: 100},
    {field: "first_name",editable: true, cellRenderer: (params) => <div>{params.data.first_name}</div>},
    {field: "last_name",editable: true, cellRenderer: (params) => <div>{params.data.last_name}</div>},
    {field: "image",editable: true, width:100, cellRenderer: (params) => <div><img src={`${params.data.image}`} alt='Person'></img></div>},
    {field: "email",editable: true, width:300, cellRenderer: (params) => <div>{params.data.email}</div>},
    {field: "city",editable: true, cellRenderer: (params) => <div>{params.data.city} </div>},
    {field: "country",editable: true, cellRenderer: (params) => <div>{params.data.country}</div>},
    {headerName: 'Delete', width: 100,editable: true, cellRenderer: (params) => <div><button type='button' onClick={()=>deleteButton(params)}><i className="fa fa-trash"></i></button></div>},
    {headerName: 'Edit(NON FUNCTIONAL ATM)', width: 100,editable: true, cellRenderer: (params) => <div><button type='button' onClick={()=>editButton(params)}><i className="fa fa-pencil"></i></button></div>},
  ];

  const defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
  };

  const onCellValueChanged = useCallback((event) => {
    Axios.put(`http://localhost:5100/people/update/${event.data.id}`, {first_name: event.data.first_name, last_name: event.data.last_name, image: event.data.image, email: event.data.email, city: event.data.city,country: event.data.country})
  }, []);

  const addPerson = () => {
    let fName = prompt(`Enter the Person's First Name`)
    let lName = prompt(`Enter the Person's Last Name`)
    let image = prompt(`Enter the Person's Image`)
    let email = prompt(`Enter the Person's Email`)
    let city = prompt(`Enter the Person's City`)
    let country = prompt(`Enter the Person's Country`)
    Axios.post('http://localhost:5100/people/add', {first_name: fName, last_name: lName, image: image, email: email, city: city, country: country})
    alert(`Person has been added`)
    Axios.get('http://localhost:5100/people').then((res) => {setRowData(res.data)})
  }

  return (
    <div>
      <div className="parent">
        <h1 className="title">People</h1>
        <button className='button' type='button' onClick={()=>addPerson()}>Add Person</button>
      </div>
      <div className="ag-theme-alpine-dark" style={{ height: 691, width: 'auto' }}>
        <AgGridReact
          rowData={rowData}
          pagination
          paginationPageSize={50}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
          />
      </div>
    </div>
  );
}
