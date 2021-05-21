import React, { Component } from 'react';
import {connect} from 'react-redux'
import style from './user.module.css'
import { Redirect } from 'react-router-dom';
import {db} from '../../firebase/firebase'
import ShowPosts from '../showPosts/showPosts'
class User extends Component {
    state={
        user:{}
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        this.fetchUserInformation()
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            window.scrollTo(0, 0)
            this.fetchUserInformation()
        }   
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
        
        
        if(!this.props.user){return <Redirect to="/"/>}
        return (
        <> 
         <div className="container">
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
                        <ShowPosts myId={this.props.match.params.id}/>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.authReducer.user
    }
}

export default connect(mapStateToProps)(User);
