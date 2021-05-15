import React, { useState } from 'react';
import {Grid,Paper } from '@material-ui/core';
// import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Select, NativeSelect } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import * as Yup from 'yup';

import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

  
 const AddNewUser = () => {
    
   const [buttonText, SetButtonText] = useState("Submit");
   const [program, setProgram] = useState('teacher');
   const [department, setDepartment] = useState('teacher');
   const [usertype, setType] = useState('teacher');
  //  const history = useHistory();
   
  const marginBottom = {
        marginBottom:20
 };
 const paperStyle={
    padding:20,
    height:'auto',
    width:400,
    margin:'20px auto'
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle} >
              <Formik
              initialValues={{ name: '', email: '' ,confirm_password: '',password: '',rollno : ''}}
            validationSchema={Yup.object({
                name: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Required'),
               email: Yup.string().email('Invalid email address').required('Please Enter Email'), 
                password: Yup.string().min(1).max(20).required('please enter passsword'),
                confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Required'),
              })}

              onSubmit={(values,{resetForm}) => {

                SetButtonText("Submitting ...");
                console.log(values);
                console.log(department);
                console.log(usertype);
                console.log(program);
                if (values.rollno === '')
                {
                  values.rollno = 'NIL'
                }
                let user = {
                  name: values.name,
                  email: values.email,
                  confirm_password: values.confirm_password,
                  password: values.password,
                  department: department,
                  type: usertype,
                  rollno: values.rollno,
                  programme: program
                }
                axios.post(`/create-student`,user )
                .then(res => {
                  console.log(res);
                  if(res.data.error){
                    toast.error(res.data.message, {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  }else{
                    toast.success(res.data.message, {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  }
                  // to done later add redirect route

                  SetButtonText('Submit');
                  resetForm();
                });
              }
              }
            
            
            
          >
            {(p) => (
              <Form>

                <FormControl fullWidth variant="outlined" style={marginBottom}>
                  <InputLabel component='label' htmlFor="type">User Type</InputLabel>
                  <NativeSelect
                  label="UserType"
                    name="type"
                    value ={usertype}
                    onChange={(e) => {
                      setType(e.target.value);
                      e.target.value === 'student' && setProgram('btech');
                      e.target.value === 'student' && setDepartment('Electronics Communication Engineering');
                      e.target.value === 'teacher' && setProgram('teacher');
                      e.target.value === 'teacher' && setDepartment('teacher');
                    }}
                  >
                    <option value = 'student'>Student</option>
                    <option value = 'teacher'>Teacher</option>
                  </NativeSelect>
                </FormControl>

                <label htmlFor="name"></label>
                <Field as={TextField} 
                style={marginBottom}
                  name="name" 
                  placeholder="name" 
                  fullWidth
                   label="name" 
                   error={p.errors.name&&p.touched.name}
                   helperText={<ErrorMessage   name="name" />}
                   type="text " />
            
                <label htmlFor="email"></label>
                <Field as={TextField} 
                style={marginBottom}
                 name="email" 
                 placeholder="Email"
                  fullWidth
                   label="Email"
                   error={p.errors.email&&p.touched.email}
                   helperText={<ErrorMessage   name="email" />}
                  type="email" />

                {usertype === 'student' && <div>
               
                  <label htmlFor="rollno"></label>
                <Field as={TextField} 
                style={marginBottom}
                  name= "rollno" 
                  placeholder= "Roll No" 
                  fullWidth
                   label="Roll No" 
                   error={p.errors.name && p.touched.rollno}
                   helperText={<ErrorMessage   name="name" />}
                   type="text " />
                <FormControl fullWidth variant="outlined" style={marginBottom}>
                  <InputLabel component='label' htmlFor="type">Programme</InputLabel>
                  <Select
                  label="programme"
                    native
                    inputProps={{
                      name: 'programme',
                      id: 'outlined-age-native-simple',
                    }}
                      onChange={(e) => {
                        setProgram(e.target.value);
                        e.target.value === 'mba' && setDepartment('mba');
                        e.target.value === 'mca' && setDepartment('mca');

                      }}
                  >
                    <option value= 'btech' >B.Tech</option>
                    <option value='mtech'>M.Tech</option>
                    <option value='phd'>Ph.D</option>
                    <option value='mca'>MCA</option>
                    <option value='mba'>MBA</option>

                  </Select>
                </FormControl>
            
                {program === 'btech' &&
                    <FormControl fullWidth variant="outlined" style={marginBottom}>
                    <InputLabel component='label' htmlFor="department">Department</InputLabel>
                    <Select
                    label="Department"
                      native
                      inputProps={{
                        name: 'department',
                        id: 'outlined-age-native-simple',
                      }}
                      onClick={(e) => { setDepartment(e.target.value);}}
                    >
                    <option value= 'Electronics Communication Engineering' >Electronics & Communication Engineering</option>
                    <option value='Computer Engineering'>Computer Engineering</option>
                    <option value='Information Technology'>Information Technology</option>
                    <option value='Industrial Engineering Management'>Industrial Engineering & Management</option>
                    <option value='Electrical Engineering'>Electrical Engineering	</option>
                    <option value='Civil Engineering'>Civil Engineering	</option>
                    </Select>
                  </FormControl>
                }
                
                {program === 'mtech' &&
                    <FormControl fullWidth variant="outlined" style={marginBottom}>
                    <InputLabel component='label' htmlFor="department">Department</InputLabel>
                    <Select
                    label="Department"
                      native
                      inputProps={{
                        name: 'department',
                        id: 'outlined-age-native-simple',
                      }}
                      onChange={(e) => { setDepartment(e.target.value);}}
                    >
                    <option value= 'Electronics Communication Engineering' >Electronics & Communication Engineering</option>
                    <option value='Electrical Engineering'>Electrical Engineering	</option>
                    <option value='Civil Engineering'>Civil Engineering	</option>
                    <option value='Mechanical Engineering'> Mechanical Engineering	</option>
                    <option value='Physics'>Physics	</option>
                    <option value='Computer Engineering'>Computer Engineering	</option>
                    <option value='School of VLSI Design Embedded Systems'>CSchool of VLSI Design & Embedded Systems	</option>
                    <option value=' School of Energy and Efficiency'> School of Energy and Efficiency	</option>
                    </Select>
                  </FormControl>
                }
                 {program === 'phd' &&
                    <FormControl fullWidth variant="outlined" style={marginBottom}>
                    <InputLabel component='label' htmlFor="department">Department</InputLabel>
                    <Select
                    label="Department"
                      native
                      inputProps={{
                        name: 'department',
                        id: 'outlined-age-native-simple',
                      }}
                      onChange={(e) => { setDepartment(e.target.value);}}
                    >
                    <option value= 'Engineering Departments/Schools' > Engineering Departments/Schools</option>
                    <option value='Sciences'>Sciences </option>
                    <option value='Humanities & Social Sciences'>Humanities & Social Sciences</option>
                    <option value='Deptt. of Computer Applications'>Deptt. of Computer Applications</option>
                    <option value=' Deptt. of Business Administration'> Deptt. of Business Administration</option>
                    </Select>
                  </FormControl>
                }
                  {program === 'mba' &&
                    <FormControl fullWidth variant="outlined" style={marginBottom}>
                    <InputLabel component='label' htmlFor="department">Department</InputLabel>
                    <Select
                    label="Department"
                      native
                      inputProps={{
                        name: 'department',
                        id: 'outlined-age-native-simple',
                      }}
                      onChange={(e) => { setDepartment(e.target.value);}}
                    >
                    <option value= 'mba' default>MBA</option>
                    </Select>
                    </FormControl>
                }
                {program === 'mca' &&
                    <FormControl fullWidth variant="outlined" style={marginBottom}>
                    <InputLabel component='label' htmlFor="department">Department</InputLabel>
                    <Select
                    label="Department"
                      native
                      inputProps={{
                        name: 'department',
                        id: 'outlined-age-native-simple',
                      }}
                      onChange={(e) => { setDepartment(e.target.value);}}
                    >
                    <option value= 'mca' default>MCA</option>
                    </Select>
                  </FormControl>
                }
                </div>}
                <Field as={TextField} 
                style={marginBottom}
                  name="password"
                 placeholder="Enter Password"
                 fullWidth label="Password" 
                 error={p.errors.password&&p.touched.password}
                   helperText={<ErrorMessage   name="password" />}
                 type="text" />

                <Field as={TextField}
                 style={marginBottom} 
                 name="confirm_password"
                 placeholder="Enter Password Again" fullWidth label="Confirm Password" 
                 error={p.errors.confirm_password&&p.touched.confirm_password}
                   helperText={<ErrorMessage   name="confirm_password" />}
                 type="text" />

                  <Button
                    type="submit"
                    style={marginBottom}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >{ buttonText }</Button>
              </Form>
            )}
            </Formik>
        </Paper>
      </Grid>
      </div>
  );
}

export default AddNewUser;