import React, { Component } from 'react';
import style from './create.module.css'
import {db} from '../../firebase/firebase'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
class Create extends Component {
    createObj={
        content:''
    }

    handleChange=(e)=>{
        this.createObj[e.target.name]=e.target.value
    }

    handleClick=()=>{
        // Add a new document with a generated id.
        db.collection("projects").add({
            content: this.createObj.content,
            firstName:this.props.user.firstName,
            lastName:this.props.user.lastName,
            email:this.props.user.email,
            initials:this.props.user.initials,
            uid:this.props.user.uid,
            likes:[],
            dislikes:[],
            comments:[]
        })
        .then((docRef)=> {
            console.log("Document written with ID: ", docRef.id);
            this.props.history.push('/')
        })
        .catch((error)=> {
            console.error("Error adding document: ", error);
        });
    }

    render() {
        if(!this.props.user){return <Redirect to="/signin" />}
        return (
            <div>
               <div className="container">
                  <div className={`${style.item} p-5 mt-5`}>
                    <h3 className="text-capitalize mb-5" >create project</h3>

                    <div class="input-group mb-3">
                        <textarea name="content" onChange={this.handleChange} class="form-control" aria-label="With textarea"></textarea>
                    </div>

                    <button onClick={this.handleClick} className="btn btn-dark text-capitalize">create</button>
                  </div>
               </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.authReducer.user
    }
}

export default connect(mapStateToProps)(Create);
