import React, { Component } from "react";
import { facebookProvider, googleProvider } from "../../configs/AuthMethod";
import { Container } from "@material-ui/core";
import { signIn } from "../../service/action/authaction";
import { Typography, Button, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const styles = (theme) => ({
  btn: {
    border: "1px solid grey",
    borderRadius: 10,
    elevation: 2,
    margin: 10,
    width: 200,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 100,
  },
});
class SignIn extends Component {
  render() {
    const handleClick = (e, provider) => {
      e.preventDefault();
      this.props.signIn(provider);
    };
    const { classes } = this.props;
    const { auth } = this.props;


    if (auth.uid) return <Redirect to="/homepage"/>;
    return (
      <Container className={classes.container}>
        <Typography>
          <Button
            className={classes.btn}
            onClick={(e) => {
              handleClick(e, googleProvider);
            }}
          >
            <img
              alt="google"
              src="https://img.icons8.com/fluent/30/fa314a/google-plus.png"
            />{" "}
            google
          </Button>
        </Typography>
        <Typography>
          <Button
            className={classes.btn}
            onClick={(e) => handleClick(e,facebookProvider)}
          >
            <img
              alt="facebook"
              src="https://img.icons8.com/fluent/material-outlined/30/4a90e2/facebook-new.png"
            />
            facebook
          </Button>
        </Typography>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.firebase);
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignIn));
