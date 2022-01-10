import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Welcome from './components/Welcome';
import Userslist from './components/Userslist';
import Accountslist from './components/Accountslist';
import Adduser from './components/Adduser';
import Addaccount from './components/Addaccount';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Login from './components/Login';
import { LoginContext } from './components/loginContext';
import TransactionHistory from './components/TransactionHistory';
import Logout from './components/Logout';

const ProtectedRoute = ({ isAllowed, ...props }) => isAllowed ? <Route {...props} /> : <Redirect to="/login" />;

const Main = () => {
    const loginContext = useContext(LoginContext);
   
    return (
        
        <Container>
        <Switch>
          <Route exact path='/login' render={() => <Login/> }/>
          <Route exact path='/logout' render={() => <Logout />}/>
          <Route path='/Adduser'  render={() => <Adduser /> } />
          <ProtectedRoute path='/Userslist' component={Userslist} isAllowed={loginContext.isLoggedIn} />
          <ProtectedRoute path='/Addaccount' component={Addaccount} isAllowed={loginContext.isLoggedIn} />
         <ProtectedRoute path='/Deposit' component={Deposit} isAllowed={loginContext.isLoggedIn} />
         <ProtectedRoute path='/Withdraw' component={Withdraw} isAllowed={loginContext.isLoggedIn} />
         <ProtectedRoute path='/Transactions' component={TransactionHistory} isAllowed={loginContext.isLoggedIn} />
         <ProtectedRoute path='/Accountslist' component={Accountslist} isAllowed={loginContext.isLoggedIn} />
         <ProtectedRoute path='/' component={Welcome} isAllowed={loginContext.isLoggedIn} />
           {/* <ProtectedRoute path='/transaction-create' component={TransactionCreate} isAllowed={loginContext.isLoggedIn} /> */}
        </Switch>
        </Container>
    );
};

export default Main;