import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsersAsync } from "./redux/slices/userSlice";
import { fetchQuestionsAsync } from "./redux/slices/questionsSlice";
import Login from "./pages/Login";
import Home from './pages/Home';
import PrivateRoute from "./components/PrivateRoute";
import AuthNavBar from "./components/AuthNavBar";
import NewQuestion from './components/NewQuestion';
import Leaderboard from './components/Leaderboard';
import Poll from './components/Poll';


const App = () => {

  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(fetchQuestionsAsync());
  }, [dispatch])


  return (
    <div className="App">
      <Router>
        <AuthNavBar />
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/question/:id">
              <Poll />
            </PrivateRoute>
            <PrivateRoute exact path="/new">
              <NewQuestion />
            </PrivateRoute>
            <PrivateRoute exact path="/leaderboard">
              <Leaderboard />
            </PrivateRoute>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );

}

export default App;