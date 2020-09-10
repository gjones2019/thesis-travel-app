import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import IconButton from '@material-ui/core/IconButton';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import FlightIcon from '@material-ui/icons/Flight';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo, orange } from '@material-ui/core/colors';
import axios from 'axios';
import Preferences from './preferences';
// import PlanATrip from './PlanATrip';
// import Trips from './Trips';
import Chat from './Chat';
import UserTrips from './UserTrips';
import InvitesPage from './InvitesPage';
import './App.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    color: 'primary',
  },
}));

// const ResponsiveDrawer = ({ currentUser, currentTrip, otherUsers }) => {
const ResponsiveDrawer = ({ currentUser, currentTrip }) => {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: indigo[500],
      },
      secondary: {
        main: orange[500],
      },
    },
    typography: {
      fontFamily: 'sans-serif',
      fontSize: 20,
      fontWeightBold: 500,
    },
  });

  const [allOtherUsers, setAllOtherUsers] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [myInvites, setMyInvites] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [clickedPage, setClickedPage] = useState(null);
  const [toggleIcon, setToggleIcon] = useState(false);
  const [showInvitesPage, setShowInvitesPage] = useState(false);
  const [showTrips, setShowTrips] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [showHome, setShowHome] = useState(false);
  // const [count, setCount] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (page) => {
    if (page === 'plan') {
      setShowPlan(true);
      setShowTrips(false);
      setShowHome(false);
      setShowInvitesPage(false);
      setShowChat(false);
    }
    if (page === 'trips') {
      setShowTrips(true);
      setShowHome(false);
      setShowPlan(false);
      setShowInvitesPage(false);
      setShowChat(false);
    }
    if (page === 'invitesPage') {
      if (!showInvitesPage) {
        setShowInvitesPage(true);
        setShowHome(false);
        setShowTrips(false);
        setShowPlan(false);
        setShowChat(false);
      }
    }
    if (page === 'chat') {
      if (!showChat) {
        setShowChat(true);
        setShowHome(false);
        setShowTrips(false);
        setShowPlan(false);
        setShowInvitesPage(false);
      }
    }
    if (page === 'home') {
      if (!showHome) {
        setShowHome(true);
        setShowTrips(false);
        setShowPlan(false);
        setShowInvitesPage(false);
        setShowChat(false);
      }
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['HOME'].map((text) => (
          <ListItem
            button
            onClick={() => {
              setClickedPage(null);
              handleNavClick('home');
              setMobileOpen(false);
            }}
            key={text}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Plan A Trip'].map((text) => (
          <ListItem
            button
            onClick={() => {
              handleNavClick('plan');
              setMobileOpen(false);
            }}
            key={text}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Trips'].map((text) => (
          <ListItem
            button
            onClick={() => {
              handleNavClick('trips');
              setMobileOpen(false);
            }}
            key={text}
          >
            <ListItemIcon>
              <FlightIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Trip Invites'].map((text) => (
          <ListItem
            button
            onClick={() => {
              handleNavClick('invitesPage');
              setMobileOpen(false);
              if (myInvites.length !== 0) {
                setToggleIcon(true);
              }
            }}
            key={text}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
            {myInvites.length !== 0 && toggleIcon === false ? (
              <FiberNewIcon color="primary" />
            ) : null}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Chat'].map((text, index) => (
          <ListItem
            button
            onClick={() => {
              handleNavClick('chat');
              setMobileOpen(false);
            }}
            key={text}
          >
            <ListItemIcon>{index % 2 === 0 ? <ChatIcon /> : <ChatIcon />}</ListItemIcon>
            <ListItemText primary={text} />
            {/* {myInvites.length !== 0 && toggleIcon === false ? (
              <FiberNewIcon color="primary" />
            ) : null} */}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text) => (
          <ListItem button onClick={() => console.info(`${text} Clicked!`)} key={text}>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  useEffect(() => {
    axios
      .get('/inviteUsers', {
        params: {
          currentUser: currentUser.googleId,
        },
      })
      .then((response) => {
        setAllOtherUsers(response.data);
      })
      .catch((err) => console.warn('ERRR', err));
  });

  // useEffect(() => {
  //   console.log('heyyyy');
  //   axios.get('./newMsgs', { params: {
  //     trip: currentTrip },
  //   })
  //     .then((response) => console.info(response)).catch((err) => console.log(err));
  //   // const timer = setTimeout(() => {
  //   //   setCount(count + 1);
  //   // }, 2000);
  //   // return () => clearTimeout(timer);
  // }, [count]);

  useEffect(() => {
    axios
      .get('/getInvites', { params: { googleId: currentUser.googleId } })
      .then((response) => setMyInvites(response.data))
      .catch((err) => console.warn('ERRR', err));
  }, []);

  const container = window !== undefined ? () => window.document.body : undefined;

  const landingPage = (
    <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      <img
        src={currentUser.profile_pic}
        alt="user loaded from google login"
        className="profile-pic"
      />
      <Typography className="welcome-message" variant="h6">
        {`Hi, ${currentUser.first_name}!`}
      </Typography>
      {/* <Trips
        currentUser={currentUser}
        currentTrip={currentTrip}
        setClickedPage={setClickedPage}
      />
      <PlanATrip
        otherUsers={otherUsers}
        currentUser={currentUser}
        setClickedPage={setClickedPage}
      /> */}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          styles={{ background: 'secondary', boxShadow: 'none' }}
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              TRVL
            </Typography>
            <img
              src={currentUser.profile_pic}
              alt="user loaded from google login for toolbar"
              className="toolbar-pic"
            />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
              {}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{ textAlign: 'center', justifyContent: 'center' }}>
            {clickedPage || landingPage}
            {showTrips ? (
              <UserTrips
                currentUser={currentUser}
                currentTrip={currentTrip}
                otherUsers={allOtherUsers}
              />
            ) : null}
            {showPlan ? (
              <Preferences
                currentUser={currentUser}
                currentTrip={currentTrip}
                otherUsers={allOtherUsers}
              />
            ) : null}
            {showInvitesPage ? (
              <InvitesPage
                currentUser={currentUser}
                otherUsers={allOtherUsers}
                myInvites={myInvites}
                setClickedPage={setClickedPage}
              />
            ) : null}
            {showChat ? <Chat currentUser={currentUser} currentTrip2={currentTrip} /> : null}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

ResponsiveDrawer.propTypes = {
  // otherUsers: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     first_name: PropTypes.string,
  //     last_name: PropTypes.string,
  //     email: PropTypes.string,
  //     profile_pic: PropTypes.string,
  //     host: PropTypes.bool,
  //     googleId: PropTypes.string,
  //   }),
  // ).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  // currentTrip: PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string,
  //   destination: PropTypes.string,
  //   start_date: PropTypes.string,
  //   end_date: PropTypes.string,
  // }).isRequired,
  currentTrip: PropTypes.string.isRequired,
};

export default ResponsiveDrawer;
