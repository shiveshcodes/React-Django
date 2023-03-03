import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
var cors = require('cors')

if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
            Notification.requestPermission(function(result) {
                  console.log("User choice", result);
                  if (result !== "granted") {
                    console.log("No notification permission granted!");
                  } 
                });
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
            <App />
      </BrowserRouter>

      );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
