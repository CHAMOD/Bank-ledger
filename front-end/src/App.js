import React, {useState} from 'react';
import './App.css';


import NavigationBar from './components/NavigationBar';
import { LoginContext } from './components/loginContext';
import Main from './Main';

const App = () => {
    const [isLoggedIn, setLogin] = useState();
    const [role,setRole] = useState();
    return (
      <LoginContext.Provider value={{ isLoggedIn, setLogin,role,setRole }}>
     <NavigationBar/>
        <br />
        <Main />
      </LoginContext.Provider>
    );
};


export default App;
