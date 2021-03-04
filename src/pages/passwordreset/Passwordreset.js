import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";

function Passwordreset({ match }) {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL;

  const { isAuthenticated } = useContext(authContext);
  const [isloading, setisloading] = useState(false);
  const [usermsg, setUsermsg] = useState("");
  const [userPass, setUserPass] = useState("");
  const [isTokenOk, setisisTokenOk] = useState(false);
  const [IsPasswordChange, setIsPasswordChange] = useState(false);

  useEffect(() => {
    setisloading(true);
    //console.log(match.params.token);
    axios
      .get(`${apiUrl}/accounts/passwordreset/${match.params.token}`, null)
      .then(function (response) {
        setisisTokenOk(true);
        setisloading(false);
      })
      .catch(function (error) {
        setisisTokenOk(false);
        setisloading(false);
      });
  }, [apiUrl, match.params.token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);
    setUsermsg("");

    try {
      let dataObj = { pass: userPass };

      axios
        .post(`${apiUrl}/accounts/passwordreset/${match.params.token}`, dataObj, {
          withCredentials: true,
        })
        .then(function (response) {
          if (response.data.message) {
            setIsPasswordChange(true);
            setUsermsg("");
            setisloading(false);
            setUserPass("");
          } else {
            setisloading(false);
            setUsermsg("שם משתמש או סיסמה לא נכונים");
            setUserPass("");
          }
        })
        .catch(function (error) {
          setisloading(false);
          setUserPass("");
          if (error.response !== undefined && error.response.data.message) {
            setUsermsg(error.response.data.message);
          } else {
            setUsermsg("אופס..נתקלנו בבעיה. אנא נסה מאוחר יותר");
          }
        });
    } catch (err) {
      setUsermsg("אופס..נתקלנו בבעיה. אנא נסה מאוחר יותר");
    }
  };

  return (
    <>
    <Helmet>
        <title>Password reset</title>
      </Helmet>
      {isAuthenticated && <Redirect to="/" />}

      {isTokenOk && (
        <div>
          <h1>איפוס סיסמה</h1>
          <div>
            <div>בחר סיסמה חדשה:</div>
            <div>
              <form onSubmit={onSubmit}>
                <input
                  type="password"
                  name="userpass"
                  value={userPass}
                  placeholder="סיסמה"
                  minlength="6"
                  required
                  onChange={(e) => setUserPass(e.target.value)}
                />
                <input type="submit" value="שליחה" />
              </form>
            </div>
          </div>
        </div>
      )}

      {isloading && "loading..."}
      <div>{usermsg && usermsg}</div>

      {IsPasswordChange && !isloading && isTokenOk && (
        <div>
          <p>הסיסמה הוחלפה בהצלחה.</p>
          <br />
          <Link to="/signin">עכשיו רק נשאר להתחבר</Link>
        </div>
      )}

      {!isTokenOk && !isloading && !IsPasswordChange && (
        <div>
          <p>שגיאה</p>
          <br />
          <Link to="/">חזרה לעמוד הבית</Link>
        </div>
      )}
    </>
  );
}
export default Passwordreset;