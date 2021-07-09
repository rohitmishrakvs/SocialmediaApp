import React,{useState} from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import InputEmoji from 'react-input-emoji'
import SendIcon from "@material-ui/icons/Send";
import {v4 as uuid } from "uuid"
import Moment from "moment";
import firebase from "../../../configs/fbconfig";
import {useSelector} from 'react-redux'
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Comment = ({id,refkey}) => {

  const auth = useSelector((state) => state.firebase.auth);
  console.log(refkey,"comment");
  const [comments,setComments] = useState({
    text:'',
    author:'',
    commentId:'',
    createdAt:'',
    authorId:'',
    authorphotoURL:''
  })
  const [text,setText] = useState('')
  const classes = useStyles();
  
 const addComment = (e) =>{
     e.preventDefault();
     
     const newcomment = comments
     newcomment.text=text;
     newcomment.author=auth.displayName;
     newcomment.authorId=auth.uid;
     newcomment.authorphotoURL=auth.photoURL;
     newcomment.commentId=uuid();
     newcomment.createdAt= Moment(new Date()).format("DD/MM/YYYY");
     const AddnewComment = firebase.database().ref(`posts/post/${refkey}/comment`).push(); ////changepart
     AddnewComment.set(newcomment);
     setComments({
         text:'',
         author:'',
         commnetId:'',
         createdAt:'',
         authorId:'',
         authorphotoURL:''
     })
     setText('')
 }
  
  
  return (
    <form className={classes.root} noValidate onSubmit={addComment} autoComplete="off">
      <div style={{display:'flex',width:'100%'}}>
        <InputEmoji
          placeholder="comment..."
          variant="outlined"
          value={text}
          onChange={setText}
        />
        <IconButton 
          type="submit"
        >
          <SendIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default Comment;
