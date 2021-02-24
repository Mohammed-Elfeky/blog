import React, { Component } from 'react';
import style from '../styles/displayProjects.module.css'
import {connect} from 'react-redux' 
import { BiLike,BiDislike } from "react-icons/bi";
import {like,dislike,comment} from './functions'
import Comment from './comment'
import Avatar from './avatar';
class ShowPosts extends Component {
    commentHolder=''
    
    handleChange=(e)=>{
        this.commentHolder=e.target.value
    }

    handleLike=(postId)=>{
        let {user} =this.props
        like(postId,user)
    }

    handleDislike=(postId)=>{
        let {user} =this.props
        dislike(postId,user)
    }

    handleSubmit=(e,postId)=>{
        e.preventDefault()
        let {user} =this.props
        comment(postId,user,this.commentHolder)
        this.commentHolder=''
        e.target.reset();
    }
    render() {
        return (
            <>
                 {
                    this.props.projects.map(ele=>{
                        return <div key={ele.id} className={`${style.post}`}>
                                    <Avatar ele={ele} style={style}/>
                                    <p>
                                      {ele.data.content}
                                    </p>
                                    
                                    <div>
                                        <BiLike onClick={()=>{this.handleLike(ele.id)}} style={{fontSize:"20px",cursor:'pointer'}}/>
                                        <span className="mr-2">{ele.data.likes.length}</span>
                                        <BiDislike onClick={()=>{this.handleDislike(ele.id)}}  style={{fontSize:"20px",cursor:'pointer'}}/>
                                        <span>{ele.data.dislikes.length}</span>
                                    </div>

                                    <div className={style.commentsContainer}>
                                        {
                                            ele.data.comments && ele.data.comments.map(comment=>{
                                                return <Comment style={style} comment={comment} />
                                            })
                                        }
                                        
                                    </div>

                                    <div class={style.commentForm}>
                                        <form onSubmit={(e)=>{this.handleSubmit(e,ele.id)}}>
                                            <input onChange={this.handleChange} type="text" placeholder="Comment Here"/>
                                        </form>
                                    </div>
                                    
                                </div>
                               
                               
                    })
                }
            </>
        );
    }
}

const mapStateToProps=(state,ownProps)=>{
    
    let projects = ownProps.myId ? 
    state.main.projects.filter(post=>{return post.data.uid === ownProps.myId}):
    state.main.projects
    return{
        projects,
        user:state.authReducer.user
    }
}

export default connect(mapStateToProps)(ShowPosts);
