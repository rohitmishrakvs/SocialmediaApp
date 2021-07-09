import React, { useState, useEffect } from "react";
import firebase from "../../../configs/fbconfig";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import { makeStyles, Button } from "@material-ui/core";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import CardPost from "./CardPost";
import AddPost from "./AddPost";

const useStyles = makeStyles({
  filebox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 30,
    borderRadius:2,
    backgroundColor:'#3f51b5',
    border: "1px solid #ccc",
    // boxShadow: "1px 1px 1px #999",
  },
  btn: {
    display: "flex",
    color: "white"
  },
  postbox: {
    margin: 20,
  },
});

const HomePage = (props) => {
  const [active, setActive] = useState(false);
  const [posts, setPosts] = useState([]);
  const { auth } = props;
  const classes = useStyles();
  const [keys,setKeys]=useState()

  useEffect(() => {
    const postRef = firebase.database().ref("posts/post");
    
    
    postRef.on("value", (snapshot) => {
      const postData = snapshot.val();
      console.log("post data",postData);
      const posts = [];
      if(postData!==null){
        const keys = Object.keys(postData)
        setKeys(keys.reverse())
      }
      for (let data in postData) {
        posts.push(postData[data]);
      }
      setPosts(posts);
    });
  }, []);

  console.log(posts, "/retrieve posts");

  const postdiv = active ? <AddPost onSetActive={setActive} /> : null;

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div className={classes.filebox}>
          <Button className={classes.btn} onClick={() => setActive(true)}>
            <AddCircleOutlineRoundedIcon />
            Add Post
          </Button>
        </div>
        <div className={classes.postbox}>{postdiv}</div>
        <div>
          {posts
            .slice(0)
            .reverse()
            .map((post, index) => {
              return <CardPost post={post} referencekeys ={keys[index]} key={index} />;
            })}
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(HomePage);
