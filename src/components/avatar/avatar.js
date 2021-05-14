import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import style from './avatar.module.css'
class Avatar extends Component {
    render() {
        return (
            <>
              <Link to={`/user/${this.props.ele.data.uid}`}>
                    <div className={style.avatar}> 
                    <div>{this.props.ele.data.initials}</div>
                    <div>{this.props.ele.data.firstName}  {this.props.ele.data.lastName}</div>
                    </div>
               </Link>  
            </>
        );
    }
}

export default Avatar;
