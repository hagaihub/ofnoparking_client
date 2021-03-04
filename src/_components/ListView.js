import React, { useState, useContext, useRef } from "react";
import axios from "axios";
// import Button from "./Button_old.js";
import { authContext } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DirectionsIcon from "@material-ui/icons/Directions";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snackbarSuccessStyle: {
    backgroundColor: "#81c784",
  },
  snackbarWarningStyle: {
    backgroundColor: "#ffb74d",
  },
  snackbarErrorStyle: {
    backgroundColor: "#e57373",
  },
  // tableRow: {
  //   "&:hover": {
  //     backgroundColor: "#f5f5f5",
  //   },
  // },
}));

function ListView(props) {
  const classes = useStyles();

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL;

  const [resParkingList, setResParkingList] = useState(props.data);
  const { isAuthenticated } = useContext(authContext);
  const [IsToShowUserLogInMsg, setIsToShowUserLogInMsg] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [alerttext, setAlerttext] = useState("");
  const [snackbarType, setsnackbarType] = useState("Success");
  const [favButtonDisabled, setfavButtonDisabled] = useState(false);
  const fav_loader_ref = useRef([]);

  const handleNavLinkRow = (lon, lat) => () => {
    //let sGeometryx = String(geometry.x).substring(0, 6);
    //let sGeometryy = String(geometry.y).substring(0, 6);
    //let sLatLonFromItm = JSITM.itmRef2gpsRef(
    //sGeometryx + " " + sGeometryy
    //).split(" ");
    window.open(
      `https://www.waze.com/livemap/directions?navigate=yes&latlng=${lon},${lat}`,
      "_blank"
    );
  };

  const handleAddToFavorites = (parkin_obj, indexobj) => (e) => {
    if (!isAuthenticated) {
      setIsToShowUserLogInMsg(true);
      setsnackbarType("Error");
      setAlerttext("you need to sign in to add parking");
      setOpenalert(true);
    } else {
      setfavButtonDisabled(true);
      fav_loader_ref.current[indexobj].style.display = "inline";

      axios
        .put(
          `${apiUrl}/accounts/addfavoriteparkingtouser`,
          {
            parkingid: parkin_obj,
          },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          const newresParkingList = [...resParkingList];
          const found = newresParkingList.find(
            (parking) => parking._id === parkin_obj
          );
          found.isfav = true;
          setResParkingList(newresParkingList);
          setAlerttext("Added successfully");
          setsnackbarType("Success");
          setOpenalert(true);
          setfavButtonDisabled(false);
          fav_loader_ref.current[indexobj].style.display = "none";
        })
        .catch(function (error) {
          setIsToShowUserLogInMsg(true);
          console.log(error);
          setsnackbarType("Error");
          setAlerttext("error");
          setOpenalert(true);
          setfavButtonDisabled(false);
          fav_loader_ref.current[indexobj].style.display = "none";
        });
    }
  };

  const handleRemoveToFavorites = (parkin_obj, indexobj) => (e) => {
    setfavButtonDisabled(true);
    fav_loader_ref.current[indexobj].style.display = "inline";

    axios
      .delete(`${apiUrl}/accounts/removefavoriteparkingtouser/${parkin_obj}`, {
        withCredentials: true,
      })
      .then(function (response) {
        const newresParkingList = [...resParkingList];
        const found = newresParkingList.find(
          (parking) => parking._id === parkin_obj
        );
        found.isfav = false;
        setResParkingList(newresParkingList);
        setAlerttext("Removed successfully");
        setsnackbarType("Success");
        setOpenalert(true);
        setfavButtonDisabled(false);
        fav_loader_ref.current[indexobj].style.display = "none";
      })
      .catch(function (error) {
        setIsToShowUserLogInMsg(true);
        console.log(error);
        setAlerttext("error");
        setsnackbarType("Error");
        setOpenalert(true);
        setfavButtonDisabled(false);
        fav_loader_ref.current[indexobj].style.display = "none";
      });
  };

  const handleClosealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenalert(false);
  };

  return (
    <Box>
      {IsToShowUserLogInMsg && (
        <Box>
          you need to <Link to="/signin">sign in</Link> to add parking
        </Box>
      )}

      <List>
        {resParkingList.map((parking, index) => (
          <Box key={parking._id}>
            <ListItem alignItems="flex-start" className={classes.tableRow}>
              <ListItemAvatar>
                <Avatar>
                  <LocalParkingIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={`ברחוב ${parking.ktovet}`}
                secondary={
                  <>
                    {parking.ms_mekomot && (
                      <Box component="span">
                        Parkings Number: {parking.ms_mekomot}
                      </Box>
                    )}

                    {parking.distFromCenter && (
                      <>
                        , Distance from
                        <Box component="span">
                          {props.isaddresssearch
                            ? " address"
                            : " your location"}
                          : {Math.round(parking.distFromCenter)}m
                        </Box>
                      </>
                    )}
                  </>
                }
              />

              <Box>
                <Box
                  display="none"
                  ref={(element) => (fav_loader_ref.current[index] = element)}
                >
                  <CircularProgress size={20} />
                </Box>

                {!parking.isfav ? (
                  <Tooltip title="add to Favorites">
                    <span>
                      <IconButton
                        aria-label="add to Favorites"
                        onClick={handleAddToFavorites(parking._id, index)}
                        variant="contained"
                        color="default"
                        disabled={favButtonDisabled}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip title="Remove from Favorites">
                    <span>
                      <IconButton
                        aria-label="Remove from Favorites"
                        onClick={handleRemoveToFavorites(parking._id, index)}
                        variant="contained"
                        color="secondary"
                        disabled={favButtonDisabled}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNavLinkRow(parking.lat, parking.lon)}
                  startIcon={<DirectionsIcon />}
                >
                  nav
                </Button>
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openalert}
        autoHideDuration={4000}
        onClose={handleClosealert}
      >
        <SnackbarContent
          className={
            snackbarType === "Success"
              ? classes.snackbarSuccessStyle
              : snackbarType === "Error"
              ? classes.snackbarErrorStyle
              : snackbarType === "Warning"
              ? classes.snackbarWarningStyle
              : classes.snackbarSuccessStyle
          }
          message={alerttext}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClosealert}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        ></SnackbarContent>
      </Snackbar>
    </Box>
  );
}
export default ListView;
