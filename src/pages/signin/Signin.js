import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect, Link as RouterLink } from "react-router-dom";

import { authContext } from "../../contexts/AuthContext";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import moto_bg_1 from "../../images/moto_bg_1.jpg";
import { Helmet } from "react-helmet";
import config from "../../config.js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" component={RouterLink} to="/">
        OfnoParking
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(" + moto_bg_1 + ")",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Signin({ history }) {
  const classes = useStyles();

  const [isloading, setisloading] = useState(false);
  const [usererrormsg, setUsererrormsg] = useState("");
  const [username, setUserName] = useState("");
  const [userpass, setUserPass] = useState("");
  const [checked_rememberme, setRememberme] = useState(false);

  const { login, isAuthenticated } = useContext(authContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    try {
      var dataObj = {
        email: username,
        password: userpass,
        istoremember: checked_rememberme,
      };

      axios
        .post(`${config.api_url}/accounts/authenticate`, dataObj, {
          withCredentials: true,
        })
        .then(function (response) {
          if (response.data) {
            setUsererrormsg("");
            setisloading(false);
            login(response.data);
          } else {
            setisloading(false);
            setUsererrormsg("Email or password is incorrect");
          }
        })
        .catch(function (error) {
          setisloading(false);
          if (error.response !== undefined && error.response.data.message) {
            setUsererrormsg(error.response.data.message);
          } else {
            setUsererrormsg(
              "Oops..we encountered a problem. Please try again later"
            );
          }
        });
    } catch (err) {
      setUsererrormsg("Oops..we encountered a problem. Please try again later");
    }
  };

  const handleChange_checked_rememberme = (event) => {
    setRememberme(event.target.checked);
  };

  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      {isAuthenticated && <Redirect to="/favorites" />}

      <Grid container className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in to your account
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                inputProps={{ "data-testid": "test_email" }}
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                //autoFocus
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                inputProps={{ "data-testid": "test_password" }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setUserPass(e.target.value)}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked_rememberme}
                    onChange={handleChange_checked_rememberme}
                    color="primary"
                  />
                }
                label={"Remember me"}
              />

              <div>{usererrormsg}</div>
              <div>
                {!isloading ? (
                  <Button
                    type="submit"
                    id="signsubmit"
                    data-testid="signsubmit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Box mt="40px" minHeight="40px">
                    <LinearProgress />
                  </Box>
                )}
              </div>

              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/forgotpassword"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default Signin;
