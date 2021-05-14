export const getPosts=(posts)=>{

    return (dispatch)=>{

        dispatch({
            type:'GET_POSTS',
            payload:posts
        })

    }

}



