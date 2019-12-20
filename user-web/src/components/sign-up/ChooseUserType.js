import React from 'react';

const ChooseUserType = ()=>{
    return (
            <div className="d-flex justify-content-center align-items-center flex-row">
                <a className="my-btn btn-choose-account m-1" href="/register/tutor">I'm a Tutor</a>
                <a className="my-btn btn-choose-account m-1" href="/register/learner">I'm a Learner</a>
            </div>
    )
}
export default ChooseUserType;