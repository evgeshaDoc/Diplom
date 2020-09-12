import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import AppointmentPage from "./pages/AppointmentPage";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/appointments' exact component={MainPage} />
        <Route path='/appointment/:id' component={AppointmentPage} />
        <Route path='/' exact component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App
