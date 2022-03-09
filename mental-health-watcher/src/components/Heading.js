import React from "react";
import { Link } from "react-router-dom";



function Header(){
  return (
    <React.Fragment>
      <div className="header">
        
        <Link to="/signin" className="links">Sign In</Link>
        <Link to="/signup" className="links">Sign Up</Link>
        <Link to="/signout" className="links">Sign Out</Link>        
        <Link to="/" className="links">Home</Link>
        <h1>Mental Health Watcher For Fitbit Versa3 smartwatch</h1>
        <h3 className="versa"></h3>
      </div>
      
    </React.Fragment>
  );
}

export default Header;