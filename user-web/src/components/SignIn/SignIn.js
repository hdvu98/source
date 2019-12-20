import React,{useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Alert} from 'react-bootstrap';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {url,login, auth_url, facebook, google} from '../../commons/constants/api';
import { resolve } from 'dns';
import { reject } from 'q';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
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
    color: '#ffffff'
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [username,setUsername]=useState(null);
  const [password,setPassword]=useState(null);
  const [status,setStatus] = useState({failed: false, success: false})
  const {updateLogin} = props;

  var history = useHistory();

  const renderLoginWithSocialMediaAccount=()=>{
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

  const signup =(res, type)=> {
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
   };
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
      setStatus({failed: false, success: true});
      history.push('/');
    }
    
  }).catch(error=>{
    console.log(error);
    setStatus({failed: true, success: false});
  })}
} 

const responseFacebook = (response) => {
  console.log("facebook console");
  console.log(response);
  signup(response, 'facebook');
}

const responseGoogle = (response) => {
  console.log("google console");
  console.log(response);
  this.signup(response, 'google');
}
  const handleLoginFacebook = (e) =>{
    e.preventDefault();
  }

  const handleLogin = (e) =>{
    e.preventDefault();
    const user = {
      username,
      password
    }

    axios({
      method: 'post',
      url: `${url}${login}`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then((response)=>{
      console.log(response)
      const {success,token} = response.data;
      if(success && token)
      localStorage.setItem("token", token);
      setStatus({failed: false, success: true});
      updateLogin(true);
      history.push('/');
    })
    .catch((error)=>{
      setStatus({failed: true, success: false});
    })

  }

  const renderAlert=(variant, message)=>{
    return (
      message?
      <Alert className="mt-3" variant={variant}>
      {message}
      </Alert>
      :
      <Alert className="mt-3" variant={variant}>
      Login Successfully
      </Alert>
    )
  }
  

  return (
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange = {(e)=>setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange = {(e)=>setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
             {
              status.success && <Redirect to="/"></Redirect>
              
            }
            {
              status.failed && renderAlert('danger','Invailid Username or Password')
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick = {handleLogin}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <div>
                {renderLoginWithSocialMediaAccount()}
            </div>
            <Box mt={5}>
            </Box>
          </form>
        </div>
  );
}