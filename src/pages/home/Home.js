import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import Paper from "@material-ui/core/Paper";
//import InputBase from "@material-ui/core/InputBase";
//import IconButton from "@material-ui/core/IconButton";
//import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
//import headerback from "../../images/76vR6cpTico-unsplash.jpg";
//import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Divider from "@material-ui/core/Divider";
import NumberCounter from "../../_components/NumberCounter.js";
import ofno_homepage_1 from "../../images/ofno_homepage_1.png";
import ofno_homepage_2 from "../../images/ofno_homepage_2.png";
import ofno_homepage_3 from "../../images/ofno_homepage_3.png";
import { default as home_main_img } from "../../images/ofno_about.svg";

const useStyles = makeStyles((theme) => ({
  Typographyhead: {
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  Typographybody: {
    fontWeight: "bold",
    fontSize: "28px",
    color: "#fafafa",
  },
  aboutimg: {
    width: "100%",
    height: "auto",
    maxWidth: "900px",
  },
  homebottomback: {
    height: "auto",
    background: "linear-gradient(to bottom, #005c97, #363795)",
  },

  home_page_mobile_img: {
    width: "100%",
    height: "auto",
    maxWidth: "170px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>OfnoParking</title>
      </Helmet>

      <Container maxWidth="md">
        <Box mt={12} mb={8}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} md={7} lg={7}>
              <Box>
                <Typography
                  component="h1"
                  variant="h3"
                  color="textPrimary"
                  //align="center"
                  gutterBottom
                  className={classes.Typographyhead}
                >
                  OfnoParking
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  paragraph
                  className={classes.Typographyhead}
                >
                  Find parking for your motorcycle easily and quickly.
                </Typography>
                <Box pt={2}>
                  <Grid container>
                    <Grid item xs={12} md={8} lg={8}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/parkingnear"
                        endIcon={<SearchIcon></SearchIcon>}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={5} md={5}>
              <Box p={2}>
                <img
                  src={home_main_img}
                  alt="ofno_about_img"
                  className={classes.aboutimg}
                  loading="lazy"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <div className={classes.homebottomback}>
        <Divider />
        <Container maxWidth="lg">
          <Box mt={7}>
            <Grid
              container
              spacing={2}
              display="flex"
              direction="row"
               
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6} sm={6} md={6}>
                <Box>
                  <Typography
                    align="center"
                    className={classes.Typographybody}
                    paragraph
                  >
                    <NumberCounter label={""} number={"520"} duration={"2"} />+
                    motorcycle parkings in 3+ cities
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Box p={2}>
                  <img
                    src={ofno_homepage_1}
                    alt="home_page_mobile_1"
                    className={classes.home_page_mobile_img}
                    loading="lazy"
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              display="flex"
              direction="row"
               
              alignItems="center"
            >
              <Grid item xs={6} sm={6} md={6}>
                <Box>
                  <Typography
                    align="center"
                    className={classes.Typographybody}
                    paragraph
                  >
                    Use your current location and find the parking lot closest
                    to you
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Box p={2}>
                  <img
                    src={ofno_homepage_2}
                    alt="home_page_mobile_2"
                    className={classes.home_page_mobile_img}
                    loading="lazy"
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              display="flex"
              direction="row"
               
              alignItems="center"
            >
              <Grid item xs={6} sm={6} md={6}>
                <Box mt={4}>
                  <Typography
                    align="center"
                    className={classes.Typographybody}
                    paragraph
                  >
                    Save your favorite parking lots and access them easily
                    whenever you want
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Box p={2}>
                  <img
                    src={ofno_homepage_3}
                    alt="home_page_mobile_3"
                    className={classes.home_page_mobile_img}
                    loading="lazy"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
}
export default Home;
