import './App.css';

import { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwr_decode from 'jwt-decode';
import { type } from '@testing-library/user-event/dist/type';
import { UserContextProvider } from './components/login/UserContext';
import { User } from './components/login/User';
import { useContext } from "react";
import { UserContext } from "./components/login/UserContext"

function App() {

  const userContext = useContext(UserContext);
  return (

    <div className='body'>
      <div className='top'>
        <h1 className='box-text'>Course Explorer - Qlue</h1>
      </div>
      <UserContextProvider>
        <User />
      </UserContextProvider>
    </div>

  );
}

export default App;
