import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Comment from "./Comment";
import firebase from "../../../configs/fbconfig";
import CommentsBox from './CommentsBox'
import {useSelector} from 'react-redux'
import LikesComponent from './LikesComponent'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    marginTop: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CardPost = ({ post,referencekeys }) => {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);
  const [likeData,setLikedatWithKey] = React.useState([])
  const [expanded, setExpanded] = React.useState(false);
  const [comments,setComments] = React.useState([])
  const [like,setLike] = React.useState([]) 

  useEffect(() => {
    const commentRef = firebase.database().ref(`posts/post/${referencekeys}/comment`)
    commentRef.on('value',(snapshot) =>{
      const commentsData = snapshot.val();
      const  comm = []
      for (let comment in commentsData) {
        comm.push(commentsData[comment]);
      }
      setComments(comm);
    })
  }, [])
  
  
  useEffect(() => {
    const likeRef = firebase.database().ref(`posts/post/${referencekeys}/likes`)
    likeRef.on('value',(snapshot) =>{
      const likesData = snapshot.val();
      setLikedatWithKey(likesData)
      const  likes = []
      for (let like in likesData) {
        likes.push(likesData[like]);
      }
      setLike(likes);
    })
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="Author" className={classes.avatar} src={post.authorPhotoUrl}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />   
          </IconButton>
        }
        title={post.title}
        subheader={post.createdAt}
      />
      <CardMedia
        className={classes.media}
        image={post.photoURL}
      />
      <CardContent>
        <Typography variant="h5" color="primary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <Divider  />
      <Divider  />
      <CardActions disableSpacing>
        <LikesComponent LikeData={like} referencekeys={referencekeys} likerefData={likeData}/>{like.length}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </IconButton> {comments.length}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentsBox comment={comments} />
          <Comment id={post.postId} refkey={referencekeys} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardPost;
