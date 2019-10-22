import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import {Home} from "./pages/Home";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <header>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/register'}>Register</Link>
            </li>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
        </ul>
        </header>
        <Switch>
          <Route exact path='/'  component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/Login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

