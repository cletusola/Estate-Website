import axios from "axios";
import React,{useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainHeader from "../../hocs/MainHeader";

import './blog.css'

const BlogDetail = () => {

        const [blog, setBlogs] = useState({});

        const { id } = useParams();

        useEffect(() => {

            const getblogs = async () => {
                const res = await axios.get(`http://127.0.0.1:8000/api/blog/${id}`)
                setBlogs(res.data)
                console.log(res.data)
            } 
            getblogs();

        },[id])
    return (
        <React.Fragment>
            <MainHeader/>
            <div className="d-container">
                <div className="d-obj">
                    <h2 className="d-t">{blog.title}</h2>
                    <p className="d-dt">{blog.date}</p>
                    <p className="d-e">{blog.excerpt}</p>
                    <img className="d-img" src={blog.image}/><br/><br/>
                    <p className="d-d" >{blog.content}</p>

                </div>
            </div>
        </React.Fragment>
    )
}
export default BlogDetail;