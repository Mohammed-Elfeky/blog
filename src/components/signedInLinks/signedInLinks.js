import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import style from './signedInLinks.module.css'
class SignedInLinks extends Component {
    render() {
        return (
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/create">
                  create post
                </Link>
            </li>

            <li className="nav-item">
                <a onClick={this.props.handleClick} className="nav-link" href="">
                  signOut
                </a>
            </li>

            <li className="nav-item">
                  <span>
                    <div className={style.avatar}>{this.props.user.initials}</div>
                  </span>
                </li>
            </>
        );
    }
}

export default SignedInLinks;
