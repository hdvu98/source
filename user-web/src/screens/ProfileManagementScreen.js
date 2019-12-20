import React, {useState, useEffect} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '../components/Profile/Avatar';
import Information from '../components/Profile/PersonalInformation';
import Introduce from '../components/Profile/Introduce';
import Skills from '../components/Profile/Skills';
import {useParams, Redirect} from 'react-router-dom';

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
const ProfileManagementScreen = (props) =>{
    const {user} = props;
    const classes = useStyles();
    const {activeTab} = useParams();

    const getTab=()=>{
      if(activeTab === 'change-password') return 2;
      if(activeTab === 'info')  return 0;
      if(activeTab === 'intro')  return 1;
      if(activeTab === 'skills')  return 3;
      return 0;
    }
    const [tab, setTab] = React.useState(getTab());

    const handleChange = (event, newValue) => {
      setTab(newValue);
    };

    return (
      !user? <Redirect to='/'></Redirect>:
      <div id="profile" className="container">
        <Avatar user={user}></Avatar>
        <div className={classes.root}>
          <Tabs
        orientation="horizontal"
        value={tab}
        onChange={handleChange}
        aria-label="user infomation"
        className={classes.tabs}
      >
        <Tab label="Information"  />
        <Tab label="Introduction"/>
        <Tab label="Password"/>
        {user.info.type_acc===2 && <Tab label="Skills"/>}
      </Tabs>
      </div>
      {tab===0 && <Information user={user}/>}
      {tab===1 && <Introduce user={user}></Introduce>}
      {tab===3 && <Skills user={user}/>}
      </div>
    )
}

export default ProfileManagementScreen;