import React, { Component } from 'react';
import style from './showPosts.module.css'
import {connect} from 'react-redux' 
import { BiLike,BiDislike } from "react-icons/bi";
import like from '../../helpers/like'
import dislike from '../../helpers/dislike'
import comment from '../../helpers/comment'
import Comment from '../comment/comment'
import Avatar from '../avatar/avatar';
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
                    this.props.posts.map(ele=>{
                        return <div key={ele.id} className={`${style.post}`}>
                                    <Avatar ele={ele}/>
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
                                            ele.data.comments && ele.data.comments.map((comment,index)=>{
                                                return <Comment key={index} comment={comment} />
                                            })
                                        }
                                        
                                    </div>

                                    <div className={style.commentForm}>
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
    
    let posts = ownProps.myId ? 
    state.databaseReducer.posts.filter(post=>{return post.data.uid === ownProps.myId}):
    state.databaseReducer.posts
    return{
        posts,
        user:state.authReducer.user
    }
}

export default connect(mapStateToProps)(ShowPosts);
