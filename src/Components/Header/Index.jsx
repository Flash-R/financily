import React from 'react'
import "./style.css"

function Header() {

  function logout() {
    alert('Logout')
  }
  return (
    <div className='navbar'>
      <p className='title'>Header</p>
      <p className='title link' onClick={logout}>Logout</p>
    </div>
  )
}

export default Header