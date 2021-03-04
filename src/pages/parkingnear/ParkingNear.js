import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView from "../../_components/MapView.js";
import ListView from "../../_components/ListView.js";
import InputRange from "../../_components/InputRange.js";
import { useLocation } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { Helmet } from "react-helmet";

function ParkingNear() {
  const [radius, setRadius] = useState(500);
  const [SelectedRad, setSelectedRad] = useState(0);
  const [location, setLocation] = useState([]);
  const [resultdata, setResultdata] = useState(null);
  const [usererrormsg, setUsererrormsg] = useState("");
  const [isloading, setisloading] = useState(false);
  const [displaytype, setDisplayType] = useState(1);
  //const [searchtext, setSearchtext] = useState("");
  const [searchtextstreetnumber, setSearchtextstreetnumber] = useState("");
  const [isAddress, setisAddress] = useState(true);
  const [ddlcityid, setDdlcityid] = useState("");
  const [ddlcityName, setDdlcityName] = useState("");
  const [ddldata, setddldata] = useState([]);
  const [globalUserCurrentLat, setGlobalUserCurrentLat] = useState(0);
  const [globalUserCurrentLon, setGlobalUserCurrentLon] = useState(0);
  const [inputValueCombo_address, setinputValueCombo_address] = useState("");
  const [openCombo_address, setCombo_addressOpen] = useState(false);
  const [
    inputValueCombo_address_list,
    setinputValueCombo_address_list,
  ] = useState([]);

  const location_rout = useLocation();

  let UserCurrentLat;
  let UserCurrentLon;

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL;

  useEffect(() => {
    //console.log(location_rout.pathname); // result: '/parkingnear'
    //console.log(location_rout.search); // result: '?query=abc'
    //console.log(location_rout.state.searchdetail); // result: 'some_value'

    if (location_rout.state) {
      //setSearchtext(location_rout.state.searchdetail);
    }

    try {
      setisloading(true);
      axios
        .get(`${apiUrl}/cities/GetCities`)
        .then(function (response) {
          setddldata(response.data);
          setisloading(false);
        })
        .catch(function (error) {
          //console.log(error);
          setisloading(false);
          setUsererrormsg(
            "Oops..we encountered a problem. Please try again later"
          );
        });
    } catch (err) {
      console.log("There was a problem with the server");
      setUsererrormsg("Oops..we encountered a problem. Please try again later");
    }
  }, [apiUrl, location_rout]);

  function SetLocGPS() {
    let options = {
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPosition,
        showLocationError,
        options
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setUsererrormsg("הדפדפן לא תומך באפשרות זו");
    }
    function showPosition(position) {
      let coords = [position.coords.latitude, position.coords.longitude];
      setLocation(coords);
    }
    function showLocationError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          setUsererrormsg("כדי להשתמש במערכת עליך לאשר מיקומך הנוכחי");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          setUsererrormsg("הנתונים על המיקום לא זמינים");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          setUsererrormsg("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          setUsererrormsg("שגיאה כללית");
          break;
        default:
          console.log("An unknown error occurred.");
          setUsererrormsg("שגיאה כללית");
      }
    }
  }

  async function GetGeoFromAddress() {
    if (inputValueCombo_address.length > 0 && isAddress) {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${inputValueCombo_address} ${searchtextstreetnumber} ${ddlcityName}&polygon_geojson=1&format=json&email=myemail@myserver.com`
      );
      //console.log(response);
      return response;
    }
  }

  // async function GetAddressFromGeo() {
  //   if (isGps) {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${
  //         location[0]
  //       }&lon=${location[1]}&email=ofno1@ofno1.com`
  //     );
  //     console.log(response);
  //     return response;
  //   }
  // }

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    setUsererrormsg("");

    if (isAddress) {
      let res_GetGeoFromAddress = await GetGeoFromAddress();
      //console.log(res.data[0].lat);
      //console.log(res.data[0].lon);

      if (res_GetGeoFromAddress.data.length > 0) {
        UserCurrentLat = res_GetGeoFromAddress.data[0].lat;
        UserCurrentLon = res_GetGeoFromAddress.data[0].lon;
      } else {
        setUsererrormsg("Invalid address");
      }
    } else {
      UserCurrentLat = location[0]; //"32.087407"
      UserCurrentLon = location[1]; //"34.771705"
    }

    try {
      setGlobalUserCurrentLat(UserCurrentLat);
      setGlobalUserCurrentLon(UserCurrentLon);

      axios
        .get(`${apiUrl}/cities/calcDistance`, {
          params: {
            cityid: ddlcityid,
            lat: UserCurrentLat,
            lon: UserCurrentLon,
            rad: radius,
          },
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
          setSelectedRad(radius);
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
  };

  const handleSelectCityOnChange = (event, index) => {
    setisloading(true);
    setDdlcityid(event.target.value);
    setDdlcityName(index.props.children);
    try {
      axios
        .get(`${apiUrl}/cities/GetCityStreetsNames/`, {
          params: {
            cityid: event.target.value,
          },
        })
        .then(function (response) {
          //console.log(response.data);
          setinputValueCombo_address_list(response.data);
          setisloading(false);
        })
        .catch(function (error) {
          console.log(error);
          setinputValueCombo_address_list([]);
          setisloading(false);
        });
    } catch (err) {
      console.log(err);
      setinputValueCombo_address_list([]);
      setisloading(false);
    }
  };

  const handleSwitchLocationChange = (event) => {
    if (event.target.checked) {
      setisAddress(false);
      SetLocGPS();
    } else {
      setisAddress(true);
    }

    setResultdata(null);
    //setSearchtext("");
    setUsererrormsg("");
    setDdlcityid(0);
    setDdlcityName("");
  };

  const handleCombo_addressOpen = () => {
    if (inputValueCombo_address.length > 0) {
      setCombo_addressOpen(true);
    }
  };
  
  const handleCombo_addressInputChange = (event, newInputValue) => {
    setinputValueCombo_address(newInputValue);
    if (newInputValue.length > 0) {
      setCombo_addressOpen(true);
    } else {
      setCombo_addressOpen(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Find Parking</title>
      </Helmet>
      <Container maxWidth="md">
        <Box mt={12}>
          <Paper elevation={3}>
            <Box p={2} display="flex" flexDirection="column">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h5">
                  Find your motorcycle parking
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      // checked={state.checkedB}
                      onChange={handleSwitchLocationChange}
                      color="primary"
                    />
                  }
                  label="Use your location"
                />
              </Box>

              <Box mt={3}>
                <form onSubmit={onSearchSubmit}>
                  <Grid container spacing={2}>
                    {isAddress && (
                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel id="ddl_city_label" required>City</InputLabel>
                            <Select
                              label="City"
                              labelId="ddl_city_label"
                              value={ddlcityid}
                              onChange={handleSelectCityOnChange}
                              required
                            >
                              {ddldata.map((Citieobj) => (
                                <MenuItem
                                  key={Citieobj._id}
                                  value={Citieobj._id}
                                >
                                  {Citieobj.display_name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={8} sm={4} md={4}>
                          <Autocomplete
                            id="address"
                            open={openCombo_address}
                            //openOnFocus={false}
                            onOpen={handleCombo_addressOpen}
                            onClose={() => setCombo_addressOpen(false)}
                            inputValue={inputValueCombo_address}
                            onInputChange={handleCombo_addressInputChange}
                            options={inputValueCombo_address_list}
                            getOptionLabel={(option) => option.title}
                            freeSolo
                            loading={isloading}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Address"
                                variant="outlined"
                                required
                              />
                            )}
                          />

                          {/* <TextField
                            autoComplete="address"
                            variant="outlined"
                            required
                            fullWidth
                            name="address"
                            label="address"
                            value={searchtext && searchtext}
                            onChange={(e) => setSearchtext(e.target.value)}
                          /> */}
                        </Grid>
                        <Grid item xs={4} sm={2} md={2}>
                          <TextField
                            variant="outlined"
                            type="number"
                            required
                            fullWidth
                            name="number"
                            label="Number"
                            InputProps={{
                              inputProps: { min: "1", max: "500" },
                            }}
                            value={
                              searchtextstreetnumber && searchtextstreetnumber
                            }
                            onChange={(e) =>
                              setSearchtextstreetnumber(e.target.value)
                            }
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={6} md={6}>
                      <InputRange
                        rad={radius}
                        setrad={setRadius}
                        inpLblText={"Radius"}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isloading}
                      >
                        find
                      </Button>
                    </Grid>
                  </Grid>

                  <Box mt={2}>
                    {isloading && <LinearProgress />}
                    {!isloading && usererrormsg && usererrormsg}
                  </Box>
                </form>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box mt={4} mb={6}>
          {resultdata && !isloading ? (
            <Box>
              {resultdata.length > 0 ? (
                <Box>
                  <Box>
                    <Typography component="h1" variant="h5">
                      We found {resultdata.length} parking spots for you
                    </Typography>
                  </Box>

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
                        <ListView
                          data={resultdata}
                          isaddresssearch={isAddress}
                        />
                      </Box>
                    ) : (
                      <Box>
                        <MapView
                          data={resultdata}
                          rad={SelectedRad}
                          UserCurrentLat={globalUserCurrentLat}
                          UserCurrentLon={globalUserCurrentLon}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              ) : (
                <Typography>
                  We did not find any parking for your search. try to increase
                  the radius or check the address you entered
                </Typography>
              )}
            </Box>
          ) : null}
        </Box>
      </Container>
    </>
  );
}
export default ParkingNear;
