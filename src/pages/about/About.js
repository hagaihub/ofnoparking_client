import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { default as home_main_img } from "../../images/ofno_about.svg";

const useStyles = makeStyles((theme) => ({
  aboutimg: {
    width: "100%",
    height: "auto",
    maxWidth: "900px",
  },
  abouttext: {
    fontSize: "16px",
  },
}));

function About() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>About</title>
      </Helmet>
      <Box mt={12}>
        <Grid container>
          <Grid
            item
            xs={false}
            sm={6}
            md={6}
            component={Paper}
            elevation={3}
            square
          >
            <Box p={4}>
              <h1>About us</h1>
              <h2>
                OfnoParking - Find parking for your motorcycle easily and
                quickly.
              </h2>
              <p className={classes.abouttext}>
                Many municipalities have begun enforcing illegal parking of
                two-wheeled vehicles and at the same time, began to provide
                dedicated parking lots where parking is allowed legally. out of
                this need we set up OfnoParking - fast and efficient detection
                of two-wheeled parking spots. before use, it is recommended to
                review the{" "}
                <Link to="/termsandprivacy">
                  terms of use and privacy policy
                </Link>
                .
                <br />
                this website is a non-profit social enterprise. If you need to
                contact us on any subject,{" "}
                <Link to="/contactus">you are welcome</Link> :)
              </p>
            </Box>
          </Grid>

          {/* <Hidden only="xs"> */}
          <Grid item xs={12} sm={6} md={6}>
            <Box p={4}>
              <img
                src={home_main_img}
                alt="ofno_about_img"
                className={classes.aboutimg}
                loading="lazy"
              />
            </Box>
          </Grid>
          {/* </Hidden> */}
        </Grid>
      </Box>
    </Container>
  );
}
export default About;
