import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MainHeader from "../../hocs/MainHeader";
import Slideshow from "./HomeSlide";
import './Home.css'

import 'react-slideshow-image/dist/styles.css'

const Home = () => {

    const [property, setProperty] = useState([])
    const [agents, setAgents] = useState([])
    const [blogs, setBlogs] = useState([])


    const getProperty = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/listing/home_display/`)
        setProperty(res.data)
        console.log(res.data)

    }
    useEffect(() => {
        getProperty();
    },[]);

    const getAgent = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/agent/home_display/`)
        setAgents(res.data)
        console.log(res.data)
    }
    useEffect(() => {
        getAgent();
    },[]);

    const getBlog = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/blog/home_display/`)
        setBlogs(res.data)
        console.log(res.data)
    }
    useEffect(() => {
        getBlog();
    },[]);

    return (
        <React.Fragment> 
            <MainHeader/>
            <Slideshow/><br/><br/><br/>
            <h3 className="service-head">Our Services</h3><br/>
            <div className="our-service">
                
                <div className="pr-lifestyle">
                    <h1 className="pr-head">Lifestyle</h1>
                    <p>Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. </p>
                </div>
                <div className="pr-loan">
                    <h1 className="pr-head">Loans</h1>
                    <p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. </p>
                </div>
                <div className="pr-sell">
                    <h1 className="pr-head">Sell</h1>
                    <p>Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. </p>
                </div>
            </div><br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="p-div">
            <h2 className="p-head">Properties</h2>
            <p className="all-p"><Link to="/listings" >all properties</Link></p>
            </div><br/>
            <div className="properties">
            {property && property.length > 0 ? property.map((pr) => (
                
                <div className="p-one">
                    <img className="pr-img" src={pr.image1} alt="property-image" />
                    <div className="p-word">
                        <p><b>{pr.name}</b></p>
                        <p><Link to={`/listings/${pr.id}`} style={{'textDecoration':'none'}}>{pr.address}</Link></p>
                    </div>
             
                </div>
            )): "no pr"}
            </div>
            
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="p-div">
            <h2 className="p-head">Agents</h2>
            <p className="all-p"><Link to="/agents">all agents</Link></p>
            </div>

            <div className="agents">
            {agents && agents.length > 0 ? agents.map((a) => (
            <div className="a-one">
            <img className="a-img" src={a.picture} alt="agent-img" />
                <div className="p-word">
                    <p style={{'fontSize':'15px','marginLeft':'-30px'}}><Link to={`agents/profile/${a.username}`} style={{'textDecoration':'none'}}>{a.first_name} {a.last_name}</Link></p><br/>
                    <p style={{'fontSize':'13px','marginLeft':'-30px'}}>{a.email}</p>
                </div>
            </div>
            )): " "}
            </div>

            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="p-div">
            <h2 className="p-head">Blogs</h2>
            <p className="all-p"><Link to="/blogs" >all blogs</Link></p>
            </div>
            <div className="blogs">
                {blogs && blogs.length > 0 ? blogs.map((b) => (
                    <div className="b-one">
                    <img className="bl-img" src={b.image} alt="blog-image" />
                    <br/>
                    <p className="bl-text"><Link to={`/blogs/${b.id}`} style={{'textDecoration':'none'}}>{b.excerpt}</Link></p>
                </div>
                )):""}
            </div><br/><br/>
            <div className="pg-footer">
                <hr/>
            <p className="pg-last-p">
              <span>&copy; Copyright</span>
              <span class="color-a">RapidEstate</span> All Rights Reserved.
            </p>
            {/* <p className="mid-p">fghuytr</p> */}
            <p className="end-p"> 304 Blaster Up Chicago, IL 606543</p>
            </div>
        </React.Fragment>
    )
}

export default Home;