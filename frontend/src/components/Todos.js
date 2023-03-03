import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Todos() {
  const [data, setData] = useState(null);
  var message = "Loading...";

  const authToken = localStorage.getItem('access_token');

// Set the default Authorization header for Axios requests
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8000/api/todo', {headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        "Content-type": "Application/json",
    }})
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          message = "Error: " + error;
        });
    };
    fetchData();
  }, []);

  function deleteItem(id){
    axios.delete('http://localhost:8000/api/todo/'+id+'/').then((response)=>{
      window.location.reload(false)
      
    }).catch((error)=>{
      console.log(error)
    })
  }

  var renderedItems;

  if (!data) {
    return <div>{message}</div>;
  }
  else{
    // console.log(data.map(item => item.title));
    renderedItems= data.map(item => {
      return(
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <button onClick={()=>{
            deleteItem(item.id)
          }}> Delete</button>
        </div>)
    });
  }

  return (
    renderedItems
  );
}
