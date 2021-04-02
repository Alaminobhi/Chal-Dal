import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

export const initializeLoginFramework = () =>{
    if(firebase.app.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

}
export const handleGoogleSignIn = () =>{
    const gProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(gProvider)
    .then(res =>{
     const {displayName, photoURL, email} = res.user;
     const signedInUser = {
      isSignedIn: true,
      newUser: false,
       name: displayName,
       email: email,
       photo: photoURL,
       success: true
     }
     return signedInUser;
    })
   .catch(error => {
    console.log(error);
    console.log(error.message);  
    })
  }

  export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((res) => {
      var credential = res.credential;
      var user = res.user;
      user.success = true;
     return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
    });
  }

  export const handleSignOut = () =>{
    return firebase.auth().signOut().then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        password: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      return signOutUser;
    }).catch(error => {
      console.log(error);
    });
  }

export const createUserWithEmailAndPassword = (name, email, password) =>{
   return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      }); 
}

export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
        
      })
      .catch((error) => {
        const newUserInfo = error.user;
        newUserInfo.error = error.message;
        newUserInfo.success = false;
       return newUserInfo;
      });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log(name);
    }).catch(function(error) {
    console.log(error);
    });
  }