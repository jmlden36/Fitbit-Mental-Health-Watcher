import React from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

function Signin() {
  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  
  return (
    <React.Fragment>
      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <input 
          type="text"
          name="signinEmail"
          placeholder="email" />
        <input
          type="password"
          name="signinPassword"
          placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
      <h3>If you don't have an account already please click the Sign Up button above</h3>
    </React.Fragment>
  )
}

export default Signin;