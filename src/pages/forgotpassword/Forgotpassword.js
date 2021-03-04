import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(11),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

function Forgotpassword({ history }) {
  const classes = useStyles();
  const { isAuthenticated } = useContext(authContext);
  const [isloading, setisloading] = useState(false);
  const [usermsg, setUsermsg] = useState("");
  const [useremail, setUseremail] = useState("");

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL;

  const onSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    setUsermsg("");
    try {
      let dataObj = { email: useremail };

      axios
        .post(`${apiUrl}/accounts/forgotpassword`, dataObj, {
          withCredentials: true,
        })
        .then(function (response) {
          if (response.data.message) {
            setUsermsg(response.data.message);
            setisloading(false);
            setUseremail("");
          } else {
            setisloading(false);
            setUsermsg("שם משתמש או סיסמה לא נכונים");
          }
        })
        .catch(function (error) {
          setisloading(false);
          setUseremail("");

          if (error.response !== undefined && error.response.data.message) {
            setUsermsg(error.response.data.message);
          } else {
            setUsermsg("אופס..נתקלנו בבעיה. אנא נסה מאוחר יותר");
          }
        });
    } catch (err) {
      setUsermsg("אופס..נתקלנו בבעיה. אנא נסה מאוחר יותר");
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      {isAuthenticated && <Redirect to="/favorites" />}

      <Container maxWidth="xs">
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot password
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Please enter the email you registered with
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Login Link
            </Button>
            <div>{usermsg && usermsg}</div>
            <div>{isloading && "טוען..."}</div>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/signin" variant="body2">
                  Back to Sign In
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
}
export default Forgotpassword;
