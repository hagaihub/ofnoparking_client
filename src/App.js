import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home.js";
import About from "./pages//about/About.js";
import TermsAndPrivacy from "./pages/termsandprivacy/TermsAndPrivacy.js";
import NoMatch from "./pages/nomatch/NoMatch.js";
import ContactUs from "./pages/contactus/ContactUs.js";
import Favorites from "./pages/favorites/Favorites.js";
import ParkingNear from "./pages/parkingnear/ParkingNear.js";
import Signin from "./pages/signin/Signin.js";
import Signup from "./pages/signup/Signup.js";
import Confirmation from "./pages/confirmation/Confirmation.js";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword.js";
import Passwordreset from "./pages/passwordreset/Passwordreset.js";
import Myaccount from "./pages/myaccount/Myaccount.js";

import Navbar from "./_components/Navbar.js";
import PrivateRoute from "./_components/PrivateRoute.js";
//import Dashboard from "./admin/Dashboard.js";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useLocalStorage } from "./_helpers/useLocalStorage.js";
//import useMediaQuery from '@material-ui/core/useMediaQuery';
import AuthProvider from "./contexts/AuthContext.js";

function App() {
  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  //const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  //const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const [darkState, setDarkState] = useLocalStorage("theme", false);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkState ? "dark" : "light",
          // background: {
          //   default: darkState ? "#303030" : "linear-gradient(to right, tomato, cyan)",
          // },
          // primary: {
          //   main: "#ff4400",
          // },
          // secondary: {
          //   main: "#e3e3e3",
          // },
        },
        shape: {
          borderRadius: 8,
        },
        overrides: {
          MuiButton: {
            root: {
              borderRadius: 8,
            },
          },
        },
      }),
    [darkState]
  );

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <>
            <Navbar darkStateProp={darkState} setDarkStateProp={setDarkState} />
            <Box mt={7} component="main">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contactus" component={ContactUs} />
                <Route path="/termsandprivacy" component={TermsAndPrivacy} />               
                <Route path="/parkingnear" component={ParkingNear} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <Route path="/confirmation/:token" component={Confirmation} />
                <Route path="/forgotpassword" component={Forgotpassword} />
                <Route path="/passwordreset/:token" component={Passwordreset} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <PrivateRoute path="/myaccount" component={Myaccount} />
                {/* <Route path="/admin" component={Dashboard} /> */}
                <Route component={NoMatch} />
              </Switch>
            </Box>
          </>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
