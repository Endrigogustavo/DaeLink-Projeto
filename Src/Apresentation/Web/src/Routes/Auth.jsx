import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import store from '../store';

import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';


export default function Routes() {
   return (
      <Switch>
         <Route path="/" exact component={Login}/>
         <Route path='/dashboard' component={Dashboard} isPrivate />
      </Switch>
   );
}

export default function RouteWrapper({
   component: Component,
   isPrivate = false,
   ...rest
}) {
   const { logged } = store.getState().auth;

   if (!logged && isPrivate) {
      return <Redirect to="/"/>;
   }

   if (logged && !isPrivate) {
      return <Redirect to="/dashboard" />;
   }

   return <Route {...rest} component={Component} />;
};