import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom'
//@ts-ignore
export default function PrivateRoute({ component: Component, ...rest }) {
   //@ts-ignore
    function readCookie(name: string) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
      }
  const token = readCookie('token');
  
  const authed = () => {
 
    if (token === null) {
      return false
    }
    if ( token !== "" || token!==undefined) {
            return true
    }
    else {
        return false
        }
        
    }
 
    return (
      <Route
        {...rest}
        render={(props) => (authed() === true)
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }