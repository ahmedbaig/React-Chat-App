import React, { Component, Fragment } from 'react';
import {MyContext} from '../provider/provider'
import { Link } from 'react-router-dom';


class AccountNav extends Component {
  constructor(props){
    super(props);
  }
  handleLogout(){
    this.props.logout()
  }
  render(){
    return (
        <button onClick={this.handleLogout.bind(this)}>Logout</button>
    );
  }
}

export default AccountNav;
