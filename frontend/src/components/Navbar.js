import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles/Navbar.module.css'
function Navbar() {

  const Logout = () =>{
    localStorage.clear();
    const navigate = useNavigate();
    navigate('/', { replace: true });
  }
  return (

    
    <div  className={styles.navbar}>
      <p className={styles.navlogo}>Shivesh's Todo App</p>
      <div className={styles.navopt}>
      <Link className = {styles.navelement} to='/' onClick={Logout}>Logout</Link>
      <Link className = {styles.navelement} to="/create">Create</Link>
      <Link className = {styles.navelement} to="/view">View</Link>
      </div>

    </div>
  )
}

export default Navbar