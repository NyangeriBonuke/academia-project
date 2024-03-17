import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='loginpage'>
        <div className='login'>
            <h2>Sign Up</h2>
            <form className='form'>
                <input type='text' placeholder='Username' />
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button type='submit'>Sign Up</button>
            </form>
            <p><Link to='/login'>Login</Link> if you already have an account</p>
        </div>
    </div>
  )
}

export default Signup
