import React from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

function Signup() {
  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      console.log("successfully signed up!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input
          type="text"
          name="email"
          placeholder="email" />
        <input
          type="password"
          name="password"
          placeholder="Password" />
        <button type="submit">Sign up</button>
      </form>
      <h3>Already Have An Account?  Click on Sign In</h3>
    </React.Fragment>
  )
}

export default Signup;