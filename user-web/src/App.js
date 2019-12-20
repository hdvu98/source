import React, {useState, useEffect} from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom';
import SignInScreen from './screens/SignInScreen';
import SignUpForLearnerScreen from './screens/SignUpForLearner';
import SignUpForTutorScreen from './screens/SignUpForTutor';
import ChooseSignUpScreen from './screens/ChooseSignUpScreen';
import NavBar from './components/navbar/NavBar';
import theme from './commons/theme-material-ui/index';
import ScrollTop from './components/scrollTop/scrollTop'
import {MODE} from './commons/constants/authenticateConstants';
import './style/index.css';
import axios from 'axios';
import {url,checkAuth,viewDetailTutor, getInfo} from './commons/constants/api';
import {BounceLoader} from 'react-spinners';
import Home from './screens/Home';
import ProfileManagementScreen from './screens/ProfileManagementScreen';
import UserProfile from './screens/UserProfile';
import {stringToDate, toDateString} from './commons/functions/date';

function App() {
  const [authenticated,setAuthenticated]= useState(false);
  const [user,setUser] = useState(null);
  const [loaded,setLoaded] = useState(false);
  const [navMode, setNavMode] = useState(MODE.GUEST);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    setLoaded(false);
    axios({
      method: 'get',
      url: `${url}${checkAuth}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `bearer ${token}`
      }
    }).then(async (response)=>{
      if(response.data){
        const {user} = response.data;
        if(user){
          const id = user.ID;
          user.type === 3 && await setNavMode(MODE.LEARNER);
          user.type === 2 && await setNavMode(MODE.TUTOR);
          await setAuthenticated(true);
          axios({
            method: 'get',
            url: `${url}${getInfo}`,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `bearer ${token}`
            }
          })
          .then(response=>{
            console.log(response)
            const user = response.data.obj;
            var date = null;
            const {info} = user;
            if(info){
              const {DOB} = info;
              if(DOB){
                date = stringToDate(DOB);
                user.info.DOB = toDateString(date);
              }
            }
            // var formatedDOB;
            // DOB ? formatedDOB = getDateString(DOB) : formatedDOB=null;
            // user.info.DOB = formatedDOB;
            setUser(user);
            setLoaded(true);
          })
          .catch((err)=>{
            console.log(err);
            setLoaded(true);
          })
      }}
    }).catch((error)=>{
      console.log(error);
      setLoaded(true);
    })
    
  },[authenticated])

  const updateLogin = (auth) =>{
    setAuthenticated(auth);
  }

  return (

    <MuiThemeProvider theme={theme}>
    <ScrollTop/>
    {loaded?
    <BrowserRouter>
    <NavBar mode={authenticated? navMode: MODE.GUEST} resetUser={()=>setUser(null)} updateLogin={updateLogin} user={user}/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" render={(props) => <SignInScreen updateLogin={updateLogin} {...props} />} ></Route>
        <Route exact path="/register" component={ChooseSignUpScreen}></Route>
        <Route exact component={SignUpForLearnerScreen} path="/register/learner"></Route>
        <Route exact component={SignUpForTutorScreen} path="/register/tutor"></Route>
        <Route render={(props) => <ProfileManagementScreen {...props} user={user} />} path="/profile/:activeTab"></Route>
        <Route render={(props) => <ProfileManagementScreen {...props} user={user}/>} path="/profile"></Route>
        <Route exact component={UserProfile} user={user} path="/tutors/:id"></Route>


      </Switch>
    </BrowserRouter>
    :<div className="spinner-cover d-flex justify-content-center align-items-center"><BounceLoader color="#3677D7"></BounceLoader></div>}
    </MuiThemeProvider>
  );
}

export default App;
