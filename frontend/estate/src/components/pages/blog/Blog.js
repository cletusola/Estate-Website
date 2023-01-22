import React,{useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

import './blog.css';
import MainHeader from "../../hocs/MainHeader";
import axios from 'axios';
 
const Blog = () => {

    const [blog, setBlog] = useState([]);

    const getblogs = async() => {
        const res = await axios.get("http://127.0.0.1:8000/api/blog/")
        console.log(res.data)
        setBlog(res.data)
    }

    useEffect(() => {
        getblogs();
    },[]);

    return (
    <React.Fragment>
        <MainHeader/>
        <div className='b-container'>
            { blog && blog.length > 0 ? blog.map((b) => (
                <div className='b-obj'>
                <img className='b-img' src={b.image}/>
                <p className='b-title'><b>{b.title}</b></p>
                <p className='b-e'><Link to={`${b.id}`} >{b.excerpt}</Link> </p>
                </div>
            )):""}

        </div>
    </React.Fragment>
    )
}
export default Blog;