import React from "react";
import { Link } from "react-router-dom";

function Header(){
  return (
    <React.Fragment>
      <div className="header">
        <h1>Mental Health Watcher</h1>
        <h4>
          <Link to="/">Home</Link>
        </h4>
        <h4>
          <Link to="/signin">Sign In</Link>
        </h4>
      </div>
      
    </React.Fragment>
  );
}

export default Header;