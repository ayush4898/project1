import React,{useState , useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { blue, green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    
  }
}));

const Status = () => {
  const classes=useStyles();
  let [isEmpty, setEmpty] = useState(true);
  let [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get(`/student/form/${localStorage.userId}`)
      .then(res => {
        console.log(res.data.forms);
        if (res.data.forms.length !== 0)
        {
          setEmpty(false);
          return res.data.forms;
        }
      })
      .then((data) => {
        setForms(data);
      })
      .catch(Error => {
        console.lof(Error);
      });
  },[])

  return (
    isEmpty ?
      (
        <div>
          <h1>No Registration form to show!!</h1>
        </div>
      ):

    <div>


<div className={classes.root}>
            <Paper className={classes.paper} style={{margin:'0 15px'}}>
              <Grid container spacing={10} >
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={5} >
                  
                    <Grid container item xs={12} style={{display:"flex",flexDirection:'row'}} spacing={3}>
                      
                            <Grid item xs={3} >
                            <strong style={{fontSize:"1rem"}}>Email</strong>
                        </Grid>
                        <Grid item xs={2} sm>
                        <strong style={{fontSize:"1rem"}}>Department</strong> 
                        </Grid>
                        <Grid item xs={2} sm>
                        <strong style={{fontSize:"1rem"}}>Semester</strong>
                        </Grid>
                        <Grid item xs={2} sm>
                        <strong style={{fontSize:"1rem"}}>Date</strong>
                    </Grid>
                    <Grid item xs={2} sm>
                    <strong style={{fontSize:"1rem"}}>Form</strong>
                        </Grid>
                        <Grid item xs={1} sm>
                        <Typography variant="body2" >
                        <strong style={{fontSize:"1rem"}}>Status</strong>
                      </Typography>
                        </Grid>
                    </Grid>
              </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        {forms.map((form) => {
          return(
          
          <li style={{listStyle:'none',margin:"1rem"}}>
            
            <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                  
                    <Grid container item xs={12} style={{display:"flex",flexDirection:'row'}} spacing={3}>
                      
                            <Grid item xs={3} >
                            {form.email}
                        </Grid>
                        <Grid item xs={2} sm>
                            {form.department}
                        </Grid>
                        <Grid item xs={2} sm>
                            {form.semester}
                        </Grid>
                        <Grid item xs={2} sm>
                            {form.createdAt.substr(0,10)}
                          </Grid>
                          <Grid item xs={2} sm>
                          {<a href={form.file} target="_blank" rel="noreferrer">Form</a>}
                        </Grid>
                        <Grid item xs={1} sm>
                        <Typography variant="body2" >
                        {form.isVerified === 'verified' &&
                           <Chip
                              label={form.isVerified + "!!"}
                              style={{ color: green[600] }}
                              variant="outlined"
                          />
                        }
                        {form.isVerified === 'rejected' &&
                          <Chip
                              label={form.isVerified + "!!"}
                              style={{ color: red[600] }}
                              variant="outlined"
                          />
                        }
                        {form.isVerified === 'pending' &&
                          <Chip
                              label={form.isVerified + "!!"}
                              style={{ color: blue[600] }}
                              variant="outlined"
                          />
                        }    
                      </Typography>
                        </Grid>
                    </Grid>
              </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
          </li>
          
          );
        })
        }
        </div>
    );
    
    };
     
export default Status;