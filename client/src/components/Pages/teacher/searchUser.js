import React , {useState,useEffect} from 'react';
import { DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import { TextField ,InputAdornment, Select ,InputLabel , MenuItem } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import SimplePopover from "../helper/popover.js"


export default function SearchUser() {
  
  const [user, setUser] = useState();
  const [filter, setFilter] = useState('name');
  const [items, setItems] = useState();

  useEffect(() => {
    axios.get('/users')
      .then(data => {
        console.log(data.data.user)
        setUser(data.data.user);
      })
  }, []);
  useEffect(() => {
    setItems(user);
  },[user])


  const handleSearch = e => {
    let target = e.target;
    console.log(target.value);
    if (target.value === "")
    {
      setItems(user);
    }
    else
    {
      
      filter === 'name' && setItems(user.filter(x => x.name.toString().toLowerCase().includes(target.value.toString().toLowerCase())))
      filter === 'email' && setItems(user.filter(x => x.email.toString().toLowerCase().includes(target.value.toLowerCase())))
      filter === 'department' && setItems(user.filter(x => x.department.toString().toLowerCase().includes(target.value.toLowerCase())))
      filter === 'type' && setItems(user.filter(x => x.type.toString().toLowerCase().includes(target.value.toLowerCase())))
    }
  }



  const handleFilter = e => {
    console.log(e.target.value);
    setFilter(e.target.value);
  }
  if (!items)
  {
    return <div>No user found!!</div>
  }
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'rollno', headerName: 'Roll No', width: 130 },
    { field: 'programme', headerName: 'Programme', width: 130 },
    { field: 'department', headerName: 'Department', width: 180 },
    { field: 'type', headerName: 'User Type', width: 130 },
    {
      field: 'forms', headerName: 'User Forms', width: 140,
      renderCell: (params) => (
        <SimplePopover forms = {params} />
      ),
    }
  ];
  
  const rows = items.map((data, index) => {
    return ({
      id: index,
      name: data.name,
      email: data.email,
      rollno: data.rollno,
      programme : data.programme,
      department: data.department,
      type: data.type,
      forms : data.forms
    })
    })
  

  return (
    // <div>heloo</div>
    <div style={{ height: '70vh', width: '100%' }}>
      <div style={{ display: 'flex' }}>
       <InputLabel id="select">Filter By:</InputLabel>
        <Select labelId="label"
          id="select"
          value={filter}
          onChange={handleFilter}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="department">Department</MenuItem>
          <MenuItem value="type">User Type</MenuItem>
      </Select>
      <TextField
        style={{ width: '75%' , margin: 10 , justifyItems: 'flex-end'}}
         placeholder= {`search user by ${filter}`}
         InputProps={{
             startAdornment: (<InputAdornment position="start">
                 <Search />
             </InputAdornment>)
         }}
         onChange={handleSearch}
      />
      
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        disableColumnMenu={true}
      />
    </div>
   
  );
}

  