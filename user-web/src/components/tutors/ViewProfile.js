import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {url,viewDetailTutor} from '../../commons/constants/api';

const ViewProfile = (props)=>{
    let {id} =  useParams();
    var history = useHistory();
    const [user,setUser] = useState(null)

    useEffect(()=>{
        axios(
            {
                method: 'get',
                url: `${url}user/${viewDetailTutor}`,
                params: {
                    id: id
                  },
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', }
            }
        )
        .then(response=>{
            console.log(response.data)
            setUser(response.data)
        })
        .catch(error=>{
            history.push('/')
            console.log(error);
        })

    },[])
  

    return(
        user && <section id="comic-page">
            <div className="header-profile d-flex flex-column align-items-center">
        <div className="profile-avatar">
            <div  className="avatar">
            <img className="img-fluid-avatar" src={user.info.Avatar} alt={user.info.Username}></img>
            </div>

        </div>
        <div className="">{user.info.FirstName} {user.info.Lastname}</div>
        <div className="">{user.info.District}, {user.info.City}</div>
        <div className="d-flex flex-row flex-wrap">
            {
                user.skills.map((item,index)=><Chip label={item.Skillname} key={`SKILL${index}`} variant="outlined" />)
            }
        </div>
        </div>
        <div className="info">
            <div className="name">Fullname: {user.info.FirstName} {user.info.Lastname}</div>
                <div className="dob">Birthday: {user.info.DOB}</div>
            <div className="address">{user.info.District}, {user.info.City}</div>           
        </div>
        <hr></hr>
        <div className="intro">
            <div className="intro">{user.info.Introduction}</div>          
        </div>
        </section>
    );

}

export default ViewProfile;