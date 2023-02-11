import React from "react";


import MainHeader from "../../hocs/MainHeader";
import './about.css';



const About = () => {

    return (
        <React.Fragment>
            <MainHeader/>
            <div className="first">
               <h2 >We Provide Great Properties For Creative Folks</h2>
               <img className="first-img" src={require('./images/about.jpg')} alt="about-img" />
            </div>
            
            <div className="word">
                <h1>About RapidEstate</h1><br/>
                <p> Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.

Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. </p>
            </div>
            <div className="team">
                <h2>Our Team</h2> 
                <div className="team-1">
                    <img className="team-img" src={require('./images/agent.jpg')} alt="agent-img"/>
                    <span className="team-info"><span className="ag-name">Daniel Jack</span><span className="ag-email">danjack00@gmail.com</span></span>
                </div>
                <div className="team-2">
                <img className="team-img" src={require('./images/aa.jpg')} alt="agent-img"/>
                <span className="team-info"><span className="ag-name">Michael Kim</span><span className="ag-email">michael001@outlook.com</span></span>
                </div>
                <div className="team-3">
                <img className="team-img" src={require('./images/agent2.jpg')} alt="agent-img"/>
                <span className="team-info"><span className="ag-name">Julia Page</span>  <span className="ag-email">juliapage100@aol.com</span></span>
                </div>
            </div>
            <div className="ending"><br/>
                <p className="ending-word">
                <span style={{'fontSize':'14px'}}  >&copy; Copyright</span>
                <span style={{'fontSize':'14px'}}  class="color-a"><b>RapidEstate</b> All Rights Reserved.</span>
                <br/>
                <span style={{'fontSize':'14px'}} >304 Blaster Up Chicago, IL 606543</span>
               </p>
            </div>
        </React.Fragment>
    )
}
export default About;