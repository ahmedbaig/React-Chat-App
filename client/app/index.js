import React, { Fragment } from 'react';
import { render } from 'react-dom';
import MyProvider, { MyContext } from './provider/provider'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import Login from './components/login'
import Account from './components/account'
import NotFound from './components/NotFound'

import { setInStorage, getFromStorage, removeInStorage } from './utils/storage'

const PrivateRoute = ( {component: Component, ...rest} ) => (
  <Route {...rest} render={ (props) =>  (
        <MyContext.Consumer>
          {(context) => (
            context.state.auth === true
            ? <Component {...props}/>
            : <Redirect to={{
                pathname: '/'
              }}/>
          )}
        </MyContext.Consumer>
      )
    }
  />
)
render((
  <Router>
    <MyProvider>
      <Route exact path='/' component={Login}/>
      <PrivateRoute path='/Account' component={Account}/>
    </MyProvider>
  </Router>
), document.getElementById('app'));

//Rerouting for development
// render((
//   <Router>
//     <MyProvider>
//       <Route exact path='/' component={Main}/>
//     </MyProvider>
//   </Router>
// ), document.getElementById('app'));
