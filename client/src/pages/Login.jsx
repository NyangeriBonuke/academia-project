import React, { useEffect, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!email || !password){
            setError('Missing credentials')
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            setError('Invalid email format')
            return;
        }

        try{
            const response = await axios.post('', {
                email: email,
                password: password
            })

            console.log(response.data)
        }
        catch(error){
            setError(error.response.data.message || 'An error occured')
        }

        setTimeout(() => {
            setError('')
        }, 5000)
    }
  return (
    <div className='loginpage'>
        <div className='login'>
            <h2>Login</h2>
            <form className='form' onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
            </form>
            <p><Link to='/signup'>Sign up</Link> if you don't have an account</p>
        </div>
    </div>
  )
}

export default Login
