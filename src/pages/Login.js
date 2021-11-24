import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Select, Card, Image, Button, Container } from 'semantic-ui-react'
import { login } from "../redux/slices/combinedSlice";
import logo from "../assets/image/redux-logo.png";
import { darkPurple, lighterPurple, reduxPurple, white } from "../utils/colours";

const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.combined.users)
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
      <Card centered raised>
        <Card.Content 
          textAlign='center' 
          style={{
            backgroundColor: lighterPurple, 
            color: darkPurple,
            padding: '1px', 
          }} 
        >
          <h4>Welcome to Would You Rather Game</h4>
          <p>Please sign in to continue</p>
        </Card.Content>
        <Card.Content textAlign='center'>
          <Image src={logo} size='tiny' />
          <h5 style={{color: reduxPurple}}>Sign In</h5>
          <Select 
            placeholder='Select user' 
            fluid
            options={userOptions} 
            onChange={handleChange} 
            style={{color: reduxPurple}}
          />
          <Button
            fluid
            style={{ color: white, marginTop: '10px', backgroundColor: reduxPurple }}
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