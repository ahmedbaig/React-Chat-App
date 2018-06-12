import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Fragment>
    <section className="container-server-errors">
        <div className="brand-logo float-left">
          <img className="" src="assets/img/logo/logocolor.png"/>
        </div>
        <div className="server-errors pages-card">
            <div className="status-text-1">Oops!</div>
            <div className="status-error text-theme hertbit">4 0 4</div>
            <div className="text-center status-text-2 text-dark">PAGE NOT FOUND ..!</div>
            <div className="small text-center text-dark"> YOU SEEM TO BE TRYING TO FIND YOUR WAY HOME </div>
            <div className="text-center">
                  <Link to="/" className="btn  btn-theme login-btn text-white">Go home</Link>
            </div>
        </div>
    </section>
    <div className="half-circle"></div>
    <div className="small-circle"></div>
    <div className="half-circle-bottom"></div>
    <div className="small-circle-bottom"></div>
  </Fragment>

);

export default NotFound;
