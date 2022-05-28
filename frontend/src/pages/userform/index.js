import React, { useState } from "react";
import styles from "../../styles/signup/style.module.css";
import "../../styles/signup/signup.css";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { editDetails, isAuthenticated } from "../../helper/AuthApiCalls";
import Success from "../../components/success/submitted";

const UserForm = () => {
  const [values, setValues] = useState({
    age: "",
    gender: "",
    error: "",
    success: false,
    state: "",
    district: "",
  });

  const [categories, setCategories] = useState([]);
  const [healthIssues, setHealthIssues] = useState([]);
  const [error2, setError2] = useState(null);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleHealthChange = (event) => {
    const {
      target: { value },
    } = event;
    setHealthIssues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log(isAuthenticated());

  const issues = ["Stress", "Anxiety", "Depression", "Self-esteem", "Relationships", "Mood Swings"];
  const cats = [
    " mentalhealth",
    "therapy",
    "wellnessguide",
    "selfcare",
    "motivation",
    "happiness",
    "depression",
    "selfhelp",
    "communication",
    "relationship",
  ];

  var { age, gender, error, success, state, district } = values;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function onSubmit() {
    const sendData = {
      age: age,
      gender: gender,
      state: state,
      district: district,
      healthIssues: healthIssues,
      categories: categories,
    };

    console.log(sendData, "snd");

    if (categories.length === 0) {
      setError2("Please select atleast one category");
    }

    editDetails(sendData).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, success: true });
      }
    });
  }

  const UserFormPage = () => {
    return (
      <div className={styles.signup}>
        <div className={styles.signupup}>
          <div className={styles.heading}>
            <span>Welcome to HealingYou</span>
          </div>
          <div className={styles.upcontent}>
            <span className={styles.text}>Please fill in below details to get started</span>
            <span className={styles.link}>
              {error && <div className={styles.error}>*{error}</div>}
              {error2 && <div className={styles.error}>*{error2}</div>}
            </span>
          </div>
        </div>
        <div className={styles.signupdown}>
          {!success ? (
            <div className={styles.downcontent}>
              <TextField
                label="Age"
                id="outlined-size-small"
                size="small"
                value={age}
                onChange={handleChange("age")}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={gender}
                  label="Gender"
                  onChange={handleChange("gender")}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"others"}>Others</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="State"
                id="outlined-size-small"
                size="small"
                value={state}
                onChange={handleChange("state")}
              />
              <TextField
                label="District"
                id="outlined-size-small"
                size="small"
                value={district}
                onChange={handleChange("district")}
              />
              <FormControl sx={{ m: 1 }}>
                <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={categories}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label="Category" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {cats.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={categories.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1 }}>
                <InputLabel id="demo-multiple-checkbox-label">Health-Issues</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={healthIssues}
                  onChange={handleHealthChange}
                  input={<OutlinedInput label="Health Issues" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {issues.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={healthIssues.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className={styles.button}>
                <button onClick={onSubmit}>Submit</button>
              </div>
            </div>
          ) : (
            <div>
              <Success type="User Details" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return <div>{UserFormPage()}</div>;
};

export default UserForm;
