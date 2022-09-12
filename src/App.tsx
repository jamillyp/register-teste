import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { CreateEvent } from './pages/CreateEvent';
import { EditEvent } from './pages/EditEvent';
import { Communication } from './pages/Communication';

import { Home } from './pages/Home';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/editEvent" exact component={EditEvent} />
        <Route path="/createEvent" exact component={CreateEvent} />
        <Route path="/communication" exact component={Communication} />
      </Switch>
    </Router>
  );
}
