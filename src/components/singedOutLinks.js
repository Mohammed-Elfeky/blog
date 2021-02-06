import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class SingedOutLinks extends Component {
    render() {
        return (
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  signin
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signUp">
                  signup
                </Link>
              </li>
            </>
        );
    }
}

export default SingedOutLinks;
