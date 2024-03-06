import React, { useEffect } from 'react'
import "./style.css"
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate('/Dashboard')
    }
  }, [user,loading])

  function logout() {
    signOut(auth).then(() => {
      toast.success('Logged Out Successfully')
      navigate('/')
      // Sign-out successful.
    }).catch((error) => {
      toast.error(error.message)
      // An error happened.
    });
  }
  return (
    <div className='navbar'>
      <p className='title'>Header</p>
      {user &&
        <p className='title link' onClick={logout}>Logout</p>
      }
    </div>
  )
}

export default Header