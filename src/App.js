import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Home from './pages/Home';
import PrivateRoute from "./components/PrivateRoute";
import AuthNavBar from "./components/AuthNavBar";

import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "./redux/slices/userSlice";
import { fetchQuestionsAsync } from "./redux/slices/questionsSlice";
import NewQuestion from './components/NewQuestion';
import Leaderboard from './components/Leaderboard';
import Poll from './components/Poll';
import PollResult from './components/PollResult';


const App = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.questions.questions);
 
  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(fetchQuestionsAsync());
  }, [dispatch])

  // console.log(state.user)
  console.log(state);

  return (
    <div className="App">
      <Router>
        <AuthNavBar />
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute exact path="/new">
              <PollResult />
            </PrivateRoute>
            <PrivateRoute exact path="/leaderboard">
              <Leaderboard />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );

}

export default App;