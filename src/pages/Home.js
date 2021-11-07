import React, { useEffect } from "react";
import { Container, Tab } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { selectUser, users } from "../redux/slices/userSlice";
import { getInitialData } from "../utils/api";
import { getTodosAsync } from "../redux/slices/userSlice";
import Polls from "../components/Polls";


const Home = (props) => {
  const dispatch = useDispatch();
  // const users = useSelector(users);
  
  const panes = [
    { 
      menuItem: 'Unanswered Questions', 
      render: () => 
        <Tab.Pane>
          <Polls />
        </Tab.Pane> 
    },
    { 
      menuItem: 'Answered Questions', 
      render: () => 
        <Tab.Pane>
          <Polls />
        </Tab.Pane> 
    },
  ];
  
  return (
    <Container className='home-container' >
      <Tab 
        menu={{ widths: 2, color: 'teal', attached: true, tabular: false, pointing: true }} 
        panes={panes} 
      />
    </Container>
  );
}

export default Home;