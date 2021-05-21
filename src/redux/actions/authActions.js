import {
  db,
  auth
} from '../../firebase/firebase'

export const changeUserState = (user) => {

  return (dispatch) => {

    dispatch({
      type: 'CHANGE_USER_STATE',
      payload: user
    })

  }

}

export const signUp = (userSignUp) => {

  return (dispatch) => {
    auth.createUserWithEmailAndPassword(userSignUp.email, userSignUp.password)
      .then(res => {
        db.collection('users').doc(res.user.uid).set({
          firstName: userSignUp.firstName,
          lastName: userSignUp.lastName,
          initials: userSignUp.firstName[0] + userSignUp.lastName[0],
          email:userSignUp.email
        }).then(() => {
          dispatch({
            type: 'SIGNUP_SUCCESS'
          })
        }).catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        dispatch({
          type: 'SIGNUP_ERROR',
          err:err.message
        })
      })

  }

}


export const signIn = (userSignIn) => {

  return (dispatch) => {
    auth.signInWithEmailAndPassword(userSignIn.email, userSignIn.password)
      .then(() => {
        dispatch({
          type: 'SIGNIN_SUCCESS'
        })
      })
      .catch((err) => {
        dispatch({
          type: 'SIGNIN_ERORR',
          err
        })
      });
  }

}

export const setNameError = (errorMessage) => {

  return (dispatch) => {
    dispatch({
      type:'SIGNUP_ERROR',
      err:errorMessage
    })
  }

}

export const dealingWithIsLoadingState = (data) => {

  return (dispatch) => {
    dispatch({
      type:'CHANGE_ISLOADING_STATE',
      data
    })
  }

}