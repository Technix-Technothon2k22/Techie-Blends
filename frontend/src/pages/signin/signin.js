import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Redirect } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "../../styles/signin/style.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../helper/AuthApiCalls";
import jwtDecode from "jwt-decode";
import Header from "../../components/base/header";

const Signin = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [error1, setError] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
    forgotEmail: "",
    error: "",
    success: false,
    showPassword: false,
    didRedirect: false,
    loading: false,
  });

  const navigate = useNavigate();

  var { email, password, forgotEmail, error, success, didRedirect, loading } = values;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  //   const onSubmit = (event) => {
  //     event.preventDefault();
  //     setValues({ ...values, loading: true, error: false });
  //     email = email.toLowerCase();
  //     signin({ email, password }).then((data) => {
  //       if (data.error) {
  //         setValues({
  //           ...values,
  //           loading: false,
  //           error: data.error,
  //           success: false,
  //         });
  //       } else {
  //         authenticate(data, () => {
  //           console.log(data);
  //           setValues({
  //             ...values,
  //             didRedirect: true,
  //           });
  //         });
  //       }
  //     });
  //   };

  //   const performRedirect = () => {
  //     if (didRedirect) {
  //       return <Redirect to="/home" />;
  //     }
  //     if (isAuthenticated()) {
  //       return <Redirect to="/home" />;
  //     }
  //   };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const switchForm = () => {
    if (showLogin === true) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = () => {
    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: "http://localhost:5000/api/v1/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.status === "success") {
          localStorage.setItem("_access_token", JSON.stringify(response.data.token));
        }
        const user = jwtDecode(response.data.token);
        if (user.role === "user" && user.details) {
          navigate("/");
        } else if (user.role === "user" && !user.details) {
          navigate("/details");
        } else {
          if (response.data.sendadvisor.verified === "notfilled") {
            navigate("/professionalonboarding");
          } else if (response.data.sendadvisor.verified === "submitted") {
            navigate("/wait");
          } else if (response.data.sendadvisor.verified === "verified") {
            navigate("/");
          }
        }
      })
      .catch(function (error) {
        console.log(error, "login error");
        if (error.response.data.status === "fail") {
          setError(error.response.data.message);
        }
      });
  };

  const LoginPage = () => {
    return (
      <div className={styles.downcontent}>
        {error1 && <p className={styles.error}>{error1}</p>}
        <div className={styles.input}>
          <TextField
            label="Email"
            type="email"
            onChange={handleChange("email")}
            id="outlined-size-small"
            size="small"
          />
        </div>
        <div className={styles.input}>
          <TextField
            label="Password"
            id="outlined-size-small"
            size="small"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword && <Visibility />}
                    {!values.showPassword && <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={styles.button}>
          <button onClick={handleLogin}>
            {!loading && " Log in"}
            {loading && (
              <div className={styles.lds}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </button>
        </div>
      </div>
    );
  };

  const SigninPage = () => {
    return (
      <div className={styles.signin}>
        <div className={styles.signinup}>
          <div className={styles.heading}>
            <span>Welcome back to HealingYou</span>
          </div>
          <div className={styles.upcontent}>
            <span className={styles.text}>Log In</span>
            <span className={styles.link}>
              Don't have an account?<NavLink to="/signup"> Sign up</NavLink> instead.
            </span>
          </div>
        </div>
        <div className={styles.signindown}>{showLogin && LoginPage()}</div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      {SigninPage()}
      {/* {performRedirect()} */}
    </div>
  );
};

export default Signin;
