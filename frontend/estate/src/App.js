import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './components/context/Authcontext';
import SignUp from './components/pages/account/SignUp';
import Login from './components/pages/account/Login';
import ChangePassword from './components/pages/account/ChangePassword';
import Home from './components/pages/main/Home';
import Listing from './components/pages/listing/Listings';
import ListingDetails from './components/pages/listing/ListingDetails';
import AddListing from './components/pages/listing/AddListings';
import EditListing from './components/pages/listing/EditListings';
import Blog from './components/pages/blog/Blog';
import BlogDetail from './components/pages/blog/BlogDetails';
import Agents from './components/pages/agent/Agents';
import AgentProfile from './components/pages/agent/AgentProfile';
import PublicProfile from './components/pages/agent/PublicProfile';
import UpdateProfile from './components/pages/agent/UpdateProfileInfo';
import UpdateUserInfo from './components/pages/agent/UpdateUserInfo';
import AgentListing from './components/pages/listing/AgentListing';
import About from './components/pages/main/About';
import Contact from './components/pages/main/Contact';


function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <Routes>
           
              <Route exact path='/account/changepassword' element={<ChangePassword/>}/>

            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/contact' element={<Contact/>}/>
            <Route exact path='/agents' element={<Agents/>}/>
            <Route exact path='/agents/profile' element={<AgentProfile/>}/>
            <Route exact path='/agents/list/' element={<AgentListing/>}/>
            <Route exact path='/agents/profile/:agent/' element={<PublicProfile/>}/>
            <Route exact path='/agents/profile/update/:id/' element={<UpdateProfile/>}/>
            <Route exact path='/agents/profile/update/user/:id/' element={<UpdateUserInfo/>}/>
            <Route exact path='/listings' element={<Listing/>}/>
            <Route exact path='/listings/:id' element={<ListingDetails/>}/>
            <Route exact path='/listings/add' element={<AddListing/>}/>
            <Route exact path='/listings/edit/:id/' element={<EditListing/>}/>
            <Route exact path='/blogs' element={<Blog/>}/>
            <Route exact path='/blogs/:id' element={<BlogDetail/>}/>
            <Route exact path='/account/signup' element={<SignUp/>}/>
            <Route exact path='/account/login' element={<Login/>}/>
          </Routes>
        </AuthProvider>
      </Router>  
    </React.Fragment>
  );
}

export default App;
