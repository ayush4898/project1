import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

export default function SimplePopover(props) {
    const [forms] = useState(props.forms.value);
   
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const classes = useStyles();

  return (
      <div>
      <Button aria-describedby={id} variant="contained" color="secondary" onClick={handleClick}>
        Forms
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
          >
              
              {forms.length === 0 && <Typography  className = { classes.typography}>No Registration Form To display!!</Typography>}

        
              {forms.length !== 0 &&
                  <List>
                  {
            forms.map((form, index) => {
              // console.log('form.file', form.file);
                        return <ListItem key={index}>
                            <ListItemText primary={`Semester  ${form.semester} `} />
                            <ListItemLink >
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="file">
                                <a href={form.file} target= "_blank" rel="noreferrer" ><DescriptionIcon /></a>
                                    </IconButton>
                                </ListItemSecondaryAction>
                          </ListItemLink>
                          <ListItemText secondary={`${form.isVerified} !!`} />
                        </ListItem>
                        } )
                }
                  </List>
              }    
      </Popover>
    </div>
  );
}
