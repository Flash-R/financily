import React, { useState } from 'react'
import "./style.css"
import Input from '../Input/index'
import Button from '../Button/index'
import { toast } from 'react-toastify'
import { auth, db, provider } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function SignUpSignIn() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState(false)

  const navigate = useNavigate()

  function signupWithEmail() {
    setLoading(true)
    // Authenticating the User and creating the account
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      toast.error('Please fill all the fields')
      setLoading(false)
      return
    }
    else if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      setLoading(false)
      return
    } else {
      // const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          toast.success('Signed Up Successfully')
          setLoading(false)
          setName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          createDoc(user)
          console.log(user)
          navigate('/Dashboard')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          setLoading(false)
          // ..
        });
    }
  }
  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          console.log("Usser", user);
          createDoc(user); 
          navigate('/Dashboard')
          toast.success('Signed In Successfully')
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          // ...
        });
        setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  async function createDoc(user) {
    // check if the doc with the User Id doesn't exist
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      // Create doc
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : '',
          createdAt: new Date(),
        });
        // toast.success('Doc created successfully');

      } catch (error) {
        toast.error(error.message);
      }

    } else {
      toast.error('User already exists');
    }

  }

  function loginWithEmail() {
    setLoading(true)
    if (email === '' || password === '') {
      toast.error('Please fill all the fields')
      setLoading(false)
      return
    } else {
      // const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success('Logged In Successfully')
          setName('')
          setEmail('')
          setLoading(false)
          navigate('/Dashboard')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          setLoading(false)
        });
    }
  }
  function loginWithGoogle() { }
  return (
    <>
      {login ?
        <div className="signupForm-wrapper">
          <h4 className='title'>Login <span style={{ color: "var(--theme)" }}>Financely</span></h4>
          <form className="signupForm">
            <Input label="Email" state={email} setState={setEmail} type="email" placeholder="Enter your email" />
            <Input label="Password" state={password} setState={setPassword} type="password" placeholder="Enter your Password" />
            <Button disabled={loading} text={loading ? "Loading ..." : "Login With Email and Password "} blue={false} onclick={loginWithEmail} />
            <p className='p-login-signup'>Or</p>
            <Button text={loading ? "Loading ..." : "Login With Google"} blue={true} onclick={googleAuth} />
            <p className='p-login-signup'>Or</p>
            <p className='p-login-signup' onClick={() => setLogin(false)}>Dont Have an Account? Click Here</p>
          </form>
        </div>
        :
        <div className="signupForm-wrapper">
          <h4 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span></h4>
          <form className="signupForm">
            <Input label="Name" state={name} setState={setName} type="text" placeholder="Enter your name" />
            <Input label="Email" state={email} setState={setEmail} type="email" placeholder="Enter your email" />
            <Input label="Password" state={password} setState={setPassword} type="password" placeholder="Enter your Password" />
            <Input label="Confirm Password" state={confirmPassword} setState={setConfirmPassword} type="password" placeholder="Confirm Password" />
            <Button disabled={loading} text={loading ? "Loading ..." : "Sign Up With Email and Password "} blue={false} onclick={signupWithEmail} />
            <p className='p-login-signup'>Or</p>
            <Button text={loading ? "Loading ..." : "Sign Up With Google"} blue={true} onclick={googleAuth} />
            <p className='p-login-signup' >Or</p>
            <p className='p-login-signup' onClick={() => setLogin(true)}>Already Have an Account? Click Here</p>
          </form>
        </div>
      }
    </>
  )
}

export default SignUpSignIn