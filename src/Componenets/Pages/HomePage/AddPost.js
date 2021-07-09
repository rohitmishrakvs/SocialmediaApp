import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import firebase from "../../../configs/fbconfig";
import { v4 as uuid } from "uuid";
import {useSelector} from 'react-redux'
import Moment from "moment";
const useStyles = makeStyles({
  formdiv: {
    margin: 10,
  },
  form: {
    borderRadius: 15,
    border: "1px solid #ccc",
    boxShadow: "1px 1px 1px #999",
  },
  fileborder: {
    margin: 10,
    border: "1px solid #ccc",
    display: "flex",
    padding: 10,
    alignItems: "center",
    height: 50,
    boxShadow: "1px 1px 1px #999",
  },
  textarea: {
    padding: 10,
    widht: 700,
    maxWidth: "100%",
    lineHeight: 1.5,
    borderRadius: 5,
    border: "1px solid #ccc",
    boxShadow: "1px 1px 1px #999",
  },
});

const AddPost = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setfile] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const { onSetActive } = props;
  
  //   const [post, setPost] = useState([]);
  const [photoId, setPhotoId] = useState("");
  const [newpost, setNewpost] = useState({
    title: "",
    description: "",
    photoURL: "",
    postId: "",
    authorPhotoUrl:"",
    createdAt: "",
    authorId:"",
    likes:0
  });

  const upload = async (e) => {
    e.persist();
    e.preventDefault();
    const autoId = uuid();
    setPhotoId(autoId);
    const imageRef = firebase.storage().ref("images").child(autoId);
    await imageRef.put(files[0]);
    imageRef.getDownloadURL().then((url) => {
      setPhotoURL(url);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = newpost;
    post.description = description;
    post.photoURL = photoURL;
    post.title = title;
    post.postId = photoId;
    post.authorPhotoUrl=auth.photoURL;
    post.authorId=auth.uid;
    post.likes=0
    post.createdAt = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    const NewSharedPost = firebase.database().ref("posts/post").push();
    // console.log('referncekey',NewSharedPost.key);
    NewSharedPost.set(post);
    setNewpost({
      title: "",
      description: "",
      photoURL: "",
      postId: "",
      authorPhotoUrl:"",
      createdAt: "",
      authoerId: "",
      likes:0
    });
    onSetActive(false);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.formdiv}>
        <label htmlFor="title">Title/Heading</label>
        <input
          type="text"
          placeholder="Heading...."
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={(classes.formdiv, classes.fileborder)}>
        <input
          type="file"
          placeholder=""
          onChange={(e) => setfile(e.target.files)}
        />
        <button style={{ marginLeft: 0 }} onClick={upload}>
          Upload File
        </button>
      </div>
      <div className={(classes.formdiv, classes.fileborder)}>
        <textarea
          className={classes.textarea}
          placeholder="enter Description"
          type="text"
          rows="5"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>
      <div className={classes.formdiv}>
        <Button variant="contained" type="submit" color="primary">
          Post
        </Button>
      </div>
    </form>
  );
};

export default AddPost;
