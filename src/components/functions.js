import {db} from '../firebase'

export const like=(postId,user)=>{
    db.collection('projects').doc(postId).get().then(doc=>{
        let theDoc=doc.data()
        let theDocLikes=theDoc.likes
        let theDocDislikes=theDoc.dislikes
        if(theDocLikes.indexOf(user.uid) !== -1){
            theDocLikes.splice(theDocLikes.indexOf(user.uid),1)
        }else{
            theDocLikes=theDocLikes.filter(ele=>{
                return ele !== user.uid 
            })
            theDocDislikes=theDocDislikes.filter(ele=>{
                return ele !== user.uid
            })
            theDocLikes.push(user.uid)
        }
        
        let theNewObject={
            ...theDoc,
            likes:theDocLikes,
            dislikes:theDocDislikes
        }
        console.log(theNewObject)
        db.collection('projects').doc(postId).set(theNewObject).then(()=>{
            console.log('like done')
        })
        .catch(err=>{
            console.log("like error",err)
        })
    }).catch(err=>{
        console.log("getting projects error",err)
    })
}

export const dislike=(postId,user)=>{
    db.collection('projects').doc(postId).get().then(doc=>{
        let theDoc=doc.data()
        console.log(theDoc)
        let theDocLikes=theDoc.likes
        let theDocDislikes=theDoc.dislikes
        if(theDocDislikes.indexOf(user.uid) !== -1){
            theDocDislikes.splice(theDocDislikes.indexOf(user.uid),1)
        }else{
            theDocLikes=theDocLikes.filter(ele=>{
                return ele !== user.uid 
            })
            theDocDislikes=theDocDislikes.filter(ele=>{
                return ele !== user.uid
            })
            theDocDislikes.push(user.uid)
        }
        let theNewObject={
            ...theDoc,
            likes:theDocLikes,
            dislikes:theDocDislikes
        }
        console.log(theNewObject)
        db.collection('projects').doc(postId).set(theNewObject).then(()=>{
            console.log('like done')
        })
        .catch(err=>{
            console.log("like error",err)
        })
    }).catch(err=>{
        console.log("getting projects error",err)
    })
}

export const comment=(postId,user,commentHolder)=>{
    db.collection('projects').doc(postId).get().then(doc=>{
        let theDoc=doc.data()
        let theComments=theDoc.comments
         let  theObject={
            content:commentHolder,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            initials:user.initials,
            uid:user.uid
        }
        theComments.push(theObject)
        let theCommentObject={
            ...theDoc,
            comments:theComments
        }
        db.collection('projects').doc(postId).set(theCommentObject).then(()=>{
            console.log("comment added")
        }).catch(err=>{
            console.log('comment adding failed',err)
        })
    }).catch(err=>{
        console.log('getting post error',err)
    })
}