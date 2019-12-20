import React from 'react';
import {makeStyles} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SignUp from '../components/sign-up/SignUp';
import logo_500px from '../assets/img/logo_500px.png';
import background from '../assets/img/background.jpg';

const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: `url(${background})`,
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
    logo:{
        background: '#ffffff',
        borderRadius: '50%',
        padding: '1rem'
    }
  }));
const SignUpForTutorScreen =(props)=>{
    const classes = useStyles();
    return (<section id="sign-up">
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} >
    </Grid>
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <SignUp type={2}/>
    </Grid>
    </Grid>
    </section>)
}

export default SignUpForTutorScreen;