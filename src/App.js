import React, { Component } from 'react'
import {getPosts} from './redux/actions/databaseActions'
import {changeUserState} from './redux/actions/authActions'
import {connect} from 'react-redux' 
import {db,auth} from './firebase/firebase'
import {Switch,Route} from 'react-router-dom'
import Dashboard from './components/dashboard/dashboard'
import Create from './components/create/create'
import SignIn from './components/signIn/signIn'
import SignUp from './components/signUp/signUp'
import Nav from './components/nav/nav'
import User from './components/user/user'


class App extends Component {
  // constructor(){
  //   super();
  //   console.log(this.props.user)
  // }
  
  componentDidUpdate(){
    console.log(this.props.user)
  }

  componentDidMount(){
    console.log(this.props.user)
    db.collection("projects")
    .onSnapshot(docs=> {

      let postsToSend=[]
      docs.forEach(ele=>{
        postsToSend.push({id:ele.id ,data:ele.data()}) 
      })

      this.props.getPosts(postsToSend)

    });

    auth.onAuthStateChanged((user)=> {


      if (user) {

        db.collection('users').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
              this.props.changeUserState({
                ...doc.data(),
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
          <Route path="/user/:id" component={User}/>
        </Switch>
      </div>
    )
  }


}

const mapStateToProps=(state)=>{
  return{
      user:state.authReducer.user
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getPosts: (projects)=> dispatch(getPosts(projects)),
    changeUserState: (user)=> dispatch(changeUserState(user))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
