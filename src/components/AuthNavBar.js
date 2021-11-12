import React, { useState } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

const AuthNavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authedUser = useSelector(state => state.users.currentUser);
  const users = useSelector(state => state.users.allUsers)

  const initialState = { activeItem: 'closest' }
  const [state, setState] = useState(initialState);

  const userDetails = Object.keys(users).filter((user) => users[user].id === authedUser).map(filteredUser => {
    return { 
      name: users[filteredUser].name, 
      avatar: users[filteredUser].avatarURL.default 
    };
  });

  const handleItemClick = (e, { name }) => {
    return setState({activeItem: name});
  }

  const handleLogout = (e) => {
    e.preventDefault();
    if (authedUser) {
      dispatch(logout())
    }
    history.push('/login');
  };

  return (
    <Menu pointing secondary color='purple'>
      <Menu.Item
        as={NavLink}
        exact
        to='/'
        name='home'
        active={state.activeItem === 'home'}
        onClick={handleItemClick}
      />
      <Menu.Item
        as={NavLink}
        exact
        to='/new'
        name='new question'
        active={state.activeItem === 'new question'}
        onClick={handleItemClick}
      />
      <Menu.Item
        as={NavLink}
        exact
        to='/leaderboard'
        name='leaderboard'
        active={state.activeItem === 'leaderboard'}
        onClick={handleItemClick}
      />
      {
        authedUser && (
          <Menu.Menu position='right'>
            <Menu.Item>
              {userDetails && userDetails[0].name}
            </Menu.Item>
            <Image avatar src={userDetails && userDetails[0].avatar} style={{marginTop:'0.35em'}} />
            <Menu.Item
              name='log out'
              active={state.activeItem === 'logout'}
              onClick={handleLogout}
            />
          </Menu.Menu>
        )
      }
    </Menu>
  );
}

export default AuthNavBar;
