import {db} from '../firebase/firebase'
const comment=(postId,user,commentHolder)=>{
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

export default comment