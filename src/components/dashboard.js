import React, { Component } from 'react';
import DisplayProjects from './displayProjects'
import Notifications from './notifications'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
class Dashboard extends Component {
    render() {
        if(!this.props.user){return <Redirect to="/signin" />}
            return (
                <div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 mb-2">
                                <DisplayProjects/>
                            </div>
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
  
export default connect(mapStateToProps)(Dashboard);
