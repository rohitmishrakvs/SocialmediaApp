
import React, { useState } from 'react';
import { connect } from 'react-redux'
import ChatIcon from '@material-ui/icons/Chat';
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer'
import { Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
// import { AddCircleOutlineOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Avatar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

import SignedInLinked from './SignedInLinked'
import SignedOutLinked from './SignedOutLinked'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start',
        },
        logo: {
            flexGrow: 1
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),

        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }

    }

})

const Nav = (props,{children}) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const menuItems = [
        {
            text: 'Profile',
            icon: <PersonRoundedIcon color="secondary" />,
            path: '/profile'
        },
        {
            text: 'Home Page',
            icon: <AddCircleIcon color="secondary" />,
            path: '/homepage'
        },
        {
            text: 'Chat Box',
            icon: <ChatIcon color="secondary" />,
            path: '/roomlist'
        }
    ]

    const handleDrawerClose = () => {
        setOpen(false);
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const {auth} = props;
    const links = auth.uid ? <SignedOutLinked/>:<SignedInLinked/>
    console.log(auth.photoURL , "photo");

    return (
        <div className={classes.root}>
            {/* App Bar */}
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                elevation={0}>
                <Toolbar>

                    <Typography className={classes.logo} variant="h4">
                        <NavLink to="/profile">WebShare</NavLink>
                    </Typography>
                    <Typography variant="h6">
                        {/* MANAGMENT */}
                        {links}
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="end"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <Avatar src={auth.photoURL} className={classes.avatar} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{ paper: classes.drawerPaper }}
            >

                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            onClick={() => history.push(item.path)}
                            key={item.text}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <br />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps)(Nav);
