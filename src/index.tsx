import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'component/App';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from 'component/Login'
import reportWebVitals from './reportWebVitals';
import PrivateRoute from 'PrivateRoute'

import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_API_URL


ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <Switch>
      <PrivateRoute path='/todo' component={App} />
        <Route path="/">
        <Login />
        </Route>
   
      </Switch>
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
