import React, { useEffect, useState } from "react";
import styles from "../../styles/blog/style.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { createBlog } from "../../helper/BlogApiCalls/index.js";
import { isAuthenticated, isVerfied } from "../../helper/AuthApiCalls";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { categories } from "../../helper/Category/category";
const Createblog = () => {
  const [age, setAge] = useState("");
  const [image, setImage] = useState({
    profileimage: "",
  });
  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  var { title, description, category } = blog;

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChange2 = (name) => (event) => {
    event.preventDefault();

    let value = event.target.value;
    setBlog({
      ...blog,
      [name]: value,
    });
  };
  console.log(isAuthenticated(), "image");

  const onProfileSubmit = () => {
    const date = new Date();

    let formData = new FormData();
    formData.append("image", image.profileimage[0]);
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append("advisor", isAuthenticated());
    formData.append("category", age);
    formData.append("date", date.toString().substring(0, 15));
    formData.append(
      "type",
      isAuthenticated().role === "advisor" ? "blog" : "story"
    );

    createBlog(formData).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        window.location.reload(false);
        console.log("hey bitch");
      }
    });
  };

  const handleProfileImage = (name) => (e) => {
    setImage({ ...image, [name]: e.target.files });
  };

  useEffect(() => {
    const config = {
      method: "GET",
      url: "http://localhost:5000/api/v1/user/verified",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("_access_token")
        )}`,
      },
    };

    axios(config).then((response) => {
      console.log(response.data, "use");
      if (response.data.status === "fail") {
        navigate("/wait");
      }
    });
  }, []);

  return (
    <div>
      <div className={styles.create}>
        <div className={styles.sec1}>
          <div className={styles.image}>
            <img src="https://www.calmsage.com/wp-content/themes/calmsage/assets/images/write-a-story.jpg" />
          </div>
          <div className={styles.text1}>
            <span>Write A Blog</span>
          </div>
        </div>
        <div className={styles.sec2}>
          <div className={styles.head}>
            {isAuthenticated().role === "advisor" ? (
              <span>Blogs</span>
            ) : (
              <span>SHARE YOUR PERSONAL STORIES OF TRIUMPH</span>
            )}
          </div>
          <div className={styles.head2}>
            {isAuthenticated().role === "advisor" ? (
              <span>
                With our well-researched and educational posts explore solutions
                to your various mental, emotional, spiritual health problems,
                and much more!
              </span>
            ) : (
              <span>
                {" "}
                It is possible to overcome the mental health problems, all it
                takes is a little willpower and some help. Share your stories of
                recovery & inspire people in overcoming their struggles of
                various kinds.
              </span>
            )}
            <span></span>
          </div>
        </div>
        <div className={styles.sec3}>
          <div className={styles.writebox}>
            <div className={styles.blog1}>
              <TextField
                label="title"
                id="outlined-size-small"
                size="small"
                onChange={handleChange2("title")}
                value={blog.title}
              />
            </div>
            <div className={styles.blog1}>
              <TextField
                label="description"
                id="outlined-size-small"
                size="small"
                onChange={handleChange2("description")}
                value={blog.description}
                multiline
                rows={4}
              />
            </div>
            <div className={styles.blog3}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Category"
                    onChange={handleChange}
                  >
                    {categories.map((hey, index) => {
                      return (
                        <MenuItem value={hey}>{hey.toUpperCase()}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className={styles.in1}>
              <div className={styles.inp}>
                <input
                  type="file"
                  accept="image/*"
                  name="profileimage"
                  style={{ paddingLeft: "10px" }}
                  placeholder="Lorem Ipsum"
                  readOnly
                  onChange={handleProfileImage("profileimage")}
                ></input>
              </div>
            </div>
            {isAuthenticated().role === "advisor" ? (
              <div className={styles.blog3}>
                <button onClick={onProfileSubmit}>Submit the blog</button>
              </div>
            ) : (
              <div className={styles.blog3}>
                <button onClick={onProfileSubmit}>Submit the story</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Createblog;
