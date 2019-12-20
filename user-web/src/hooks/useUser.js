 
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {url,checkAuth} from '../commons/constants/api';
 
function getCurrentUser(accessToken) {
  if (accessToken  === localStorage.getItem('tolen')) {
    axios({
        method: 'get',
        url: `${url}${checkAuth}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${accessToken}`
        }
      }).then(async (response)=>{
        if(response.data){
          const {user} = response.data;
          return user;
        }
      }).catch((error)=>{
        return {};
      })
  }
}
 
const initialState = {
  user: {},
  accessToken: undefined,
  authenticated: false
};
 
const UserContext = createContext(initialState);
 
export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
 
  function handleAccessTokenChange() {
    if (!user && accessToken) {
      localStorage.setItem('token', accessToken);
      const {user,authenticated} = getCurrentUser(accessToken);
      setUser(user);
    } else if (!accessToken) {
      // Log Out
      localStorage.removeItem('token');
      setUser({});
    }
  }
 
  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);
 
  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}
 
export const useUser = () => useContext(UserContext);