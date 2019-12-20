import  React from 'react';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    position: 'relative'
  },
  media: {
    height: 250,
  },
  button: {
    backgroundColor: '#0092b7',
    color: '#ffffff',
    '&:hover':{
        backgroundColor: '#01c1f2'
    }
  },
  cost:{
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '999',
      backgroundColor: '#e74c3c',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      fontWeight: 'bold'
  }
});

const TutorCard = (props) =>{
    const classes = useStyles();
    const {user} = props;
    const {info} = user;
    const {skills} = user;
    const {cost} =user;
    var history = useHistory();

    const handleViewProfile=(id)=>{
        history.push(`/tutors/${id}`);
    }

    return(
        // <div className="tutor-card d-flex flex-column">
        // <div className="d-flex  flex-row">

        //     <div class="tutor-card__avatar">
        //         <img className="img-fluid" src={info.Avatar} alt=""></img>
        //     </div> 
        //     <div className="tutor-card__info flex-grow-1">
        //     <div className="tutor-card__name">{info.Firstname}{' '}{info.Lastname}</div>
        //         <div className="tutor-card__breakline"></div>
        //         <Rating name="half-rating" readOnly value={2.5} precision={0.5} />
        //         <div className="tutor-card__good">80% success <span className="tutor-card__amount">100 jobs</span></div>
        //         <div className="tutor-card__adress">{info.District}, {info.City}</div>
        //         <div className="d-flex flex-row flex-wrap">
        //             {
        //                 skills.map((item,index)=><Chip className="skill-tag" label={item.Skillname} key={`SKILL${index}`} variant="outlined" />)
        //             }
        //         </div>
        //         <div className="tutor-card__breakline"></div>
        //         <div className="d-flex flex-row justify-content-between">
        //             <button className="my-btn" onClick={()=>handleViewProfile(info.IDAccount)}>View Profile</button>
        //         <div className="tutor-card__hourly-rate">{cost.Cost}$ / 1h</div>
        //         </div>
        //     </div>
      
        // </div>
        
        // </div>
        <Card className={classes.card} onClick={()=>handleViewProfile(info.IDAccount)}>
        <div className={classes.cost}>{cost.Cost}$ / 1h</div>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={info.Avatar}
          title={`${info.Firstname} ${info.Lastname}`}
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="h2">
          {info.Firstname}{' '}{info.Lastname}
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            {/* {info.Introduction} */}
            <div className="tutor-card__info ">
            <div className="tutor-card__name">{info.Firstname}{' '}{info.Lastname}</div>                
            <div className="tutor-card__adress">{info.District}, {info.City}</div>
                {/* <div className="tutor-card__breakline"></div> */}
                <Rating name="half-rating" readOnly value={2.5} precision={0.5} />
                <div className="tutor-card__good">80% success <span className="tutor-card__amount">100 students</span></div>
                <div className="d-flex flex-row flex-wrap">
                    {
                        skills.map((item,index)=><Chip className="skill-tag" label={item.Skillname} key={`SKILL${index}`} variant="outlined" />)
                    }
                </div>
                {/* <div className="tutor-card__breakline"></div> */}
                {/* <div className="d-flex flex-row justify-content-between">
                    <button className="my-btn" >View Profile</button>
                <div className="tutor-card__hourly-rate">{cost.Cost}$ / 1h</div>
                </div> */}
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" fullWidth className={classes.button} onClick={()=>handleViewProfile(info.IDAccount)}>
          View Profile
        </Button>
        {/* <div className="tutor-card__hourly-rate">{cost.Cost}$ / 1h</div> */}
      </CardActions>
    </Card>
    )
}

export default TutorCard;