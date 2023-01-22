import axios from "axios";
import React,{ useState, useEffect} from "react";
import { Link } from "react-router-dom";
import MainHeader from "../../hocs/MainHeader";
import './listing.css'


const Listing = () => {

    const [lisiting, setListing] = useState([]);


    const getListings = async() => {
        const res = await axios.get("http://127.0.0.1:8000/api/listing/")
        console.log(res.data)
        setListing(res.data)
    } 

    useEffect(() => {
        getListings();
    }, []);

    return (
        <React.Fragment>
            <MainHeader/>
            <div className="all">
                <div className="the-word">
                    <h1>Our Amazing Properties</h1>
                    <p>All properties</p>
                </div>
                { lisiting && lisiting.length > 0 ? lisiting.map((l) => (
                    <div className="listing-con">
                    <div className="list">
                        <div className="img-div">
                        <img className="l-img" src={l.image1} alt="listing-image" /><br/>
                        </div>
                        <br/>
                        <div className="p-div">
                        <p className="name"><b>{l.name}</b></p>
                        <p className="address"><b><i>Address</i></b>: {l.address}</p>
                        <p className="price"><b><i>Price</i></b>: ${l.price}</p>
                        <p className="type"><b><i>House Type</i></b>: {l.contract_type}</p>
                        <p className="agent"><b><i>Agent</i></b>: {l.agent}</p>
                        <p className="view"><Link to={`${l.id}`}>view apartment</Link></p><br/><br/>
                        <br/>
                        <br/><br/><br/><br/><br/>

                            
                        </div>
                    </div>
                </div>
                )):<h3>No lisitings to display</h3>} 
{/*  
                        <div className="footer">
                        <hr/>
                        <p className="last-p">
                        <span>&copy; Copyright</span>
                        <span class="color-a">RapidEstate</span> All Rights Reserved.
                        </p>
                        <p className="mid-p">fghuytr</p>
                        <p className="end-p">skskskskskskskskskskskssksksksksks</p>
                        </div>   */}
            </div>
            
        </React.Fragment>
    )
}
export default Listing;