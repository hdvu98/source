import React from 'react';
import TutorsList from '../components/tutors/TutorsList';

const Home =(props)=>{
    return (<section id="home">
        <div className="container">
            <TutorsList></TutorsList>
        </div>
    </section>)
}

export default Home;