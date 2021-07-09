import React from 'react'
import firebase from "../../../configs/fbconfig";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import {useSelector} from 'react-redux'
const LikesComponent = ({LikeData,referencekeys, likerefData}) => {
    
    console.log(likerefData,"hgfjhgkfgekjfhsjk");
    const auth = useSelector((state) => state.firebase.auth);
      const handleLikes =() => {
           if(LikeData.includes(auth.uid)){
                const key=Object.keys(likerefData).find(key => likerefData[key] === auth.uid)
                firebase.database().ref(`posts/post/${referencekeys}/likes/${key}`).remove()
           }else{
            const addLike = firebase.database().ref(`posts/post/${referencekeys}/likes`).push();
            addLike.set(auth.uid);
           }       
      }

    return (
        <IconButton aria-label="add to favorites" onClick={handleLikes}>
          <FavoriteIcon />
        </IconButton>
    )
}

export default LikesComponent
