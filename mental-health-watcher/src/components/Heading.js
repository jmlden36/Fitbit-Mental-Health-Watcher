import React from "react";
import { Link } from "react-router-dom";



function Header(){
  return (
    <React.Fragment>
      <div className="header">
        
        <Link to="/signin" className="links">Sign In</Link>
        <h1>Mental Health Watcher</h1>
        <Link to="/" className="links">Home</Link>
      </div>
      
    </React.Fragment>
  );
}

export default Header;