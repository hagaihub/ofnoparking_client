import React, { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../../contexts/AuthContext";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MessageIcon from "@material-ui/icons/Message";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import headerback from "../../images/76vR6cpTico-unsplash.jpg";
import { Helmet } from "react-helmet";
import config from "../../config.js";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage: "url(" + headerback + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50% ",
    height: "100vh",
    width: "100%",
  },

  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function ContactUs() {
  const classes = useStyles();
  const [UserResMsg, setUserResMsg] = useState("");
  const [isloading, setisloading] = useState(false);
  const { isAuthenticated } = useContext(authContext);

  const formdata_obj = {
    firstName: "",
    lastName: "",
    email: "",
    msg: "",
  };
  const [formData, setFormData] = useState(formdata_obj);

  const updateFormData = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setisloading(true);

    axios
      .post(
        `${config.api_url}/messages/create`,
        {
          formData,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        setUserResMsg("the message was sent successfully");
        setFormData(formdata_obj);
        setisloading(false);
      })
      .catch(function (error) {
        console.log(error);
        setUserResMsg("Oops..we encountered a problem. Please try again later");
        setisloading(false);
      });
  };

  return (
    <div className={classes.heroContent}>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <Container maxWidth="md">
        <Box>
          <Grid container>
            <Grid item xs={12} md={6} lg={6}>
              <Paper>
                <Box p={4} mt={6}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <Avatar className={classes.avatar}>
                        <MessageIcon />
                      </Avatar>
                    </Box>
                    <Box ml={2}>
                      <Typography component="h1" variant="h5">
                        Contact Us
                      </Typography>
                    </Box>
                  </Box>

                  <Box mt={4}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <Grid container spacing={4}>
                        {!isAuthenticated && (
                          <>
                            <Grid item xs={12} md={12} lg={12}>
                              <TextField
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                value={formData.firstName}
                                onChange={updateFormData}
                                maxLength="20"
                              />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                maxLength="50"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) => updateFormData(e)}
                              />
                            </Grid>
                          </>
                        )}

                        <Grid item xs={12} md={12} lg={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={formData.msg}
                            onChange={(e) => updateFormData(e)}
                            id="msg"
                            label="Message"
                            name="msg"
                            multiline
                            rowsMax={4}
                            maxLength="200"
                          />
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                          {!isloading ? (
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                            >
                              Send message
                            </Button>
                          ) : (
                            <LinearProgress />
                          )}
                          <Box mt={2}>
                            {!isloading && UserResMsg && UserResMsg}
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
export default ContactUs;
