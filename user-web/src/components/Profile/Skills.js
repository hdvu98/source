import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {makeStyles, useTheme } from '@material-ui/styles';
import axios from 'axios';
import {url,showskills,updateSkill, viewDetailTutor, deleteSkill} from '../../commons/constants/api';
import {stringToDate, toDateString} from '../../commons/functions/date';
const useStyles = makeStyles(theme => ({
    formControl: {
      width: '100%'
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
const Skills = (props)=>{
    const classes = useStyles();
    const theme = useTheme();
    const {user} = props;
    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    const [userskills, setUserskills] = useState([])
    const [selectedSkills, setSelectedSkills] = React.useState([]);
    var preSkills = [];
    const [skills,setSkills] = useState([])

    useEffect(()=>{
      axios({
          method: 'get',
          url: `${url}user/${showskills}`,
          headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json', 
          }
      })
      .then(response=>{
        var skills =response.data.skills;
        var array= [];
        skills.map(item=>{
          Object.keys(item).forEach(key => {
            console.log(item)
            if(key === 'Skillname')
            array.push({Skillname: item[key]});
          })
        })
          setSkills(array)
      })
      .catch(err=>{
          console.log(err);
      })
  },[])

  useEffect(()=>{
    const token = localStorage.getItem('token');
    axios({
      method: 'get',
      url: `${url}user/${viewDetailTutor}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `bearer ${token}`
      },
      params: {id: user.info.IDAccount}
    })
    .then(response=>{
      const user = response.data;
      setUserskills(user.skills);
      setSelectedSkills(user.skills.map(item=>item.Skillname))
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  
    const handleChange = event => {
      setSelectedSkills(event.target.value);
    };

    const handleSubmit = (e) =>{
      preSkills=userskills.map(item=>item.Skillname);
      var changedSkills = selectedSkills
      .filter(x => !preSkills.includes(x))
      .concat(preSkills.filter(x => !selectedSkills.includes(x)));
      var addedSkills = changedSkills.filter(x=> !preSkills.includes(x)).map(item=>({skillname: item}));
      var deletedSkills = changedSkills.filter(x=> preSkills.includes(x)).map(item=>({skillname: item}));

      const token = localStorage.getItem('token');
      // console.log(selected)
      e.preventDefault();

      axios.all([axios({
        method: 'post',
        url: `${url}user/${updateSkill}`,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
            'Authorization': `bearer ${token}`
          },
          data: addedSkills
        }
      ),
      axios({
        method: 'post',
        url: `${url}user/${deleteSkill}`,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
            'Authorization': `bearer ${token}`
          },
          data: deletedSkills
        }
      )]).then(axios.spread(function (added, deleted) {
        console.log(added);
        console.log(deleted)
        // let vehicles = seat.data.concat(volkswagen.data);
        // this.setState({ vehicles: vehicles })
      }))
      .catch(err=>{
        console.log(err);
      })


    }
  
    const handleChangeMultiple = event => {
      const { options } = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setSelectedSkills(value);
    };
    return (

      <div>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <FormControl           
          margin="normal"
          variant="outlined"
           fullWidth className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Skills</InputLabel>
        <Select
          fullWidth
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={selectedSkills}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {skills.map((item,index) => (
            <MenuItem key={item.Skillname} value={item.Skillname} style={getStyles(item, selectedSkills, theme)}>
              {item.Skillname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
 
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
          onClick={(e)=>handleSubmit(e)}
        >
            Update
        </Button>
         <Box mt={5}></Box>
      </form>
      </div>
    );
}

export default Skills;