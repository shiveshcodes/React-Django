import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { useContext, useState} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes
} from "react-router-dom";




function App() {

  const token = localStorage.getItem('access_token')
  console.log(token)
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn)

  if(!loggedIn && token){
    axios.post('http://localhost:8000/token/verify/', {
      'token': token
    }).then((response)=>{
      console.log(response.data)
      setLoggedIn(true)
    }).catch((error)=>{
        console.log(error)
    })
  }
  


  return (
    <>
    {loggedIn ? <Navbar/>: null}
    <Routes>
      
      {loggedIn ? (
        <>
        <Route path="/create" element={<AddTodo />} />
        <Route path="/view" element={<Todos />} />
        <Route path="/" element={<Home />} />
        </>
      ) : <Route path="/" element={<Login />} />}      
    </Routes>
    </>
  );
}

export default App;
