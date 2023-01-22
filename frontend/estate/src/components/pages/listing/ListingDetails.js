import axios from "axios";
import React,{ useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainHeader from "../../hocs/MainHeader";





const ListingDetails = () => {
    
    const [listings, setlistings] = useState([]);

    const { id } = useParams();

    useEffect(() => {

        const getlistings = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/listing/${id}/`)
            setlistings(res.data)
            console.log(res.data)
            console.log(setlistings)
        } 
        getlistings();

    },[id])

    return (
        <React.Fragment>
            <MainHeader/>
            <div className="all">
                <div className="the-word">
                    <h1>Our Amazing Properties</h1>
                    <p>All properties</p>
                </div>
                <div className="listing-con">
                    <div className="list">
                        <div className="img-div">
                        <img className="l-img" src={listings.image1} /><br/>
                        <img className="l-img" src={listings.image2} /><br/>
                        <img className="l-img" src={listings.image3} /><br/>
                        { listings.image4 ?
                        <div>
                        <img className="l-img" src={listings.image4} /><br/>
                        </div>
                         :""}
                        { listings.image5 ?
                        <div>
                        <img className="l-img" src={listings.image5} /><br/>
                        </div>
                         :""}
                        { listings.image6 ?
                        <div>
                        <img className="l-img" src={listings.image6} /><br/>
                        </div>
                         :""}
                        { listings.image7 ?
                        <div>
                        <img className="l-img" src={listings.image7} /><br/>
                        </div>
                         :""}
                        { listings.image8 ?
                        <div>
                        <img className="l-img" src={listings.image8} /><br/>
                        </div>
                         :""}
                        { listings.image9 ?
                        <div>
                        <img className="l-img" src={listings.image9} /><br/>
                        </div>
                         :""}
                        { listings.image10 ?
                        <div>
                        <img className="l-img" src={listings.image10} /><br/>
                        </div>
                         :""}
                         
                
                        </div>
                        {/* <div className="aaa">

                        </div> */}
                        <br/><br/>
                        <p className="agent"><b>Agent: </b> {listings.agent}</p>
                        <p className="name"><b>{listings.name}</b></p>
                        <p className="address"><b>Address: </b> {listings.address}</p>
                        <p className="address"><b>For: </b> {listings.contract_type}</p>
                        <p className="bed" ><b>Price: </b> {listings.price}</p>
                        <p className="bed" ><b>Bedroom: </b> {listings.bed}</p>
                        <p className="bed" ><b>Bathroom: </b> {listings.bath}</p>
                        <p className="bed" ><b>Garage: </b> {listings.garage}</p>
                        <p className="bed" ><b>Area: </b> {listings.area}</p>
                        
                        <p className="price"><b>Price: </b>  {listings.price}</p>
                        <p className="type"><b>Contract type: </b>  {listings.contract_type}</p><br/>
                        <p className="description"><b>Description: </b> {listings.description}</p> 
                        <span className="view"><Link className="kkk" to={`../agents/profile/${listings.agent}`} >contact</Link></span>
                        <br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                </div>
            </div>
            {/* <div className="footer">
                <hr/>
            <p className="last-p">
              <span>&copy; Copyright</span>
              <span class="color-a">RapidEstate</span> All Rights Reserved.
            </p>
            <p className="mid-p">fghuytr</p>
            <p className="end-p">skskskskskskskskskskskssksksksksks</p>
            </div>   */}
        </React.Fragment>
    )
}
export default ListingDetails;