import {db} from '../firebase/firebase'
const like=(postId,user)=>{
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

export default like;