import React, { Component } from "react";
import {Link} from 'react-router-dom'
import style from '../styles/nav.module.css'
import {auth} from '../firebase'
import {connect} from 'react-redux'
import SignedInLinks from './signedInLinks'
import SingedOutLinks from './singedOutLinks'
class Nav extends Component {
  handleClick=(e)=>{
    e.preventDefault();
    auth.signOut()
  }
  render() {
    return (
      <div className="mb-3">
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${style.item}`}>
          <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ">
              {
                this.props.user ?
                <SignedInLinks user={this.props.user} handleClick={this.handleClick} />:
                <SingedOutLinks />
              }
            </ul>
          </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
      user:state.authReducer.user
  }
}

export default connect(mapStateToProps)(Nav);
