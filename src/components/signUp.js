import React, { Component } from 'react';
import style from '../styles/signup.module.css'
import {connect} from 'react-redux'
import {signUp} from '../authActions'
import { Redirect } from 'react-router-dom';
class SignUp extends Component {
    
    user={
        firstName:'',
        lastName:'',
        email:'',
        password:''
    }

    handleChange=(e)=>{
        this.user[e.target.name]=e.target.value
    }

    handleSignUp=()=>{
        this.props.signUp(this.user)
    }
    
    render() {
        if(this.props.user){return <Redirect to="/"/>}
        return (
            <div>
               <div className="container">
                  <div className={`${style.item} p-5 mt-5`}>
                    <h3 className="text-capitalize mb-5" >sign up</h3>

                    <div class="input-group mb-3">
                    <input onChange={this.handleChange} name="firstName" type="text" class="form-control text-capitalize" placeholder="first name" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    <div class="input-group mb-3">
                    <input onChange={this.handleChange} name="lastName" type="text" class="form-control text-capitalize" placeholder="last name" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    <div class="input-group mb-3">
                    <input onChange={this.handleChange} name="email" type="text" class="form-control text-capitalize" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    <div class="input-group mb-3">
                    <input onChange={this.handleChange} name="password" type="text" class="form-control text-capitalize" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    {
                        this.props.error ? <p className=" text-center text-danger my-3">{this.props.error}</p> : null
                    }

                    <button className="btn btn-dark text-capitalize" onClick={this.handleSignUp}>sign up</button>
                  </div>
               </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        error:state.authReducer.signUpErorr,
        user:state.authReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (userSignUp)=> dispatch(signUp(userSignUp))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
