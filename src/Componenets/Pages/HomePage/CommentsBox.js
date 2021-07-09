import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
  comment: {
      backgroundColor:'#f4f4f4',
      borderRadius:20,
      border: "1px solid #ccc",
      boxShadow: "1px 1px 1px #999",
      margin:5
  }
});

const CommentsBox = ({ comment }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List>
        {comment.map((comment,index) => {
          return (
            <ListItem className={classes.comment} key = {index} >
              <ListItemAvatar>
                <Avatar src={comment.authorphotoURL} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.author}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.text}
                    </Typography>
                    -:{comment.createdAt}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default CommentsBox;