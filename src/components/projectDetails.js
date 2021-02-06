import React, { Component } from 'react';
import style from '../styles/projectDetails.module.css'
import {db} from '../firebase'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
class ProjectDetails extends Component {
    state={
        title:'',
        content:''
    }

    componentDidMount(){

        db.collection("projects").doc(this.props.match.params.id).get().then((doc)=> {
            if (doc.exists) {
                this.setState({
                    title:doc.data().title,
                    content:doc.data().content
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }

    render() {
        if(!this.props.user){return <Redirect to="/signin" />}
        return (
            <div>
                <div className="container">
                    <div className={style.item}>
                      <h3>{this.state.title}</h3>
                      <p>{this.state.content}</p>
                      <p>{this.props.match.params.id}</p>
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
  
export default connect(mapStateToProps)(ProjectDetails);
