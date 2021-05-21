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
        db.collection('projects').doc(postId).set(theCommentObject)
        .catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
}

export default comment