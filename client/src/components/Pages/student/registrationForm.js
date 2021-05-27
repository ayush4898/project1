import React, { useEffect, useState } from 'react';
import {Grid,Paper } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Select , MenuItem} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import * as Yup from 'yup';
import firebase from 'firebase/app';
import 'firebase/storage'; 
import Notification from '../../toasts'
import Spinner from '../helper/spinner';


function RegistrationForm() {
  const [user, setUser] = useState();
  const [uploadedFile, setFile] = useState(null);
  const [fileUrl, setUrl] = useState();
  const [semester, setSemester] = React.useState('');
  const [buttonText,SetButtonText] = useState("Submit")
  const history = useHistory();

  useEffect(() => {
    axios.get(`/api/user/${localStorage.userId}`)
      .then((data) => {
        //console.log('user data', data.data.user);
        setUser(data.data.user);
      });
   }, []);

  // const handleFile = async (uploadedFile) => {
  //   try {
      
  //     let file = uploadedFile[0];
  //     const storageRef = firebase.storage().ref();
  //     const emailRef = storageRef.child(user.email);
  //     const fileRef = emailRef.child(file.name);
  //     await fileRef.put(file);
  //     const fileUrl = await fileRef.getDownloadURL();
  //     setUrl(fileUrl);
  //   } catch (error) {
  //     //console.log(`error!!`, error);
  //   }
    
  // };
  const handleFile = async (uploaded) => {
    let file = uploaded[0]; 
    await setFile(file) 
  };
  const initialValues={
    // name: '', email: '', department: '',programme:""
  };
  const validationSchema=Yup.object({
    // name: Yup.string().required('Required'),
    // email: Yup.string().email('Invalid email address').required('Required'),
    // department: Yup.string().required('Required'),
    // programme: Yup.string().required('Required'),
  });
  const onSubmit = async (value, { resetForm }) => {
    SetButtonText("Submitting ...");
    try {
     //handleFile(uploadedFile);
     const fileRef = await firebase.storage().ref(`${user.email}/${semester}/${uploadedFile.name}`);
        await fileRef.put(uploadedFile);
      const url=await fileRef.getDownloadURL();
       await setUrl(url);
     //console.log(value);
     
     let form = {
       name: user.name,
       email: user.email,
       department: user.department,
       programme: user.programme,
       semester: semester,
       fileUrl: fileUrl
     }
    
     let data = await axios.post(`/api/student/uploadForm/${localStorage.userId}`, form);
     //console.log(data);

     SetButtonText('submit');
     setSemester('');
     resetForm();
     data.data.isSubmit && Notification('success', data.data.message);
     !data.data.isSubmit && Notification('fail', data.data.message); 
     
   } catch (error) {
     //console.log(error);
       Notification('fail', error); 
   }
  };


  const marginBottom = {
        marginBottom:20
 };
 const paperStyle={
    padding:20,
    height:'auto',
    width: '45vw',
    margin:'20px auto'
  };
  const handleChange = (event) => {
    setSemester(event.target.value);
    //console.log('user', user.email);
  };

  if (!user) return <Spinner />
  
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle} >
              <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(p) => (
              <Form>

                <Field as={TextField} 
                style={{textTransform:"capitalize",marginBottom:"20px"}}
                 name="name"
                  placeholder="name"
                   fullWidth
                    type="text"
                  label={user && user.name}
                  disabled
                  error={p.errors.name&&p.touched.name}
                  helperText={<ErrorMessage   name="name" />}
                  />
            
                <label htmlFor="email"></label>
                <Field as={TextField}
                 style={marginBottom}
                  name="email" 
                  placeholder="Email"
                   fullWidth 
                  label={user &&user.email}
                  disabled
                   error={p.errors.email&&p.touched.email}
                  helperText={<ErrorMessage   name="email" />}
                    type="email" />

                <label htmlFor="programme"></label>
                <Field 
                as={TextField}
                style={{textTransform:"uppercase",marginBottom:"20px"}} 
                 name="programme"
                  placeholder="programme" 
                  fullWidth 
                  label={user && user.programme}
                  disabled 
                  error={p.errors.programme&&p.touched.programme}
                  helperText={<ErrorMessage   name="programme" />}
                  type="text" />
            
                <label htmlFor="department"></label>
                <Field as={TextField} 
                style={{textTransform:"uppercase",marginBottom:"20px"}} 
                 name="department"
                  placeholder="department"
                   fullWidth
                   label={user && user.department}
                   disabled
                    error={p.errors.department&&p.touched.department}
                  helperText={<ErrorMessage   name="department" />}
                     type="text" />
               
                <FormControl fullWidth variant="outlined" style={marginBottom}>
                  <InputLabel htmlFor="semester" id="demo-simple-select-label">Semester</InputLabel>
                  <Select 
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name = "semester"
                    value={semester}
                    label="semester"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>

                    {/* <option aria-label="None" value="" />
                    <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value= "8">8</option> */}
                  </Select>
                </FormControl>
                 <input
                    onChange={(e)=>handleFile(e.target.files)}
                    id="contained-button-file"
                    type="file"
                    style={{marginBottom: 10}} />
                  <label htmlFor="contained-button-file">
                </label>
                <br />
                <small style={{marginBottom : '5px'}}>*NOTE* Please upload the <strong>pdf format as name_rollno.pdf</strong></small>
                <br />
                <small style={{marginBottom : '10px'}}>*NOTE* Upload all the recipts in one pdf</small>
                  <Button
                    type="submit"
                    style={marginBottom , {marginTop : '20px'}}
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


export default RegistrationForm;



