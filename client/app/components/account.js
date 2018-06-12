import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import { setInStorage, getFromStorage, removeInStorage } from '../utils/storage'

import {MyContext} from '../provider/provider'

import AccountNav from './AccountNav'
import Header from './Header'
import Main from './main'

class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: '',
      logggedOut: false
    }
  }
  componentDidMount(){
    const token = getFromStorage('chatAuth:token');
    if(token){
      // verify token
      fetch('http://localhost:3017/api/account/verify?token='+token,{
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Request-Origin': '*',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-origin,content-type",
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token: token,
            logggedOut: false
          });

          let B = document.getElementById('body');
          B.className = 'app sidebar-fixed aside-menu-off-canvas aside-menu-hidden header-fixed pace-done';
        }else {
          //this means you're being hacked
          const token = getFromStorage('chatAuth:token');
          if(token){
            // verify token
            fetch('http://localhost:3017/api/account/logout?token='+token,{
              method: 'GET',
              mode: 'cors',
              headers: {
                'Access-Control-Request-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-origin,content-type",
                'Content-Type': 'application/json'
              },
            })
              .then(res => res.json())
              .then(json => {
                removeInStorage('chatAuth:token');
              });
          }
          return(
            <Redirect to={{
                pathname: '/'
              }}/>
          )
        }
      });
    }
  }
  logout(){
    const token = getFromStorage('chatAuth:token');
    if(token){
      // verify token
      fetch('http://localhost:3017/api/account/logout?token='+token,{
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Request-Origin': '*',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-origin,content-type",
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(json => {
          if(json.success){
            this.setState({
              logggedOut: true
            })
            removeInStorage('chatAuth:token');
          }
        });
    }
  }
  render(){
    return(
      <MyContext.Consumer>
        {(context) => {
          const {logggedOut} = this.state
          const {auth, token} = context.state
          if(logggedOut){
            context.removeToken();
            <Redirect to={{
                pathname: '/Account'
              }}/>
          }else if(auth){
            return (
              <Router>
                <Fragment>
                  <AccountNav
                    logout = {this.logout.bind(this)}/>
                  <Main />
                </Fragment>
              </Router>
            )
          }else if(error === 'Unauthorized access!'){
            removeInStorage('chatAuth:token');
            context.changeLoading();
            context.removeToken();
            alert(error)
          }
        }}
      </MyContext.Consumer>
    )
  }
}

export default Account;
