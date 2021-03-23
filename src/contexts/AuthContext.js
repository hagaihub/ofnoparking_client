import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config.js";

export const authContext = React.createContext({});

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authUser, setauthUser] = useState({});

  useEffect(() => {
    async function checkAuth() {
      await axios
        .post(`${config.api_url}/accounts/refresh-token`, null, {
          withCredentials: true,
        })
        .then(function (response) {
          //set global user state
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwtToken;
          setIsAuthenticated(true);
          setauthUser(response.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          setIsAuthenticated(false);
          setauthUser({});
          setIsLoading(false);
        });
    }

    checkAuth();
    SetAxiosInterceptorsResponse();
  }, []);

  useEffect(() => {
    //listener for login or logout from others tabs
    window.addEventListener("storage", async (event) => {
      if (event.key === "auth_out" && isAuthenticated) {
        delete axios.defaults.headers.common["Authorization"];
        setIsAuthenticated(false);
        setauthUser({});
      }
      //else if (event.key === "auth_in") {
      // axios.defaults.headers.common["Authorization"] =
      //   "Bearer " + res_obj.jwtToken;
      // setIsAuthenticated(true);
      // setauthUser(res_obj);
      //}
    });
  }, [isAuthenticated]);

  function SetAxiosInterceptorsResponse() {
    //Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        const originalRequest = error.config;

        if (
          (error.response.status === 401 || error.response.status === 400) &&
          originalRequest.url === `${config.api_url}/accounts/refresh-token`
        ) {
          console.log("axios log out");
          delete axios.defaults.headers.common["Authorization"];
          setIsAuthenticated(false);
          setauthUser({});

          return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          return axios
            .post(`${config.api_url}/accounts/refresh-token`, null, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.status === 200) {
                originalRequest.headers["Authorization"] =
                  "Bearer " + res.data.jwtToken;
                axios.defaults.headers.common["Authorization"] =
                  "Bearer " + res.data.jwtToken;
                setIsAuthenticated(true);
                setauthUser(res.data);
                setIsLoading(false);

                return axios(originalRequest);
              }
            });
        }

        return Promise.reject(error);
      }
    );
  }

  async function login(res_obj) {
    //set global user state
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + res_obj.jwtToken;
    setIsAuthenticated(true);
    setauthUser(res_obj);
  }

  async function logout() {
    await axios
      .post(`${config.api_url}/accounts/revoke-token`, null, {
        withCredentials: true,
      })
      .then(function (response) {
        delete axios.defaults.headers.common["Authorization"];
        setIsAuthenticated(false);
        setauthUser({});
        // fire an event to log out from other open tabs
        window.localStorage.setItem("auth_out", new Date().toISOString());
      })
      .catch(function (error) {
        console.log(error);
        delete axios.defaults.headers.common["Authorization"];
        setIsAuthenticated(false);
        setauthUser({});
        // fire an event to log out from other open tabs
        window.localStorage.setItem("auth_out", new Date().toISOString());
      });
  }

  return (
    <authContext.Provider
      value={{ isAuthenticated, isLoading, authUser, login, logout }}
    >
      {children}
    </authContext.Provider>
  );
}
