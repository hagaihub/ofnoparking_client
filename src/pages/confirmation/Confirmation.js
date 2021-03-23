import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import config from "../../config.js";

function Confirmation({ match }) {
  const { isAuthenticated } = useContext(authContext);
  const [isloading, setisloading] = useState(false);
  const [isUserConfirmation, setisUserConfirmation] = useState(false);

  useEffect(() => {
    setisloading(true);
    console.log(match.params.token);
    axios
      .get(
        `${config.api_url}/accounts/confirmation/${match.params.token}`,
        null
      )
      .then(function (response) {
        setisUserConfirmation(true);
        setisloading(false);
      })
      .catch(function (error) {
        setisUserConfirmation(false);
        setisloading(false);
      });
  }, [match.params.token]);

  return (
    <>
      <h1>Confirmation</h1>
      {isAuthenticated && <Redirect to="/" />}
      {isloading && "loading..."}
      {isUserConfirmation && (
        <div>
          <p>
            תהליך הרישום הושלם בהצלחה. עכשיו רק נשאר{" "}
            <Link to="/signin">להתחבר</Link>
          </p>
        </div>
      )}
      {!isUserConfirmation && !isloading && (
        <div>
          <p>שגיאה</p>
        </div>
      )}
    </>
  );
}
export default Confirmation;
