import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Select, Card, Image, Button, Container, Header } from 'semantic-ui-react'
import { login } from "../redux/slices/userSlice";
import logo from "../assets/image/redux-logo.png";
import { lightGrey } from "../utils/colours";

const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.allUsers)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const [authedUser, setAuthedUser] = useState('');

  const userOptions = Object.keys(users).map((user) => {
    const mapUsers = {
      key: users[user].id,
      value: users[user].id,
      text: users[user].name,
      image: {
        avatar: true,
        src: users[user].avatarURL.default
      }       
    }
    return mapUsers;
  
  })
  
  const handleChange = (e, data) => {
    e.preventDefault();
    const id = data.value;

    setAuthedUser(id);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (authedUser !== '') {
      dispatch(login(authedUser))
    }
    history.replace(from);
  };
    
  return (
    <Container className="login">
      {/* <p>You must log in to view the page at {from.pathname}</p> */}
      <Card centered raised>
        <Card.Content textAlign='center' style={{backgroundColor: lightGrey, padding: '1px'}}>
          <Header as='h4'>Welcome to Would You Rather Game</Header>
          <p>Please sign in to continue</p>
        </Card.Content>
        <Card.Content textAlign='center'>
          <Image src={logo} size='tiny' />
          <Header as='h5' color='teal'>Sign In</Header>
          <Select 
            placeholder='Select user' 
            fluid
            options={userOptions} 
            onChange={handleChange} 
          />
          <Button
            fluid
            color='teal'
            style={{ marginTop: '10px' }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Card.Content>
      </Card>

    </Container>
  );
}

export default Login;