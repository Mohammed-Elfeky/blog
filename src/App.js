import React, { Component } from 'react'
import {getProjects} from './action'
import {connect} from 'react-redux' 
import {db,auth} from './firebase'
import {Switch,Route} from 'react-router-dom'
import Dashboard from './components/dashboard'
import Create from './components/create'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Nav from './components/nav'
import User from './components/user'
import ProjectDetails from './components/projectDetails'
import {changeUserState} from './authActions'
class App extends Component {


  componentDidMount(){

    db.collection("projects")
    .onSnapshot(docs=> {

      let projectsToSend=[]
      docs.forEach(ele=>{
        projectsToSend.push({id:ele.id ,data:ele.data()}) 
      })

      this.props.getProjects(projectsToSend)

    });

    auth.onAuthStateChanged((user)=> {


      if (user) {

        db.collection('users').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
              this.props.changeUserState({
                ...doc.data(),
                email:user.email,
                uid:user.uid
              })
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });


        


      } else {
        this.props.changeUserState(null)
      }
    });

    

  }

 

  

  

  


  render() {
    return (
      <div>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signUp" component={SignUp}/>
          <Route path="/create" component={Create} />
          <Route path="/details/:id" component={ProjectDetails}/>
          <Route path="/user/:id" component={User}/>
        </Switch>
      </div>
    )
  }


}


const mapDispatchToProps = dispatch => {
  return {
    getProjects: (projects)=> dispatch(getProjects(projects)),
    changeUserState: (user)=> dispatch(changeUserState(user))
  }
}
export default connect(null,mapDispatchToProps)(App)
