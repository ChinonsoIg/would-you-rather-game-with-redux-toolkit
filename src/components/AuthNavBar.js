import React, { useState } from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/slices/combinedSlice";
import { darkPurple } from '../utils/colours';

const AuthNavBar = (props) => {
  const { width } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const authedUser = useSelector(state => state.combined.authedUser);
  const users = useSelector(state => state.combined.users)

  // Menubar for width > 576
  const initialState = { activeItem: 'home' }
  const [state, setState] = useState(initialState);

  const userDetails = Object.keys(users)
    .filter((user) => users[user].id === authedUser)
    .map(filteredUser => {
      return { 
        name: users[filteredUser].name, 
        avatar: users[filteredUser].avatarURL.default 
      };
    });

  const handleItemClick = (_e, { name }) => {
    return setState({activeItem: name});
  }

  const handleLogout = (e) => {
    e.preventDefault();
    if (authedUser) {
      dispatch(logout())
    }
    history.push('/login');
  };

  // Check if the device width <= 576
  if (width <= 576) {
    return (
      <Menu pointing secondary color='purple'>
        <Menu.Item>
          {
            authedUser && (
              <Menu.Menu position='right'>
                <Image 
                  avatar 
                  src={userDetails && userDetails[0].avatar} 
                  style={{margin:'0.35em 0 0 1rem'}} 
                />
                <Menu.Item 
                  content={userDetails && userDetails[0].name}
                  style={{
                    color: darkPurple,
                    paddingLeft: '0.5rem', 
                    fontWeight: '600'
                  }}
                />
              </Menu.Menu>
            )
          }
        </Menu.Item>
        <Menu.Item position='right'>
          <Dropdown 
            icon='bars' 
            pointing='top right' 
            className='link item' 
            direction='left'
          >
            <Dropdown.Menu>
              <Dropdown.Item 
                as={Link} 
                to='/'
                content='Home'
              />
              <Dropdown.Item 
                as={Link} 
                to='/new'
                content='New Question'
              />
              <Dropdown.Item 
                as={Link} 
                to='/leaderboard' 
                content='Leaderboard' 
              />
              <Dropdown.Item
                content='Log out'
                onClick={handleLogout}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
  }

  // Else if the device width > 576, render
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
