import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Comment extends Component {
    render() {
        return (
            <>
                <Link to={`/user/${this.props.comment.uid}`}>
                    <div className={this.props.style.comments}>
                                                            
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