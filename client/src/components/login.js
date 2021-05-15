import React, { useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
 import { Formik, Field,Form, ErrorMessage } from 'formik';
 import { GoogleLogin } from 'react-google-login';
 import * as Yup from 'yup';
import axios from 'axios';
import Notification from './toasts';
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
          Your Website {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://www.collegesearch.in/upload/institute/images/large/120928033013_xx.png)',
      opacity: 0.8,
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const Login = (props) => {

    const classes = useStyles();
    
  const checkBoxStyle={
    margin:20,
    fontSize:'1.5rem'
  };
  const [response, setResponse] = useState({
    valid: "",
    message: "",
    id: "",
  });
    
  const responseSuccessGoogle = (res) => {
      axios({
        method: "POST",
        url: 'http://localhost:8000/googleLogin',
        data: { tokenId: res.tokenId }
      }).then((respond) => {
        setResponse({
          ...response,
          id: respond.data.id,
          valid: respond.data.valid,
          message: respond.data.message,
        });
        return respond;
      })
        .then((respond) => {
          if (respond.data.valid) {
            localStorage.setItem("userId", respond.data.id);
            localStorage.setItem("userType", respond.data.type);
            props.handleUser(respond.data.id);
            props.handleIsStudent((respond.type === 'student') ? true : false);
            props.handleIsLogin(respond.data.valid);
          }
          return respond;
        })
        .then((respond) => {
          respond.data.valid && Notification("success", respond.data.message);
          !respond.data.valid && Notification("fail", respond.data.message);
        })
        .catch((err) => { console.log(err) });
    };
  const responseErrorGoogle=(res)=>{
    console.log('error');
  };
  const validationSchema=Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
      .min(1, 'Password Must be four characters long!')  //to increase limit later
      .max(20, 'Too Long!').required('Required'),
      type: Yup.string().required('Required')
  });
  const initialValues={
    email: '',
     password: '',
    type: 'student'
  };
  const onSubmit=(values)=>{
      
    const user = {
      email: values.email,
      password: values.password,
      type: values.type
      };
      axios.post('http://localhost:8000/', user)
      .then((respond) => {
          setResponse({
          ...response,
          id: respond.data.id,
          valid: respond.data.valid,
          message: respond.data.message,
          });
          return respond;
      })
      .then((respond) => {
        
          if (respond.data.valid) {
          localStorage.setItem("userId", respond.data.id);
        localStorage.setItem("userType", user.type);
          props.handleUser(respond.data.id);
          props.handleIsStudent((user.type === 'student') ? true : false);
          props.handleIsLogin(respond.data.valid);
          return respond;
          }
          return respond;
      })
      .then((respond)=>{
        console.log(respond);
        respond.data.valid && Notification("success", respond.data.message);
        !respond.data.valid && Notification("fail", respond.data.message);
      })
      .catch((err) => { console.log(err) });
    };
    
     
   return  (
     
       
<Grid  container component="main" className={classes.root}>
 
         <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid style={{ background:'#dcdcdc'}} item xs={12} sm={8} md={5} component={Paper} elevation={6} >
          <div className={classes.paper} component={Grid}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                 </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                     onSubmit={onSubmit}
                    >
                     { (p)=>(
                    <Form className={classes.form} >
                      
                        <label htmlFor="email"></label>
                       
                        <Field as={TextField}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            error={p.errors.email&&p.touched.email}
                            helperText={<ErrorMessage   name="email" />}
                            autoFocus />
                
                        <label htmlFor="password"></label>
                        <Field as={TextField}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            error={p.errors.password&&p.touched.password}
                            helperText={<ErrorMessage   name="password" />}
                            autoComplete="Enter password" />
                            
                        <Field
                        as={FormControlLabel}
                        name="type">
                        {({ field }) => (
                            <>
                            <div className="radio-item" style={checkBoxStyle}>
                                <input
                                {...field}
                                id="student"
                                value="student"
                                defaultChecked
                                name="type"
                                type="radio"
                                />
                                <label htmlFor="student">Student</label>
                            </div>

                            <div className="radio-item" style={checkBoxStyle}>
                                <input
                                {...field}
                                id="teacher"
                                value="teacher"
                                name="type"
                                type="radio"
                                />
                                <label htmlFor="teacher">Teacher</label>
                            </div>
                            </>
                        )}
                        </Field>

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit} >
                            Submit
                        </Button>
                        <GoogleLogin
                              clientId="13936057190-g0sbfcp0nlbk3lqgc551mnija76vsvou.apps.googleusercontent.com"
                              buttonText="Login With Google"
                              onSuccess={responseSuccessGoogle}
                              onFailure={responseErrorGoogle}
                              cookiePolicy={'single_host_origin'}
                          />
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </Form>
                     )}
                </Formik>          
        </div>
      </Grid>
 
</Grid>
   );

};

export default Login;