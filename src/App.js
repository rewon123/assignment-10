import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Componenets/Home/Home';
import Register from './Componenets/Register/Register';
import PrivateRoute from './Componenets/PrivateRoute/PrivateRoute';
import Login from './Componenets/Login/Login';
import Dashboard from './Componenets/UserDashboard/Dashboard';
import { initializeLoginFramework, userLogin } from './Componenets/Login/LoginManger';
import AdminPanel from './Componenets/Admin-panel/AdminPanel';
import AddEvent from './Componenets/Admin-panel/AddEvent';

export const UserContext = createContext();

function App() {
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const login = userLogin(function (cv) {

      const signedInUser = {
        isSignedIn: true,
        name: cv.displayName,
        email: cv.email,
        photo: cv.photoURL,
        success: true

      };
      setLoggedInUser(signedInUser);
    });
  }, [])
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, user, setUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/register/:id">
            <Register></Register>
          </PrivateRoute>
          <PrivateRoute path="/DashBoard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
          <Route path='/addEvent'>
            <AddEvent />
          </Route>
          <Route exact path="*">
            <h1> this page is not ready yet</h1>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
