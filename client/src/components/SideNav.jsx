import React, {useRef,useState} from "react";
import {IoIosArrowDropright,IoIosArrowDropleft} from 'react-icons/io';

// We import bootstrap to make our application look better.
import "../styles/sideNav.css"
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function SideNav(props) {
    const role = window.user.role;
    let navRef = useRef();
    let navContent = useRef();
    const [navToggle, setNavToggle] = useState(true);

    const toggleNav = () => {
        if(navToggle){
            navRef.current.style.width = "150px";
            navContent.current.style.display = "flex";
        }else{
            navRef.current.style.width = "30px";
            navContent.current.style.display = "none";
        }
        setNavToggle(!navToggle);
    }

 return (
    <div id="mySidenav" className="sideNav" ref = {navRef}>
        <span className="navToggleBtn" onClick={toggleNav}>{navToggle?<IoIosArrowDropright size={30}/>:<IoIosArrowDropleft size={30}/>}</span>
        <div className="menuContent flex-column" ref={navContent}>
            <NavLink className="navBtn" to="/">Custom Quiz</NavLink>
            <NavLink className="navBtn" to="/Settings">Settings</NavLink>
        </div>
        
    </div>
 );
}