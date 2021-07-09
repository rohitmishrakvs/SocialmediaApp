import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles, Container, IconButton, Avatar, Typography,Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import PostList from './PostList';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'


const styles = (theme) => ({
    container: {
        backgroundColor: '#f5f5f5',
        height: '1200'
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        margin: 10
    },
    icon: {
        backgroundColor: 'primary',
        width: 150,
        height: 150,
    },
    btnEdit:{
        backgroundColor: '#e69595',
        width:1200,
        fontSize:25,
        fontWeight:400,
        margin:10,
    },
})




class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
      }
    state={
        numberOfPosts:0
    }
    handleCallback = (childData) =>{
        console.log(childData,"hgjhghjghjh");
        this.setState({numberOfPosts:childData.length})

    }
    render() {
        console.log(this.state);
        const { classes , auth } = this.props
        const { numberOfPosts } = this.state
        if(!auth.uid)return<Redirect to = 'signin'/>
        return (
            <Container className={classes.container}>
                <Grid container className={classes.item}>
                    <Grid item xs={6} >
                        <IconButton
                            className={classes.icon}
                            color="inherit"
                            edge="end"
                        >
                            <Avatar src={auth.photoURL} className={classes.icon}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4">{numberOfPosts}</Typography>
                        <Typography variant="h6">Posts</Typography>
                    </Grid>
                </Grid>
                <Grid container className={classes.item} >
                    <Grid item xs={12}>
                        <Typography variant="h6">{auth.displayName}</Typography>
                    </Grid> 
                    <Grid item xs={12}>
                        <Typography variant="h6" color="primary">---{auth.email}</Typography>
                    </Grid>
                </Grid> 
               
                <Grid container className={classes.item} >
                <Grid item xs={12}>
                        <Button className={classes.btnEdit}>
                            <EditIcon/>
                            edit
                            </Button>
                    </Grid>
                    <PostList id={auth.uid} PostArray={this.handleCallback}/>
                </Grid>
            </Container>

        )
    }
}


const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Profile));