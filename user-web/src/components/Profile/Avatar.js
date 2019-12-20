import React,{useState, useEffect} from 'react';
import {DropzoneDialog} from 'material-ui-dropzone';
import firebase from '../../commons/firebase';
import axios from 'axios';
import {curTimeToString } from '../../commons/functions/date';
import {url,editInfor} from '../../commons/constants/api';
var storageRef = firebase.storage().ref();
var metadata = {
    contentType: 'image/jpeg',
  };



const Avatar = (props)=>{
    //const {avatar, username, firstName, lastName, address} = props;
    const [open, setOpen] = React.useState(false);
    var {user} = props;
    const [info,setInfo] = useState(user.info);
    // const username = 'hdvu98';
    // const firstName = 'Duong';
    // const lastName = 'Vu';
    // const address ={
    //     province: 'Ho Chi Minh city',
    //     district: 'Tan Phu'
    // }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleUpload = (file)=>{
        let photo=URL.createObjectURL(file[0]);
        var uploadTask = storageRef.child(`avatar/${info.Username}-${curTimeToString()}-${file[0].name}`).put(file[0], metadata);
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, function(error) {
              console.log(error);
              alert('An Error occurred!')
            setOpen(false);
            // Handle unsuccessful uploads
          }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              const token = localStorage.getItem('token');
                const Information = {
                    firstname: info.Firstname
                    , lastname: info.Lastname
                    ,
                    dob: info.DOB,
                    avatar: downloadURL
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
                    setInfo({...info, Avatar: downloadURL});
                })
                .catch(err=>{
                    console.log(err);
                })
              setOpen(false);
            });
          });
      }

    const renderDialogUpload=()=>{
        return(
            <DropzoneDialog
            dialogTitle="Upload profile avatar"
            dropzoneText="Choose a photo"
            filesLimit={1}
            open={open}
            onSave={(file)=>handleUpload(file)}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={handleClose}
        />
        )

    }


    return (
    <div className="header-profile d-flex flex-column align-items-center">
        <div className="profile-avatar">
            <button onClick={handleClickOpen} className="avatar">
            <img className="img-fluid-avatar" src={info.Avatar} alt={info.Username}></img>
            <div className="avatar-hover">
                <div className="w-100 h-100 d-flex align-items-end justify-content-center p-3">
                    <i className="fas fa-camera color-white">
                    </i></div>
            </div>
            </button>

        </div>
        <div className="">{info.Firstname} {info.Lastname}</div>
        <div className="">{info.District}, {info.City}</div>
        {renderDialogUpload()}
    </div>)

}
export default Avatar;