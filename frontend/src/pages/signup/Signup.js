import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavLink } from "react-router-dom";
import styles from "../../styles/signup/style.module.css";
import "../../styles/signup/signup.css";
import { isAuthenticated, signup, verify } from "../../helper/AuthApiCalls/index";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/base/header";
import Footer from "../../components/base/footer";
const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    error: "",
    success: false,
    showPassword: false,
  });
  const [OTP, setOTP] = useState("");
  const [success2, setSuccess2] = useState(false);
  var { firstName, lastName, email, password, role, error, success } = values;
  const [error2, setError2] = useState("");
  const handleChange = (prop) => (event) => {
    if (prop === "role") {
      if (role === "advisor") {
        setValues({ ...values, role: "user" });
      } else {
        setValues({ ...values, role: "advisor" });
      }
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };
  console.log(values, "values");
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    console.log(values);
    email = email.toLowerCase();

    signup({
      name: firstName + lastName,
      email: email,
      password: password,
      role: role,
    })
      .then((data) => {
        console.log(data, "signup");
        if (data.status === "fail") {
          setError2(data.message);
          setSuccess2(false);
        } else {
          setSuccess2(true);
        }
      })
      .catch(console.log("Error in signup"));
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  let navigate = useNavigate();
  const onOtpSubmit = (e) => {
    e.preventDefault();
    email = email.toLocaleLowerCase();

    const sendBody = {
      email: email,
      otp: OTP,
    };
    verify(sendBody).then((data) => {
      console.log(data, "ver");
      if (data.status === "fail") {
        setError2(data.message);
      } else {
        localStorage.setItem("_access_token", JSON.stringify(data.token));
        if (role === "user") {
          navigate("/");
        } else {
          navigate("/professionalonboarding");
        }
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const otpDesk = () => {
    return (
      <div className={styles.maindiv}>
        <div className={styles.mainlog}>
          <span>Sign In Using OTP</span>
        </div>
        <div className={styles.someshit}>
          <span>Enter the 6-digit OTP sent on your registered email address</span>
        </div>
        <div className={styles.in}>
          <div className={styles.someshit2}>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              className="heyHEllo"
              OTPLength={6}
              otpType="number"
              disabled={false}
            />
          </div>
        </div>
        {error2 && <div className={styles.error}>*{error2}</div>}
        <div className={styles.button1}>
          <button onClick={onOtpSubmit}>Sign In</button>
        </div>
      </div>
    );
  };

  const SignupPage = () => {
    return (
      <div className={styles.signup}>
        <div className={styles.signupup}>
          <div className={styles.heading}>
            <span>Welcome to Calm-A-Sutra</span>
          </div>
          <div className={styles.upcontent}>
            <span className={styles.text}>Create your account</span>
            <span className={styles.link}>
              Already have an account?
              <NavLink to="/signin"> Log in </NavLink>
              instead.
            </span>
          </div>
        </div>
        <div className={styles.signupdown}>
          {!success2 ? (
            <div className={styles.downcontent}>
              <div className={styles.name}>
                <div className={styles.nameinput}>
                  <TextField
                    label="First Name"
                    id="outlined-size-small"
                    size="small"
                    value={firstName}
                    onChange={handleChange("firstName")}
                  />
                </div>
                <div className={styles.nameinput}>
                  <TextField
                    label="Last Name"
                    id="outlined-size-small"
                    size="small"
                    value={lastName}
                    onChange={handleChange("lastName")}
                  />
                </div>
              </div>
              <div className={styles.input}>
                <TextField
                  label="Email"
                  type="email"
                  id="outlined-size-small"
                  size="small"
                  value={email}
                  onChange={handleChange("email")}
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

                <div>
                  <label htmlFor="role">Join us as an Psychiatrist</label>
                  <input
                    type="checkbox"
                    name="role"
                    checked={role === "advisor" ? true : false}
                    onChange={handleChange("role")}
                  />
                </div>
              </div>

              <div className={styles.button}>
                <button onClick={onSubmit}>Sign up</button>
              </div>
            </div>
          ) : (
            <div>{otpDesk()}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      {SignupPage()}
      <Footer />
    </div>
  );
};
export default Signup;
