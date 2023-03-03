import React, { useEffect, useState } from 'react'
import styles from './styles/Login.module.css'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const submit =(e) => {
    e.preventDefault()
    const user = {
      username: username,
      password: password,
    }

    var data;

   
    // Create the POST requuest
   axios.post('http://localhost:8000/token/', user, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        "Content-type": "Application/json",
    }
    }).then((response) => {
      data = response.data
      localStorage.clear()
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    axios.defaults.headers.common['Authorization'] = `Bearer ${data['access_token']}`
    window.location.href = '/'
    }).catch((error) => {
      setError(true)
    })

    // Initialize the access & refresh token in localstorage.
    
  }

  return (
    <form onSubmit={submit} className={styles.login}>
      <p>Welcome to Shivesh's Project</p>
      <p className={error? styles.error: styles.hide}>Error Login</p>
      <input
        className={styles.inputBox}
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.inputBox}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.myButton} type="submit">
        Login
      </button>
    </form>
  )
}

export default Login
