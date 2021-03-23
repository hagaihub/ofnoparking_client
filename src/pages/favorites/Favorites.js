import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import MapView from "../../_components/MapView.js";
import ListView from "../../_components/ListView.js";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import MapIcon from "@material-ui/icons/Map";
import Link from "@material-ui/core/Link";
import { Helmet } from "react-helmet";
import config from "../../config.js";

function Favorites() {
  const [resultdata, setResultdata] = useState(null);
  const [usererrormsg, setUsererrormsg] = useState("");
  const [isloading, setisloading] = useState(false);
  const [displaytype, setDisplayType] = useState(1);

  useEffect(() => {
    setisloading(true);
    setUsererrormsg("");

    try {
      axios
        .get(`${config.api_url}/cities/GetUserFavoritesParkingsByUserID`, {
          withCredentials: true,
        })
        .then(function (response) {
          if (response.data.arr_UserFavoritesParking.length > 0) {
            response.data.arr_parkings.map((parking_item) => {
              let favoritesParking_find_res = response.data.arr_UserFavoritesParking.find(
                (fav_parking_id) => fav_parking_id === parking_item._id
              );

              if (favoritesParking_find_res === undefined) {
                return parking_item;
              } else {
                return (parking_item.isfav = true);
              }
            });
          }

          setResultdata(response.data.arr_parkings);

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

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>My favorites</title>
      </Helmet>
      <Box mt={10}>
        <Box>
          <h1>My favorite parkings</h1>
        </Box>

        {isloading && <LinearProgress />}

        {resultdata && !isloading ? (
          <div>
            {resultdata.length > 0 ? (
              <Box>
                <div>
                  You have {resultdata.length} parkings in your favorites list
                </div>

                <Box mt={2} display="flex" flexDirection="row">
                  <Box>
                    <Button
                      variant="contained"
                      color={displaytype === 1 ? "secondary" : "default"}
                      startIcon={<ListIcon />}
                      onClick={() => setDisplayType(1)}
                    >
                      List
                    </Button>
                  </Box>
                  <Box ml={2}>
                    <Button
                      variant="contained"
                      color={displaytype === 2 ? "secondary" : "default"}
                      startIcon={<MapIcon />}
                      onClick={() => setDisplayType(2)}
                      mt={8}
                    >
                      Map
                    </Button>
                  </Box>
                </Box>

                <Box mt={2}>
                  {displaytype === 1 ? (
                    <Box>
                      <ListView data={resultdata} />
                    </Box>
                  ) : (
                    <Box>
                      <MapView
                        data={resultdata}
                        rad={null}
                        UserCurrentLat={null}
                        UserCurrentLon={null}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            ) : (
              <>
                You do not yet have parking in your favorites list,{" "}
                <Link component={RouterLink} to="/parkingnear" variant="body2">
                  Find Some Parkings.
                </Link>
              </>
            )}
          </div>
        ) : null}

        {!isloading && usererrormsg && usererrormsg}
      </Box>
    </Container>
  );
}
export default Favorites;
