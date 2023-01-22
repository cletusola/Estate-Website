import React from "react";

import MainHeader from "../../hocs/MainHeader";
import './contact.css';




const Contact = () => {

    return (
        <React.Fragment>
            <MainHeader/>
            <div className="up">
                <h1>Contact US</h1>
                <p>Aut voluptas consequatur unde sed omnis ex placeat quis eos. Aut natus officia corrupti qui autem fugit consectetur quo.
                Et ipsum eveniet laboriosam voluptas beatae possimus qui ducimus.
                Et voluptatem deleniti. Voluptatum voluptatibus amet.
                Et esse sed omnis inventore hic culpa.Aut voluptas consequatur unde sed omnis ex placeat quis eos.</p>
            </div>
            
            <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1ses-419!2sve!4v1510329142834"></iframe>
            </div>
            <div className="con-form">
            <p className="email-p" ><b>Our Email: </b> rapidestate@rapidestate.com </p>
                <p className="email-p" ><b>Our Phone: </b> +123456789, +123456789 </p>
                <form method="POST">
                    <input type="text" className="name" placeholder="Name"/><br/>
                    <input type="email" className="email" placeholder="Email"/><br/>
                    <textarea placeholder="Your Message"></textarea><br/>
                    <button type="submit">Send</button>
                </form><br/>        
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
export default Contact;