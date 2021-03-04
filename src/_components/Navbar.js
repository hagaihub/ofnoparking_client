import React, { useContext, useState } from "react";
import { authContext } from "../contexts/AuthContext.js";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from "@material-ui/icons/Message";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

function Navbar(props) {
  const { logout, isAuthenticated, authUser } = useContext(authContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  const [navstate, setnavstate] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setnavstate({ ...navstate, [anchor]: open });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndLogOut = () => {
    setAnchorEl(null);
    logout();
  };

  const handleThemeChange = () => {
    props.setDarkStateProp(!props.darkStateProp);
  };

  return (
    <div className={classes.root}>
      <AppBar
        // style={{
        //   background:
        //     "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 49%, rgba(0,96,255,1) 100%)",
        // }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer("left", true)}
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor={"left"}
            open={navstate["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <div
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer("left", false)}
              onKeyDown={toggleDrawer("left", false)}
            >
              <List>
                <ListItem button component={RouterLink} to="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>

                <ListItem button component={RouterLink} to="/parkingnear">
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Find Parking"} />
                </ListItem>

                <ListItem button component={RouterLink} to="/about">
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItem>

                <ListItem button component={RouterLink} to="/termsandprivacy">
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Terms and Privacy"} />
                </ListItem>

                <ListItem button component={RouterLink} to="/contactus">
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Contact Us"} />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button component={RouterLink} to="/favorites">
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary={"My Favorites"} />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={handleThemeChange}
                        checked={props.darkStateProp}
                        color="primary"
                      />
                    }
                    label="Dark"
                  />
                </ListItem>
              </List>
            </div>
          </Drawer>

          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" component={RouterLink} to="/">
              OfnoParking
            </Button>
          </Typography>

          {isAuthenticated ? (
            <div>
              <Button
                color="inherit"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {authUser.email && authUser.email.substring(0, authUser.email.lastIndexOf("@"))}
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/myaccount"
                >
                  My account
                </MenuItem>
                <MenuItem onClick={handleCloseAndLogOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" component={RouterLink} to="/signin">
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
