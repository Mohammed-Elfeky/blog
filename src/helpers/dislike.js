import {db} from '../firebase/firebase'
const dislike=(postId,user)=>{
    db.collection('projects').doc(postId).get().then(doc=>{
        let theDoc=doc.data()
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
        db.collection('projects').doc(postId).set(theNewObject)
        .catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
}

export default dislike