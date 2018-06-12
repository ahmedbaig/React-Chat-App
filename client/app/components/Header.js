import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {MyContext} from '../provider/provider'
import { setInStorage, getFromStorage, removeInStorage } from '../utils/storage'

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      authorization: false,
      dashboardOpen: true,
      turkisdOpen: false,
      chocolatesOpen: false,
      dndtOpen: false,
      cafeOpen: false,
      dessertsOpen: false,
      ceramicsOpen: false,
      silverwareOpen: false,
      userOpen: false,
      adminOpen: false
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
            authorization: true
          });
        }
      });
    }else{
      this.setState({
        authorization: false
      })
    }
  }
  navToggle(id){
    let toggler = document.getElementById(id);
    switch (id) {
      case 'dashboard':
        const {dashboardOpen} = this.state
        this.setState({
          dashboardOpen: !dashboardOpen
        }, function(){
          if(!this.state.dashboardOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'turkisd':
        const {turkisdOpen} = this.state
        this.setState({
          turkisdOpen: !turkisdOpen
        }, function(){
          if(!this.state.turkisdOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'chocolates':
        const {chocolatesOpen} = this.state
        this.setState({
          chocolatesOpen: !chocolatesOpen
        }, function(){
          if(!this.state.chocolatesOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'dndt':
        const {dndtOpen} = this.state
        this.setState({
          dndtOpen: !dndtOpen
        }, function(){
          if(!this.state.dndtOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'cafe':
        const {cafeOpen} = this.state
        this.setState({
          cafeOpen: !cafeOpen
        }, function(){
          if(!this.state.cafeOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'desserts':
        const {dessertsOpen} = this.state
        this.setState({
          dessertsOpen: !dessertsOpen
        }, function(){
          if(!this.state.dessertsOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'ceramics':
        const {ceramicsOpen} = this.state
        this.setState({
          ceramicsOpen: !ceramicsOpen
        }, function(){
          if(!this.state.ceramicsOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'silverware':
        const {silverwareOpen} = this.state
        this.setState({
          silverwareOpen: !silverwareOpen
        }, function(){
          if(!this.state.silverwareOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'user':
        const {userOpen} = this.state
        this.setState({
          userOpen: !userOpen
        }, function(){
          if(!this.state.userOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      case 'admin':
        const {adminOpen} = this.state
        this.setState({
          adminOpen: !adminOpen
        }, function(){
          if(!this.state.adminOpen){
            toggler.className = 'nav-item nav-dropdown'
          }else{
            toggler.className = 'nav-item nav-dropdown open'
          }
        })
        break;
      default:
    }
  }
  render(){
    return (
      <MyContext.Consumer>
        {(context) => {
          const {auth} = context.state;
          if(auth) {
            return (
              <Fragment>
               <Link to='/'>
               Home</Link>
               <hr />
               <div className="sidebar" id="sidebar">
                  <nav className="sidebar-nav" id="sidebar-nav-scroller">
                     <ul className="nav">
                        <li id='dashboard' className="nav-item nav-dropdown open">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'dashboard')} href="javascript:void(0)">
                           <i className="mdi mdi-gauge"></i> Dashboard
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> Sales </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/notifications'>
                                 <a className="nav-link" href="javascript:void(0)"> Notifications </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/orders'>
                                 <a className="nav-link" href="javascript:void(0)"> Orders </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li className="nav-title">Products Entry</li>
                        <li id='turkisd' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'turkisd')} href="javascript:void(0)">
                           <i className="mdi mdi-checkbox-blank-circle-outline"></i> Turkish Delights
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> View List </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/notifications'>
                                 <a className="nav-link" href="javascript:void(0)"> Edit </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li id='chocolates' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'chocolates')} href="javascript:void(0)">
                           <i className="mdi mdi-checkbox-blank-circle-outline"></i> Chocolates
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> View List </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/notifications'>
                                 <a className="nav-link" href="javascript:void(0)"> Edit </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li id='dndt' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'dndt')} href="javascript:void(0)">
                           <i className="mdi mdi-checkbox-blank-circle-outline"></i> Dates and Dry Fruits
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> View List </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/notifications'>
                                 <a className="nav-link" href="javascript:void(0)"> Edit </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li id='cafe' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'cafe')} href="javascript:void(0)">
                           <i className="mdi mdi-checkbox-blank-circle-outline"></i> Cafe
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> View List </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/notifications'>
                                 <a className="nav-link" href="javascript:void(0)"> Edit </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li id='desserts' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'desserts')} href="javascript:void(0)">
                           <i className="mdi mdi-checkbox-blank-circle-outline"></i> desserts
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> View List </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/notifications'>
                                 <a className="nav-link" href="javascript:void(0)"> Edit </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li id='ceramics' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'ceramics')} href="javascript:void(0)">
                           <i className="mdi mdi-checkbox-blank-circle-outline"></i> Ceramics
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> View List </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/notifications'>
                                 <a className="nav-link" href="javascript:void(0)"> Edit </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li id='silverware' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'silverware')} href="javascript:void(0)">
                           <i className="mdi mdi-checkbox-blank-circle-outline"></i> Silverware
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> View List </a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to='/notifications'>
                                 <a className="nav-link" href="javascript:void(0)"> Edit </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li className="nav-title">Users and Admins</li>
                        <li id='user' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'user')} href="javascript:void(0)">
                           <i className="mdi mdi-settings"></i> User Settings
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)"> General and Login </a>
                                 </Link>
                              </li>
                           </ul>
                        </li>
                        <li id='admin' className="nav-item nav-dropdown">
                           <a className="nav-link nav-dropdown-toggle" onClick={this.navToggle.bind(this, 'admin')} href="javascript:void(0)">
                           <i className="mdi mdi-account"></i> Admin Settings
                           </a>
                           <ul className="nav-dropdown-items">
                              <li className="nav-item">
                                 <Link to='/'>
                                 <a className="nav-link" href="javascript:void(0)">Admins List</a>
                                 </Link>
                              </li>
                              <li className="nav-item">
                                <Link to='/'>
                                <a className="nav-link" href="javascript:void(0)">Edit Admins</a>
                                </Link>
                              </li>
                           </ul>
                        </li>
                     </ul>
                  </nav>
               </div>
            </Fragment>
            )
          }
          return(
            <div>
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

export default Header;
