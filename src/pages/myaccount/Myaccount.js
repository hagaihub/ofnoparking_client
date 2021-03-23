import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import ComputerIcon from "@material-ui/icons/Computer";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import { authContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";
import config from "../../config.js";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Myaccount() {
  const classes = useStyles();

  const [resultdata, setResultdata] = useState(null);
  const [usererrormsg, setUsererrormsg] = useState("");
  const [isloading, setisloading] = useState(false);
  const [openalert, setOpenalert] = useState(false);

  const { authUser } = useContext(authContext);

  useEffect(() => {
    setisloading(true);
    setUsererrormsg("");

    try {
      axios
        .get(`${config.api_url}/accounts/getactivelogins`, {
          withCredentials: true,
        })
        .then(function (response) {
          setResultdata(response.data);

          setisloading(false);
        })
        .catch(function (error) {
          setisloading(false);
          setUsererrormsg(
            "Oops..we encountered a problem. Please try again later"
          );
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
        setUsererrormsg(
          "Oops..we encountered a problem. Please try again later"
        );
      } else {
        console.log(err.response.data.msg);
        setUsererrormsg(
          "Oops..we encountered a problem. Please try again later"
        );
      }
    }

    return () => {};
  }, []);

  const handlelogoutdevice = (refresh_tok, indexobj) => (e) => {
    //fav_loader_ref.current[indexobj].style.display = "inline";
    let dataObj = { token: refresh_tok };

    axios
      .post(`${config.api_url}/accounts/revoke-token/`, dataObj, {
        withCredentials: true,
      })
      .then(function (response) {
        //console.log(resultdata);
        //console.log(dataObj);

        let new_resultdata = resultdata.filter(function (obj) {
          return obj.token !== dataObj.token;
        });

        setResultdata(new_resultdata);
        setOpenalert(true);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>My Account</title>
      </Helmet>
      <Box mt={12}>
        <Grid container>
          <Grid item xs={12} sm={10} md={10}>
            <Box display="flex">
              <Box>
                <Avatar className={classes.avatar}>
                  <AccountCircleIcon />
                </Avatar>
              </Box>
              <Box ml={2}>
                <Typography component="h1" variant="h5">
                  My Account
                </Typography>
              </Box>
            </Box>

            {authUser && (
              <div>
                <Box mt={4} display="flex" flexDirection="column">
                  <Box>
                    <b>Created date: </b>
                    {new Date(authUser.created).toLocaleString()}
                  </Box>
                  <Box mt={2}>
                    <b>Email: </b>
                    {authUser.email}
                  </Box>
                  <Box mt={2}>
                    <b>Role: </b>
                    {authUser.role}
                  </Box>

                  <Box mt={2}>
                    <b>
                      Devices connected to this account:{" "}
                      {resultdata && resultdata.length}
                    </b>

                    {isloading && <LinearProgress />}

                    {resultdata && !isloading ? (
                      <div>
                        {resultdata.length > 0 ? (
                          <Box>
                            <List>
                              {resultdata.map((login_obj, index) => (
                                <Box key={login_obj._id}>
                                  <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                      <Avatar>
                                        <ComputerIcon />
                                      </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                      primary={`Date: ${new Date(
                                        login_obj.created.toLocaleString()
                                      )}`}
                                      secondary={`ip: ${login_obj.createdByIp}`}
                                    />

                                    {!login_obj.Activenow ? (
                                      <Box mr={5}>
                                        <Tooltip title="logout this device">
                                          <span>
                                            <IconButton
                                              aria-label="logout"
                                              onClick={handlelogoutdevice(
                                                login_obj.token,
                                                index
                                              )}
                                              variant="contained"
                                              color="secondary"
                                              //disabled={favButtonDisabled}
                                            >
                                              <ExitToAppIcon />
                                            </IconButton>
                                          </span>
                                        </Tooltip>
                                      </Box>
                                    ) : (
                                      <Box mr={5}>Active now</Box>
                                    )}
                                  </ListItem>
                                  <Divider variant="inset" component="li" />
                                </Box>
                              ))}
                            </List>
                          </Box>
                        ) : (
                          <>not found</>
                        )}
                      </div>
                    ) : null}

                    {!isloading && usererrormsg && usererrormsg}
                  </Box>
                </Box>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openalert}
        autoHideDuration={3000}
        onClose={() => setOpenalert(false)}
      >
        <SnackbarContent
          style={{ backgroundColor: "#81c784" }}
          message="successfully logout"
        ></SnackbarContent>
      </Snackbar>
    </Container>
  );
}
export default Myaccount;
