import React,{useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {FormControl, InputLabel, Select} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; 
import {ADDRESS} from '../../commons/constants/address';
import {toDateString} from '../../commons/functions/date';
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

const Information = (props) =>{
    const toArray=(obj)=> {
      let array = [];
      Object.keys(obj).forEach(key => {
        array.push(obj[key]);
      })
      return array;
  }
  const addressList = toArray(ADDRESS);
  const city = addressList.map(option => {
      const firstLetter = option.name[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
      };
    });
    var {user} = props;
    const classes = useStyles();
    const [info,setInfo] = useState(user.info);
    const getDistricts = () =>{
    let districts = [];
      var city = addressList.find(item=>item.name === info.City);
      if(!info || !info.City)
      return []
      var obj = city.districts;
      Object.keys(obj).forEach(key => {
        districts.push(obj[key]);
      })
      return districts
    }
    const [districts, setDistricts] = useState(getDistricts);

    const handleChangeCity=(e,option)=>{
      setInfo({...info, City: option.name});
      let districts = [];
      var city = addressList.find(item=>item.name === option.name);
      var obj = city.districts;
      Object.keys(obj).forEach(key => {
        districts.push(obj[key]);
      })
      setDistricts(districts);
    }  
    const handleChange = (e) =>{
      setInfo({...info, [e.target.name]: e.target.value});
    }

    const handleChangeDate = (date) =>{

      setInfo({...info, DOB: toDateString(date)})
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      const token = localStorage.getItem('token');
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
          data:Information
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
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              name="Firstname"
              onChange={(e)=>handleChange(e)}
              value={info.Firstname}
              autoComplete="FirstName"
            />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Lastmame"
                label="Last Name"
                onChange={(e)=>handleChange(e)}
                value={info.Lastname}
                name="Lastname"
              />
            </Grid>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            fullWidth
            margin="normal"
            autoOk
            ampm={false}
            disableFuture
            label="Birth day"
            format="yyyy-MM-dd"
            showTodayButton
            onChange={handleChangeDate}
            name="DOB"
            value={info.DOB}
            inputVariant="outlined"
          />
       </MuiPickersUtilsProvider>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            {/* <Typography>Address</Typography> */}
            <Autocomplete
            fullWidth
            id="province-group"
            options={city.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={option => option.firstLetter}
            getOptionLabel={option => option.name}
            onChange={handleChangeCity}
            value = {{name: info.City}}
            renderInput={params => (
                <TextField margin="normal" {...params} label="City" variant="outlined" fullWidth />
            )}
            />
            <FormControl 
            fullWidth
            variant="outlined"
            >
              <InputLabel 
              htmlFor="outlined-age-native-simple">
              District
              </InputLabel>
              <Select
              native
              name="District"
              value={info.District}
              onChange={(e)=>handleChange(e)}
              inputProps={{
                  name: 'District',
                  id: 'outlined-age-native-simple',
              }}
              >
                {
                  districts.map((item,index)=><option key={`DIS${index}`}value={item} >{item}</option>)
                }
              </Select>
          </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="AddInfor"
              label="Street, Number"
              name="AddInfor"
              onChange={(e)=>handleChange(e)}
              value={info.AddInfor}
              autoComplete="AddInfor"
            />
              {/* <TextField
                variant="outlined"
                required
                fullWidth
                id="district"
                label="District"
                name="district"
                autoComplete="district"
              /> */}
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
            className={classes.submit}
            onClick={handleSubmit}
          >
              Update
          </Button>
           <Box mt={5}></Box>
        </form>
        </div>
    )

}
export default Information;