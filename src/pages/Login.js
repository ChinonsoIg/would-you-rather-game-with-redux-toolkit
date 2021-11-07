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
  // console.log(users)
  // console.log(userOptions)

  
  const handleChange = (e, data) => {
    e.preventDefault();
    const id = data.value;

    setAuthedUser(id);
     
    console.log(id)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (authedUser !== '') {
      console.log(authedUser)
      dispatch(login(authedUser))
    }
    console.log(from)
    history.replace(from);
  };
    
  return (
    <Container className="login">
      <p>You must log in to view the page at {from.pathname}</p>
      <Card centered raised>
        <Card.Content style={{backgroundColor: lightGrey, padding: '1px'}}>
          <Header as='h4'>Welcome to Would You Rather Game</Header>
          <p>Please sign in to continue</p>
        </Card.Content>
        <Card.Content>
          <Image src={logo} size='tiny' />
          <Header as='h5' color='teal'>Sign In</Header>
          <Select 
            placeholder='Select user' 
            fluid
            options={userOptions} 
            onChange={handleChange} 
          />
          {/* <Dropdown
            placeholder='Select user'
            fluid
            search
            selection
            options={userOptions}
            onChange={handleChange}
          /> */}
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