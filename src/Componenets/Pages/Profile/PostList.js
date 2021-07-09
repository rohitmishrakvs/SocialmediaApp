import React, { useEffect, useState } from "react";
import GridList from "@material-ui/core/GridList";
import firebase from "../../../configs/fbconfig";
import { makeStyles, GridListTile } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    // border:'1px solid black'
  },
  gridList: {
    border: "1px solid black",
    backgroundColor: '#f6f6f6'
  },
}));

const PostList = ({ id,PostArray }) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  useEffect(() => {
    const postRef = firebase.database().ref("posts/post");
    postRef.on("value", (snapshot) => {
      const postData = snapshot.val();
      console.log("post data", postData);
      const posts = [];
      for (let data in postData) {
        if (id === postData[data].authorId) {
          posts.push(postData[data]);
        }
      }
      setPost(posts);
      PostArray(posts);
    });
  }, []);
  if (post === undefined) {
    return <div>Loding...</div>;
  }
  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={3}>
        {post.map((data, index) => (
          <GridListTile key={index} cols={data.cols || 1}>
            <a href={data.photoURL}>
              <img
                src={data.photoURL}
                width="100%"
                height="300px"
                alt={data.author}
              />
            </a>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default PostList;
