import React, { useState } from 'react'
import "./style.css"
import Input from '../Input/index'
import Button from '../Button/index'

function SignUpSignIn() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function signup(){
    alert('Signup')
  }
  function signupWithGoogle(){
    alert('Signup with Google')
  }

  return (
    <div className="signupForm-wrapper">
      <h4 className='title'>Sign Up on <span style={{color: "var(--theme)"}}>Financely</span></h4>
      <form className="signupForm">
        <Input label="Name" state={name} setState={setName} type="text" placeholder="Enter your name" />
        <Input label="Email" state={email} setState={setEmail} type="email" placeholder="Enter your email" />
        <Input label="Password" state={password} setState={setPassword} type="password" placeholder="Enter your Password" />
        <Input label="Password" state={confirmPassword} setState={setConfirmPassword} type="password" placeholder="Confirm Password" />
        <Button text="Sign Up With Email and Password " blue={false} onclick={signup} />
        <p style={{textAlign: "center"}}>Or</p>
        <Button text="Sign Up With Google" blue={true} onclick={signupWithGoogle} />
      </form>
    </div>
  )
}

export default SignUpSignIn