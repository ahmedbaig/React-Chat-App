import React, { Component, Fragment } from 'react';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            password: ''
        }
    }

    handleClick(e){
        e.preventDefault();
        let text = this.refs.text.value;
        let password = this.refs.password.value;
        if(text != '' && password != ''){
            this.setState({
                text: text,
                password: password
            }, function(){
                this.props.data(this.state)
            });
            this.refs.text.value = '';
            this.refs.password.value = '';
        }
    }
    handleSignUpClick(){
      this.props.signupClick();
    }

    render(){
        return (
            <Fragment>
                <section className="container-pages">
                  <div className="brand-logo float-left">
                  </div>
                  <div className="pages-tag-line text-white">
                      <div className="h4">Let's Get Started .!</div>
                      <small> powered by <a id='white' href=''>Man Power</a></small>
                  </div>
                  <div className="card pages-card col-lg-4 col-md-6 col-sm-6">
                      <div className="card-body ">
                          <div className="h4 text-center text-theme"><strong>Login</strong></div>
                          <div className="small text-center text-dark">{this.props.signinerr}</div>
                              <form onSubmit={this.handleClick.bind(this)} >
                                  <div className="form-group">
                                      <div className="input-group">
                                           <span className="input-group-addon text-theme"><i className="fa fa-envelope"></i>
                                          </span>
                                          <input type="text" id="username" ref="text" className="form-control" placeholder="Phone Number"/>
                                      </div>
                                  </div>
                                  <div className="form-group">
                                      <div className="input-group">
                                          <span className="input-group-addon text-theme"><i className="fa fa-asterisk"></i></span>
                                          <input type="password" id="password" ref="password" className="form-control" placeholder="Password"/>
                                      </div>
                                  </div>
                                  <div className="form-group form-actions">
                                      <button type="submit" className="btn  btn-theme login-btn ">   Login   </button>
                                  </div>
                              </form>
                              <div className="text-center">
                                  <small>Don't you have an account ? Please
                                      <a href='javascript:void(0)' className="text-theme" onClick={this.handleSignUpClick.bind(this)}> Signup</a>
                                  </small>
                              </div>
                      </div>
                  </div>
              </section>
              <div className="half-circle"></div>
              <div className="small-circle"></div>
            </Fragment>
        );
    }
}

export default SignIn;
