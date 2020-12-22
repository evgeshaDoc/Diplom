import React, { createContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import MainPage from './MainPage/MainPage';
import AppointmentPage from './AppointmentPage/AppointmentPage';
import NavBar from './NavBar/NavBar';
import LandingPage from './LandingPage/LandingPage';
import { useAuth } from './hooks/auth.hook';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import NavBarUnreg from './NavBar/NavBarUnreg';

export const MainContext = createContext({});

function App() {
  const { token, login, logout } = useAuth();

  if (!token) {
    return (
      <MainContext.Provider value={{ login, token }}>
        <Router>
          <NavBarUnreg />
          <Switch>
            <Route exact path='/appointment/:id'>
              <Redirect to='/login' />
            </Route>
            <Route exact path='/appointments'>
              <Redirect to='/login' />
            </Route>
            <Route exact path='/' component={LandingPage} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/register' exact component={RegisterPage} />
          </Switch>
        </Router>
      </MainContext.Provider>
    );
  }

  return (
    <MainContext.Provider value={{ token, login, logout }}>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/login'>
            <Redirect to='/appointments' />
          </Route>
          <Route path='/register'>
            <Redirect to='/appointments' />
          </Route>
          <Route path='/appointments' exact component={MainPage} />
          <Route path='/appointment/:id' component={AppointmentPage} />
          <Route path='/' exact component={LandingPage} />
        </Switch>
      </Router>
    </MainContext.Provider>
  );
}

export default App;
