import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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

function Signup() {
  const classes = useStyles();

  const { isAuthenticated } = useContext(authContext);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL;

  const formdata_obj = {
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };
  const [UserResMsg, setUserResMsg] = useState("");
  const [isloading, setisloading] = useState(false);
  const [formData, setFormData] = useState(formdata_obj);
  const [isSignupSuccess, setSignupSuccess] = useState(false);
  //const [checked_terms, setChecked_terms] = useState(false);

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisloading(true);

    if (formData.password !== formData.confirmPassword) {
      setUserResMsg("Passwords must be identical");
      setisloading(false);
      return false;
    }

    if (formData.email === "") {
      setUserResMsg("An email address must be provided");
      setisloading(false);
      return false;
    }

    if (!formData.acceptTerms) {
      setUserResMsg("must accept the terms of use and privacy policy");
      setisloading(false);
      return false;
    }

    axios
      .post(`${apiUrl}/accounts/register`, formData, {
        withCredentials: true,
      })
      .then(function (response) {
        setisloading(false);
        setUserResMsg(response.data.message);
        setFormData(formdata_obj);
        setSignupSuccess(true);
      })
      .catch(function (error) {
        setisloading(false);
        setFormData(formdata_obj);
        if (error.response !== undefined && error.response.data.message) {
          setUserResMsg(error.response.data.message);
        } else {
          setUserResMsg(
            "Oops..we encountered a problem. Please try again later"
          );
        }
      });
  };

  const handleChange_checked_terms = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
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
              Sign Up
            </Typography>

            {!isSignupSuccess ? (
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={updateFormData}
                  maxLength="50"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={updateFormData}
                  value={formData.password}
                  maxLength="20"
                  minLength="6"
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={updateFormData}
                  value={formData.confirmPassword}
                  maxLength="20"
                  minLength="6"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.acceptTerms}
                      onChange={handleChange_checked_terms}
                      color="primary"
                      name="acceptTerms"
                    />
                  }
                  label={
                    <div>
                      <span>I accept the </span>
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="/termsandprivacy"
                      >
                        terms of use and privacy policy
                      </Link>
                    </div>
                  }
                  required
                />

                <div>{!isloading && UserResMsg && UserResMsg}</div>
                <div>
                  {!isloading ? (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={!formData.acceptTerms}
                    >
                      Sign up
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
                    <Link component={RouterLink} to="/signin" variant="body2">
                      {"Have an account? Sign in now"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            ) : (
              <>
                <Box mt={6}>
                  <Typography variant="h4" align="center">
                    Registration successful!
                    <Box mt={4}>
                      {" "}
                      <Link color="primary" component={RouterLink} to="/signin">
                        Click to sign in
                      </Link>
                    </Box>
                  </Typography>
                </Box>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default Signup;
