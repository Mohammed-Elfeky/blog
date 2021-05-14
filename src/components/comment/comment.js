import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import style from './comment.module.css'
class Comment extends Component {
    render() {
        return (
            <>
                <Link to={`/user/${this.props.comment.uid}`}>
                    <div className={style.comment}>
                                                            
                    <div>
                        {this.props.comment.initials}
                    </div>
                    <div>{this.props.comment.firstName} {this.props.comment.lastName}</div>
                    <div>{this.props.comment.content}</div>
                                                            
                    </div>
                </Link>
            </>
        );
    }
}

export default Comment