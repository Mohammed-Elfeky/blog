import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Avatar extends Component {
    render() {
        return (
            <>
              <Link to={`/user/${this.props.ele.data.uid}`}>
                    <div className={this.props.style.avatar}> 
                    <div>{this.props.ele.data.initials}</div>
                    <div>{this.props.ele.data.firstName}  {this.props.ele.data.lastName}</div>
                    </div>
               </Link>  
            </>
        );
    }
}

export default Avatar;
