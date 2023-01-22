import axios from "axios";
import React,{ useState, useEffect ,useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/Authcontext";

import AgentHeader from "../../hocs/AgentHeader";
import './addlisting.css'





const EditListing = () => {
    let {authTokens} = useContext(AuthContext)
    let { id } = useParams();
    const navigate = useNavigate();


    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [price, setPrice] = useState("")
    const [contract_type, setContract_type] = useState("")
    const [area, setArea] = useState("")
    const [bed, setBed] = useState("")
    const [bath, setBath] = useState("")
    const [garage, setGarage] = useState("")
    const [description, setDescription] = useState("")
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)
    const [image5, setImage5] = useState(null)
    const [image6, setImage6] = useState(null)
    const [image7, setImage7] = useState(null)
    const [image8, setImage8] = useState(null)
    const [image9, setImage9] = useState(null)
    const [image10, setImage10] = useState(null)

    const ShowListings = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/listing/`,
        {headers: {"Authorization": `Bearer ${authTokens.access}`}})
        console.log(res.data)

        setName(res.data.name)
        setAddress(res.data.address)
        setPrice(res.data.price)
        setContract_type(res.data.contract_type)
        setArea(res.data.area)
        setBed(res.data.bed)
        setBath(res.data.bath)
        setGarage(res.data.garage)
        setDescription(res.data.description)

        if(image1 != null || image2 != null || image3 != null || image4 != null
            || image5 != null || image6 != null || image7 != null || image8 != null
            || image9 != null || image10 != null){
                setImage1(res.data.image1)
                setImage2(res.data.image2)
                setImage3(res.data.image3)
                setImage4(res.data.image4)
                setImage5(res.data.image5)
                setImage6(res.data.image6)
                setImage7(res.data.image7)
                setImage8(res.data.image8)
                setImage9(res.data.image9)
                setImage10(res.data.setImage10)
            }
    }
    useEffect(() => {
        ShowListings();
    },[])



    const EditListingInfo = async(e) => {
        e.preventDefault();

        let formfield = new FormData()
        formfield.append('name',name)
        formfield.append('address',address)
        formfield.append('price',price)
        formfield.append('contract_type',contract_type)
        formfield.append('area',area)
        formfield.append('bed',bed)
        formfield.append('bath',bath)
        formfield.append('garage',garage)
        formfield.append('description',description)
        if (image1 !== null ||image2 !== null ||image3 !== null ||
            image4 !== null || image5 !== null || image6 !== null||
            image7 !== null || image8 !== null|| image9 !== null|| 
            image10 !== null ) {
            formfield.append('image1',image1)
            formfield.append('image2',image2)
            formfield.append('image3',image3)
            formfield.append('image4',image4)
            formfield.append('image5',image5)
            formfield.append('image6',image6)
            formfield.append('image7',image7)
            formfield.append('image8',image8)
            formfield.append('image9',image9)
            formfield.append('image10',image10)
        }

        await axios({
            url:`http://127.0.0.1:8000/api/listing/${id}/`,
            method: 'PUT',
            data: formfield,
            headers: {
                'Accept':'application/json',
                'Content-Type':'multipart/formdata',
                "Authorization":  `Bearer ${authTokens.access}`,
            },
        }).then((response) => {
            console.log(response.data)
            navigate('/agents/profile')
        }).catch((err) => console.log(err))
    }

    return (
        <React.Fragment>
            <AgentHeader/>
            <div className="listing-div">
                <form method="POST" onSubmit={EditListingInfo}>
                    <label className="name">Name: </label><br/>
                    <input type='text' name="name" className="name" placeholder="Property Name(optional)"
                    defaultValue={name} onChange={(e) => setName(e.target.value)}/><br/>
                    <label className="address">Address: </label><br/>
                    <input type='text' name="address" className="address" placeholder="Property Address"
                    defaultValue={address} onChange={(e) => setAddress(e.target.value)} required/><br/>
                    <label className="price">Price: </label><br/>
                    <input type='text' name="price" className="price" placeholder="Price"
                    defaultValue={price} onChange={(e) => setPrice(e.target.value)} required /><br/>
                    <label className="contract_type">Contract Type: </label><br/>
                    <select name="contract_type" className="contract_type" required
                    defaultValue={contract_type} onChange={(e) => setContract_type(e.target.value)}>
                        <option value='sale'>Sale</option>
                        <option value='rent'>Rent</option>
                        <option value='both'>Rent or Sale</option>
                    </select><br/>
                    <label className="area">Area: </label><br/>
                    <input type='text' name="area" className="area" placeholder="Area Square"
                    defaultValue={area} onChange={(e) => setArea(e.target.value)}/><br/>
                    <label className="bed">Bed: </label><br/>
                    <input type='text' name="bed" className="bed" placeholder="No. of bedrooms" 
                    defaultValue={bed} onChange={(e) => setBed(e.target.value)}required/><br/>
                    <label className="bath">Bath: </label><br/>
                    <input type='text' name="bath" className="bath" placeholder="No. of bathrooms"
                    defaultValue={bath} onChange={(e) => setBath(e.target.value)} required/><br/>
                    <label className="garage">Garage: </label><br/>
                    <input type='text' name="garage" className="garage" placeholder="No. of garages(optional)"
                    defaultValue={garage} onChange={(e) => setGarage(e.target.value)}/><br/>
                    <label className="description">Description: </label><br/>
                    <textarea name="description" className="description" required placeholder="Property description"
                    defaultValue={description} onChange={(e) => setDescription(e.target.value)}></textarea><br/><br/>
                    <label className="image">Property Images(first 3 images are required): </label><br/>
                    <input type='file' name="image1" className="image" required
                    onChange={(e) => setImage1(e.target.files[0])}/><br/>
                    <input type='file' name="image2" className="image" required
                    onChange={(e) => setImage2(e.target.files[0])}/><br/>
                    <input type='file' name="image3" className="image" required
                    onChange={(e) => setImage3(e.target.files[0])}/><br/>
                    <input type='file' name="image4" className="image" 
                    onChange={(e) => setImage4(e.target.files[0])}/><br/>
                    <input type='file' name="image5" className="image"
                    onChange={(e) => setImage5(e.target.files[0])}/><br/>
                    <input type='file' name="image6" className="image"
                    onChange={(e) => setImage6(e.target.files[0])}/> <br/> 
                    <input type='file' name="image7" className="image"
                    onChange={(e) => setImage7(e.target.files[0])}/> <br/> 
                    <input type='file' name="image8" className="image"
                    onChange={(e) => setImage8(e.target.files[0])}/> <br/> 
                    <input type='file' name="image9" className="image"
                    onChange={(e) => setImage9(e.target.files[0])}/> <br/> 
                    <input type='file' name="image10" className="image"
                    onChange={(e) => setImage10(e.target.files[0])}/> <br/>  
                    <button type="submit" className="submit">Add Listing</button>    
                </form>
            </div>
        </React.Fragment>
    )
}
export default EditListing;