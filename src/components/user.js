import React, { Component } from 'react';
import {connect} from 'react-redux'
import style from '../styles/displayProjects.module.css'
import { BiLike,BiDislike } from "react-icons/bi";
import {like,dislike,comment} from './functions'
import { Redirect } from 'react-router-dom';
import {db} from '../firebase'
import Comment from './comment'
import Avatar from './avatar';
class User extends Component {
    state={
        user:{}
    }
    
    
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

    fetchUserInformation=()=>{
        db.collection('users').doc(this.props.match.params.id).get()
        .then(doc=>{
            let theDoc=doc.data()
            this.setState({
                user:theDoc
            })
        }).catch(err=>{
            console.log(err)
        })
    }   
    
    render() {
        this.fetchUserInformation()
        
        if(!this.props.user){return <Redirect to="/"/>}
        return (
        <>  <div className="container">
               <div className="row justify-content-center">
                   <div className={`col-12 col-md-8 ${style.profile}`}>
                       <div>{this.state.user.initials}</div>
                       <div className=" text-capitalize mt-2">{this.state.user.firstName} {this.state.user.lastName}</div>
                       <div>{this.state.user.email}</div>
                   </div>
               </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className={`col-12 col-md-8 ${style.item}`}>
                        {
                            this.props.projects
                            .filter(post=>{return post.data.uid === this.props.match.params.id})
                            .map(ele=>{
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
                                            return <Comment style={style} comment={comment}/>
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
                    </div>
                </div>
            </div>
        </>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        projects:state.main.projects,
        user:state.authReducer.user
    }
}

export default connect(mapStateToProps)(User);
