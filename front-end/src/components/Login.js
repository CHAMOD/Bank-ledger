import { withRouter } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Button, Form,  Col,  Card } from 'react-bootstrap';
import { LoginContext } from "./loginContext";
import UserAPI from '../services/UserService';

const Login = ({ history, setLogin, setRole }) => {
  const loginContext = useContext(LoginContext);

  const checkCredentials = (username, password) => {


    let user = { name: username, password: password }
    UserAPI.login(user).then(result => {
      if (result && result.status === 200) {
        UserAPI.getProfile(username)
          .then(result => {
            loginContext.setLogin(true);
            loginContext.setRole(result.data.role);
            history.replace('/');
          })


        
      } else {
        setMessage('Invalid Login');
      }

    }
    )



  };

  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const onChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
   
    <Card className={"border border-dark bg-dark text-white"}>
      {message || '\u00A0'}
      <Card.Header>login</Card.Header>
      <Form>
        <Card.Body>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>User Name</Form.Label>
              <Form.Control required
                type="text" name="username"
              id="username"
                onChange={e => onChange(e.target.name, e.target.value)}
                className={"bg-dark text-white"}
                placeholder="Enter User Name" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Password</Form.Label>
              <Form.Control required
                type="password" name="password"
                id="password"
                onChange={e => onChange(e.target.name, e.target.value)}
                className={"bg-dark text-white"}
                placeholder="Enter Password" />
            </Form.Group>
          </Form.Row>

        </Card.Body>
        <Card.Footer style={{ "textAlign": "right" }}>
          <Button size="sm" variant="success" type="button" onClick={() => checkCredentials(form.username, form.password)}>
            Login
          </Button>
        </Card.Footer>
      </Form>
    </Card>


  )
};
export default withRouter(Login);
