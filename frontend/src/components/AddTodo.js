import React from 'react'
import loginstyles from './styles/Login.module.css'
import styles from './styles/AddTodo.module.css'
import { useState } from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import {MentionsInput, Mention} from 'react-mentions'
export default function AddTodo() {
  const user = jwt(localStorage.getItem('access_token'))['user_id']

  const [Post, setPost] = useState({'title' : '', 'description' : '', 'owner' : user})



  const updateTitle = (e) =>{
      setPost({...Post, 'title' : e.target.value})
      console.log(Post)
  }

  const updateDescription = (e) =>{
    setPost({...Post, 'description' : e.target.value})
    console.log(Post)
}

const submit =(e) => {
  e.preventDefault()

  // Create the POST requuest
 axios.post('http://localhost:8000/api/todo/', Post, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      "Content-type": "Application/json",
  }
  }).then((response) => {
    alert("You post has been created")
  }).catch((error) => {
  })

  // Initialize the access & refresh token in localstorage.
  
}

const users = [
  { id: '1', display: '@Oli Smith' }, 
  { id: '2', display: '@Janet Williams' },
  { id: '3', display: '@Peter Jones' },
  { id: '4', display: '@Bill Rogers' },
]



  return (
    <form onSubmit={submit} className={styles.postform}>
        <div>
        <label className={styles.label} >Title</label>
        <input onChange={updateTitle} name="title" className={loginstyles.inputBox} type="text" placeholder="Title" />
        </div>
        <div>
        <label  className={styles.label}>Description</label>
        <MentionsInput value={Post.description} className={loginstyles.inputBox}  onChange={updateDescription}>
  <Mention
    trigger="@"
    data={users}
    
  />
  <Mention
    trigger="#"
    data={users}
    
  />
</MentionsInput>
        {/* <textarea name="desciption" onChange={updateDescription} className={loginstyles.inputBox} placeholder="Description" /> */}
        </div>
        <button className={loginstyles.inputBox} type="submit">Add Todo</button>
    </form>
  )
}
