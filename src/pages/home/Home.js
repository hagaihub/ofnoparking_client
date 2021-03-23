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
//import ofno_about_img from "../../images/ofno_about.png";
import { default as home_main_img } from "../../images/ofno_about.svg";

const useStyles = makeStyles((theme) => ({
  Typographyhead: {
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  Typographybody: {
    fontWeight: "bold",
    fontSize: "50px",
    color: "#fafafa",
    padding: "20px",
  },
  aboutimg: {
    width: "100%",
    height: "auto",
    maxWidth: "900px",
  },
  homebottomback: {
    height: "100vh",
    background: "linear-gradient(to bottom, #005c97, #363795)",
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
        <Box mt={10} mb={2}>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant="h2"
                  align="center"
                  paragraph
                  className={classes.Typographybody}
                >
                  <NumberCounter
                    label={"Parkings"}
                    number={"520"}
                    duration={"2"}
                  />
                  +
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant="h2"
                  align="center"
                  paragraph
                  className={classes.Typographybody}
                >
                  Cities: 3+
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
}
export default Home;
