import React,{useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/styles';
import axios from 'axios';
import {url,viewAllTutors,editInfor} from '../../commons/constants/api';

const useStyles = makeStyles(theme => ({
    paper: {
      margin: theme.spacing(8,4),
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color: '#ffffff'
    },
  }));

const Introduce = (props)=> {
    const classes = useStyles();
    const {user} = props;
    const [info, setInfo] = useState( user.info);
    const handleSubmit = (e) =>{      
      e.preventDefault();
      var token = localStorage.getItem('token');
      const Information = {
        firstname: info.Firstname
        , lastname: info.Lastname
        ,
        dob: info.DOB,
        avatar: info.Avatar
        ,
        city: info.City
        ,
        dist: info.District
        ,
        addinfor: info.AddInfor
        ,
        intro: info.Introduction
      }

      axios({
        method: 'post',
        url: `${url}user/${editInfor}`,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
            'Authorization': `bearer ${token}`
          },
          data: Information
        }
      )
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
    }

    return (
        <div>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Introduction"
            multiline
            rows="10"
            onChange={(e)=>setInfo({...info, Introduction: e.target.value})}
            name="Introduction"
            value = {info.Introduction}
            variant="outlined"
            />
            </Grid>
          </Grid>
          {/* {
            sucess && renderAlert('success')
          }
              {
            failed && renderAlert('danger','Update infomation failed! Please try again')
          } */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submit}
          >
              Update
          </Button>
           <Box mt={5}></Box>
        </form>
        </div>
    )
}

export default Introduce;