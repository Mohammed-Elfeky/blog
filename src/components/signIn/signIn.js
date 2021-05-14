import React, { Component } from 'react';
import style from './signin.module.css'
import {signIn} from '../../redux/actions/authActions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
class SignIn extends Component {
    user={
        email:'',
        password:''
    }
    handleChange=(e)=>{
        this.user[e.target.name]=e.target.value
    } 
    handleSignIn=()=>{
        this.props.signIn(this.user)
    }
    render() {
        if(this.props.user){return <Redirect to="/"/>}
        return (
            <div>
               <div className="container">
                  <div className={`${style.item} p-5 mt-5`}>
                    <h3 className="text-capitalize mb-5" >sign in</h3>

                    <div class="input-group mb-3">
                    <input autocomplete="off" name="email" onChange={this.handleChange}  type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    <div class="input-group mb-3">
                    <input name="password" onChange={this.handleChange}  type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    {
                        this.props.error ? <p className=" text-center text-danger my-3">{this.props.error}</p> : null
                    }

                    <button onClick={this.handleSignIn} className="btn btn-dark text-capitalize">login</button>
                  </div>
               </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        error:state.authReducer.signInErorr,
        user:state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (userSignIn)=> dispatch(signIn(userSignIn))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
