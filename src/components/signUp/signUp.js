import React, { Component } from 'react';
import style from './signup.module.css'
import {connect} from 'react-redux'
import {signUp,setNameError} from '../../redux/actions/authActions'
import { Redirect } from 'react-router-dom';
import firstAndLastValidation from '../../helpers/nameValidation'
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
        //first and last name validation
        let validation=firstAndLastValidation
        (
            {
             firstName:this.user.firstName,
             lastName:this.user.lastName
            }
        )

        if(validation.error){
            this.props.setNameError(validation.error.details[0].message)
            return;
        }

        //send signup request to the server
        this.props.signUp(this.user)
    }
    
    render() {
        if(this.props.user){return <Redirect to="/"/>}
        return (
            <div>
               <div className="container">
                  <div className={`${style.item} p-5 mt-5`}>
                    <h3 className="text-capitalize mb-5" >sign up</h3>

                    <div className="input-group mb-3">
                    <input onChange={this.handleChange} autoComplete="off" name="firstName" type="text" className="form-control" placeholder="first name" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                    <input onChange={this.handleChange} autoComplete="off" name="lastName" type="text" className="form-control" placeholder="last name" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                    <input onChange={this.handleChange} autoComplete="off" name="email" type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                    <input onChange={this.handleChange} name="password" type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
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
        signUp: (userSignUp)=> dispatch(signUp(userSignUp)),
        setNameError:(errorMessage)=> dispatch(setNameError(errorMessage))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
