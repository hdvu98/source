import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    NavDropdown,
    Container,
    Dropdown
} from 'react-bootstrap';
import {Avatar} from '@material-ui/core';
import logo_100px from '../../assets/img/logo_100px.png';
import {MODE} from '../../commons/constants/authenticateConstants';

const NavBar = (props) => {
  const {menu} =  {menu:[{parents:'Home', link: '/'},{parents:'Top Tutors', link: '/top-tutors'}]};
  const [isOpen, setIsOpen] = useState(false);
//   const {avatar} = {avatar: 'https://material-ui.com/static/images/avatar/1.jpg'};
//   const {username} = props.user? props.user : {username: ''};
  const {user} = props;
  const {updateLogin, resetUser} = props;
  const history = useHistory();
  const [mode,setMode] = useState(props.mode);

  const toggle = () => setIsOpen(!isOpen);

  const logOut = () =>{
      localStorage.removeItem('token');
      setMode(MODE.GUEST);
      updateLogin(false)
      resetUser();
      history.push('/login');
  }
  useEffect(()=>{
      setMode(props.mode)
  },[props.mode])

  const renderLearner=()=>{
      return(
        <Dropdown alignRight>
            <Dropdown.Toggle id="dropdown-basic" className="profile-dropdown d-flex flex-row align-items-center">
            <Avatar alt={user.info.Username} src={user.info.Avatar} />
            </Dropdown.Toggle>
        
            <Dropdown.Menu>
                <Dropdown.Item href="/profile/info">My Account</Dropdown.Item>
                <Dropdown.Item href="#">My Contracts</Dropdown.Item>
                <Dropdown.Item  onClick={logOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      )
  }

  const renderTutor=()=>{
      return [(
            <a className="my-btn btn-post-Course" href="#">My Contracts</a>),(
            <Dropdown alignRight>
            <Dropdown.Toggle id="dropdown-basic" className=" profile-dropdown d-flex flex-row align-items-center">
            <Avatar alt={user.info.Username} src={user.info.Avatar} /><span className="ml-1">{user.info.Username}</span>
            </Dropdown.Toggle>
        
            <Dropdown.Menu>
                <Dropdown.Item href="/profile/info">My Account</Dropdown.Item>
                <Dropdown.Item href="#">My Contracts</Dropdown.Item>
                <Dropdown.Item href="#">Statistics</Dropdown.Item>
                <Dropdown.Item onClick={logOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
      )]
  }

  const renderGuest=()=>{
      var items = [
        <a className="my-btn mr-1" key={`login-btn`} href="/login">Login</a>,
        <a  className="my-btn" key={`register-btn`} href="/register/learner">Register</a>,
        <Nav.Link key={`for-tutor-btn`} href="/register/tutor">For Tutors</Nav.Link>
      ]
    return items;
  }

  return (
    <Navbar id="navbar" expand="lg" fixed="top" key={props.mode}>
    <Container>
    <Navbar.Brand href="/" className="d-flex align-items-center">
        <img className="logo d-inline-block" alt="" src={logo_100px}></img><span className="brand-text">VTutors</span></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end navbar-collapse collapse" >
    <Nav  >
        {
           menu && menu.map((item,index)=>{
                if(item.children)
                return( 
                <NavDropdown key={`Category${index}`} title={item.parents} id="collasible-nav-dropdown">
                    {item.children.map((item,index)=>(<NavDropdown.Item key={`Child${index}`} href="/">{item.child}</NavDropdown.Item>))}
                </NavDropdown>)

                return(<Nav.Link key={`Category${index}`} href={item.link}>{item.parents}</Nav.Link>);
            })
        }
    {
        mode===MODE.GUEST && renderGuest()
    }
    {
        user && mode === MODE.LEARNER && renderLearner()
    }
    {
        user && mode === MODE.TUTOR && renderTutor()
    }
    </Nav>

    </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;