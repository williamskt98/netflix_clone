import React, { useEffect, useState, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { auth, logout } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Link } from 'react-router-dom'


const Navbar = (props) => {

    // Adds Dynamic Background to Navbar on Scroll
    const navRef = useRef();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 80) {
                navRef.current.classList.add('nav-dark')
            } else {
                navRef.current.classList.remove('nav-dark')
            }
        })
    },[])

    // Fetches First Name from Firebase Auth User
    const [firstName, setFirstName] = useState("");
    const [uid, setUid] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setFirstName(user.displayName);
                setUid(user.uid);
            }
        })
    }, []);

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
            <li><Link to={'/'} className='navbar-link'>Home</Link></li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li><Link to={`/mylist/${uid}`} className='navbar-link'>My List</Link></li>
            <li>Browse by Languages</li>
            <li><Link to={'/test'} className='navbar-link'>Test</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className='icons' />
        <p>{firstName}</p>
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
            <img src={profile_img} alt="" className='profile' />
            <img src={caret_icon} alt="" className='icons' />
            <div className="dropdown">
                <p onClick={() => {logout()}}>Sign Out of Netflix</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
