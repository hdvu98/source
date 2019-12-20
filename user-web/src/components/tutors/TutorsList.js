import React, {useState, useEffect} from 'react';
import TutorCard from './TutorCard';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {ADDRESS} from '../../commons/constants/address';
import {FormControl, InputLabel, Select} from '@material-ui/core';
import  {Tabs, Tab} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import FilterListIcon from '@material-ui/icons/FilterList';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import axios from 'axios';
import {url,viewAllTutors,showskills} from '../../commons/constants/api';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: '100%',
      width: '100%'
    },
    tabs: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }));

const TutorsList = (props) =>{
    const classes = useStyles();
    const [tutors,setTutors]=useState([]);
    const toArray=(obj)=> {
        let array = [];
        Object.keys(obj).forEach(key => {
          array.push(obj[key]);
        })
        return array;
    }
    const [tab, setTab] = React.useState(0);
    const [skills,setSkills] = useState([]);
    const [filter, setFilter] = useState({city: 'All', hourlyRate: 'Any hourly rate'});
    const [sort,setSort] = useState({cost:0});
    const [openSort,setOpenSort] = useState(false);
    const anchorRef = React.useRef(null);
    const sortOption = [
        [<AttachMoneyIcon/>,<span>Cost</span>, <UnfoldMoreIcon/>], 
        [<AttachMoneyIcon/>,<span>Cost</span>,<ExpandMoreIcon/>],
         [<AttachMoneyIcon/>,<span>Cost</span>,<ExpandLessIcon/>]
    ]


    useEffect(()=>{
        axios({
        method: 'get',
        url: `${url}${viewAllTutors}`,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json', }
        }
        )
        .then(response=>{
            const {data} = response;
            console.log(data)
            setTutors(data);
        })
        .catch(error=>{
            console.log(error)
        })

        
    },[])

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
            setSkills(response.data.skills)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const handleChangeTab = (e,tab)=>{
        setTab(tab);
    }

    const handleChangeFilterCity = (e,option)=>{
        setFilter({...filter, city:option})
    }
    const handleChangeFilterHourlyRate = (e) =>{
        setFilter({...filter, [e.target.name]:e.target.value})
    }
    const handleClick = () => {
        
      };
    
    const handleSortItemClick = (event, index) => {
    setSort({...sort, cost: index});
    setOpenSort(false);
    };

    const handleToggleSort = () => {
    setOpenSort(prevOpen => !prevOpen);
    };

    const handleCloseSort = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }

    setOpenSort(false);
    };

    const addressList = toArray(ADDRESS);
    addressList.push({name: ' All'})
    const options = addressList.map(option => {
        const firstLetter = option.name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });

    const renderTab=()=>{
        return (          
        <Tabs
            orientation="orientation"
            scrollButtons="auto"
            value={tab}
            onChange={handleChangeTab}
            aria-label="user infomation"
            className={classes.tabs}
          >
              <Tab label="All" />
              {
                  skills.map((item,index)=><Tab label={item.Skillname} />)
              }
          </Tabs>);
    }
    const renderSortGroup = () =>{
        return(
            <div>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{sortOption[sort.cost]}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={openSort ? 'split-button-menu' : undefined}
            aria-expanded={openSort ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggleSort}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={openSort} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseSort}>
                  <MenuList id="split-button-menu">
                    {sortOption.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === sort.cost}
                        onClick={event => handleSortItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
              </Grow>
            )}
            </Popper>
            </div>
        );
    }

    const renderFilter = () => {
        return (<div className="filter">
        <div className="d-flex flex-row flex-wrap justify-content-between align-items-end">
            <div className="d-flex flex-row flex-wrap align-items-end">
                {/* <FilterListIcon/> */}
                <Autocomplete
                    style={{ width: 300 }}
                    id="grouped-demo"
                    name="city"
                    onChange = {(e,option)=>handleChangeFilterCity(e,option.name)}
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={option => option.firstLetter}
                    getOptionLabel={option => option.name}
                    value ={{name: filter.city}}
                    renderInput={params => (
                        <TextField fullWidth {...params} defaultValue="All" label="City" />
                    )}
                    />
                 <FormControl 
                 style={{ width: 300 }}
                 >
                    <InputLabel 
                    htmlFor="outlined-age-native-simple">
                    Hourly rate
                    </InputLabel>
                    <Select
                    native
                    fullWidth
                    name="hourlyRate"
                    value={filter.hourlyRate}
                    onChange={(e)=>handleChangeFilterHourlyRate(e)}
                    inputProps={{
                        name: 'hourlyRate',
                        id: 'outlined-age-native-simple',
                    }}
                    >
                    <option value={'Any hourly rate'} >Any hourly rate</option>
                    <option value={'Under $10/h'}>Under $10/h</option>
                    <option value={'$10/h - $15/h'}>$10/h - $15/h</option>
                    <option value={'$15/h - $20/h'}>$15/h - $20/h</option>
                    <option value={'bove $20/h'}>Above $20/h</option>
                    </Select>
                </FormControl>
            </div>
            <div className="d-flex flex-row">
                {/* <button className="sort-btn">
                    <AttachMoneyIcon/>
                    Cost 
                    {sort.cost === 'all' ? <UnfoldMoreIcon/> : (sort.cost=== 'desc'? <ExpandMoreIcon/> : <ExpandLessIcon/>)}
                </button> */}
                {renderSortGroup()}
               
            </div>
        </div>
    </div>);
    }

    const renderList = () =>{
      var array = [...tutors];
      if(tab!==0){
        array=array.filter(item=>
           item.skills.find(skill=>skill.Skillname === skills[tab -1 ].Skillname)
        )
      }
      return array.map((item,index)=> <div className="col-12 col-lg-4"><TutorCard key={`CA${index}`} user={item}></TutorCard></div>)
    }

    return (
        <div className="tutors-list">
            {/* {renderFilter()} */}
            {renderTab()}
            <div className="row">
                {
                    // tutors.map((item,index)=> <div className="col-12 col-lg-6"><TutorCard key={`CA${index}`} user={item}></TutorCard></div>)
                    renderList()
                }
            </div>
               
            <div className="d-flex justify-content-center"><button className="my-btn">Show more</button></div>
        </div>
    )
}

export default TutorsList;

