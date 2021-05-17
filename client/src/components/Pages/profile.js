import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import "../../App.css";
import Spinner from './helper/spinner';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:"flex",
    justifyContent:"center"
  },
  input:{
    padding:0
  },
  paper: {
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin:'-0.2rem 0.6rem'
  },
}));

const About = () => {
  let [user, setUser] = useState('');
  const classes=useStyles();

  useEffect(() => {
    // getting user details by api call
    axios.get(`/api/user/${localStorage.getItem('userId')}`)
      .then((data) => {
        //console.log(data.data.user);
        setUser(data.data.user);
      });
  },[]);
  if (!user)
  {
    return <Spinner />
    // return <div>No user found!!</div>
  }
  return (
    <>
    <div className={classes.root}>
      <Grid style={{width:"40vw"}}>
        <Paper elevation={10} style={{padding:"0 0 2rem 0"}}>
            <Grid item style={{display:"flex",justifyContent:"center",padding:"1rem"}} >
            <Avatar
              style={{
                height:'100px',
                width:'100px',
                backgroundColor: '#3f51b5',
                textTransform: "uppercase"
              }}>
              {user && user.name && user && user.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <h3 >
                            Name :
                  </h3>
              </Grid>
              <Grid item xs={6} style={{textTransform:"capitalize"}}>
              {user && user.name}
              </Grid>
            </Grid>
            {
              user && user.type==="student"?
              (
                <Grid container xs={12} style={{marginBottom:"20px"}}>
                <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <h3>
                              RollNo :
                    </h3>
                </Grid>
                <Grid item xs={6} >
                {user && user.rollno}
                </Grid>
              </Grid>
              ):null
            }
            
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h3>
                            Email:
                  </h3>
              </Grid>
              <Grid item xs={6} >
              {user && user.email}
              </Grid>
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                 <h3 >
                        Program :
                  </h3>
              </Grid>
              <Grid item xs={6} >
              {user && user.programme}
              </Grid>
            </Grid>
            <Grid container xs={12} style={{marginBottom:"20px"}}>
              <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <h3>
                            Department:
                  </h3>
              </Grid>
              <Grid item xs={6} >
              {user && user.department}
              </Grid>
            </Grid>
         </Paper>
        </Grid>
    </div>
    </>
  );
};
  
export default About;