import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Alert} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {url,register, auth_url, facebook, google} from '../../commons/constants/api';

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



const  SignUp =(props)=> {
  const classes = useStyles();

  const {type} = props;
  var history = useHistory();
  const [username,setUsername]=useState('');
  const [invalidUsername, setInvalidUsername] = useState(null);
  const [password,setPassword]=useState('');
  const [invalidPassword, setInvalidPassword] = useState(null);
  const [email,setEmail]=useState('');
  const [invalidEmail, setInvalidUEmail] = useState(null);
  const [confirmPassword,setConfirmPassword]=useState('');
  const [invalidCfmPassword, setInvalidCfmPassword] = useState(null);
  const [sucess,setSucess] = useState(false);
  const [failed,setFailed] = useState(false);

  const responseFacebook = (response) => {
    console.log("facebook console");
    console.log(response);
    handleSignupSocial(response, 'facebook');
  }
  
  const responseGoogle = (response) => {
    console.log("google console");
    console.log(response);
    handleSignupSocial(response, 'google');
  }

const handleSignupSocial =(res, type)=> {
    let postData;
    if (type === 'facebook' && res.email) {
    postData = {
         name: res.name,
         provider: type,
         email: res.email,
         provider_id: res.id,
         token: res.accessToken,
         provider_pic: res.picture.data.url
    };
   }

   if (type === 'google' && res.w3.U3) {
   postData = {
     name: res.w3.ig,
     provider: type,
     email: res.w3.U3,
     provider_id: res.El,
     token: res.Zi.access_token,
     provider_pic: res.w3.Paa
   }
  }
   if(postData){
    const access_token = {access_token: postData.accessToken};
  axios({
    method: 'get',
    url: `${auth_url}/${type}`,
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${res.accessToken}`
    }

  }).then(response=>{
    const {data} = response;
    if(data){
      localStorage.setItem('token',data.token);
      setSucess(true);
      setFailed(false);
      history.push('/');
    }
    
  }).catch(error=>{
    setSucess(false);
    setFailed(true);
    console.log(error);
  })
}
  
}

  const renderRegisterWithSocialMediaAccount=()=>{
    return(
      <div className="login-social-media ">
      <div className="text-center mb-3">or login with</div>
      <div className="d-flex flex-row">
        <GoogleLogin
        render={renderProps=>(<button onClick={renderProps.onClick} disabled={renderProps.disabled} className="my-btn btn-google d-flex mr-1 align-items-center justify-content-start"><i className="fab fa-google icon "></i>LOGIN WITH GOOGLE</button>
        )}
        clientId="214759149071-62qm355lbkm0tti06f4ld3edmtbqnag3.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
        <FacebookLogin
        appId="466777860614274"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}/>
        <br/><br/></div>
  </div>
    )
  }

  const renderAlert=(variant, message)=>{
    return (
      message?
      <Alert className="mt-3" variant={variant}>
      {message}
      </Alert>
      :
      <Alert variant={variant}>
      Sign Up successfully {' '}
      <Alert.Link href="/login">Click here to login</Alert.Link>
      </Alert>
    )
  }

  const handleRegister = (e) =>{
    e.preventDefault();
    if(password === confirmPassword && password.length>=6){
      const user ={
        username: username,
        password: password,
        email: email,
        Type_acc: type,
        Status_acc: 1
      }
      axios({
        method: 'post',
        url: `${url}${register}`,
        data: user,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then((response)=>{
        setSucess(true);
        setFailed(false);
      })
      .catch((error)=>{
        setFailed(true);
        setSucess(false);
      })
    }
    else{
      setFailed(true);
      setSucess(false);
    }

  }

  const validateConfirmPassword=async()=>{
    password !== confirmPassword? await setInvalidCfmPassword('The confirm password not match') :
     await setInvalidCfmPassword(null);
  }


  return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              onChange={(e)=>setUsername(e.target.value)}
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e)=>setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={(e)=>setPassword(e.target.value)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={ (e) => {
                   setConfirmPassword(e.target.value);
                }}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
              {/* <span className={`text-danger ${invalidCfmPassword ? 'visible':'invisible'}`}>{invalidCfmPassword}</span> */}
            </Grid>
          </Grid>
          {
            sucess && renderAlert('success')
          }
              {
            failed && renderAlert('danger','Create Account Failed! Please check input again')
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {handleRegister}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <div>
                {renderRegisterWithSocialMediaAccount()}
            </div>
          <Box mt={5}></Box>
        </form>
      </div>

  );
}
export default SignUp;