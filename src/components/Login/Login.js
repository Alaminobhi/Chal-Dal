import React, { useContext } from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
const [user, setUser] = useState({
isSignedIn: false,
name: '',
email: '',
photo: '',
error: '',
});

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
initializeLoginFramework();

const [loggedInUser, setLoggedInUser] = useContext(UserContext);
const history= useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn =()=>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  // const fbSignIn = () => {
  //   handleFbSignIn()
  //   .then(res => {
  //     handleResponse(res, true);
  //   })
  // }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }
  
  const handleResponse = (res, redirect) =>{
    setUser(res);
        setLoggedInUser(res);
        localStorage.setItem("userId", JSON.stringify(res));
        if(redirect){
          history.replace(from);
        }
  }

  
  
  const handleChange = (e) => {
  let isFieldValid = true;
    if(e.target.name === 'email'){
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 8;
      const passwordHasNumber = /\d{2}/.test(e.target.value);
      isFieldValid =isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email, user.password);
     if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.email, user.password, user.name)
      .then(res => {
        handleResponse(res, true);
      })
     }
     if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
     }
     e.preventDefault();
  }
     
    
  return (
    <div className="text-center border">

     <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
     <label htmlFor="newUser"> New User Sign Up</label>

     <form onSubmit={handleSubmit}>

     {newUser && <input type="text" name="name" onBlur={handleChange}
      // onChange={handleChange}
     placeholder="Name" required/>} <br/><br/>
     <input type="email" name="email" id="" onBlur={handleChange} placeholder="Email" required/> <br/><br/>
     <input type="password" name="password" id="" placeholder="Password" onBlur={handleChange} required/> <br/><br/>
     <input className="btn btn-success" type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
     </form>
     <p style={{color: 'red'}}>{user.error}</p>
     {
       user.success && <p style={{color: 'green'}}>User {newUser ? 'Create' : 'Logged In'} Successfully</p>
     } <hr/>
        {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
        <button className="btn btn-primary" onClick={googleSignIn}>Google Sign In</button>
      }
      <br/>
    </div>
  );
} 
export default Login;
