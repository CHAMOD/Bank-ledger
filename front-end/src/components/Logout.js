import { withRouter } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import { LoginContext } from "./loginContext";
import UserAPI from '../services/UserService';

const Logout = ({ history }) => {
  const loginContext = useContext(LoginContext);

  useEffect(() => {


    UserAPI.logout().then(result => {
      loginContext.setLogin(false);
      history.replace('/login');
    })


  });

  return (
    <div>
      Logout
    </div>
  )
};
export default withRouter(Logout);
