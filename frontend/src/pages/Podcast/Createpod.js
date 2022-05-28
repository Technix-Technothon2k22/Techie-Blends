import React, { useState } from "react";
import styles from "../../styles/blog/style.module.css";

import TextField from "@mui/material/TextField";
import { CreatePodCast } from "../../helper/BlogApiCalls/index.js";
import { isAuthenticated } from "../../helper/AuthApiCalls";
const CreatePod = () => {
  const [image, setImage] = useState({
    profileimage: "",
  });
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    link: "",
  });

  var { title, description, link } = blog;

  const handleChange2 = (name) => (event) => {
    event.preventDefault();

    let value = event.target.value;
    setBlog({
      ...blog,
      [name]: value,
    });
  };
  console.log(image.profileimage[0], "image");

  const onProfileSubmit = () => {
    let formData = new FormData();
    formData.append("image", image.profileimage[0]);
    formData.append("title", blog.title);

    formData.append("advisor", "6290b42c7105f951e4eafbe5");
    formData.append("link", blog.link);

    CreatePodCast(formData).then((data) => {
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

  return (
    <div>
      <div className={styles.create}>
        <div className={styles.sec1}>
          <div className={styles.image}>
            <img src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/03/Guide-to-Podcast-Art-Images-Featured.jpg" />
          </div>
          <div className={styles.text1}>
            <span>Let People Listen to Your PodCast</span>
          </div>
        </div>
        <div className={styles.sec2}>
          <div className={styles.head}>
            <span>
              SHARE YOUR EXPERIENCES AND KNOWLEDGE FOR WELFARE OF PEOPLE THROUGH
              YOUR PODCAST
            </span>
          </div>
          <div className={styles.head2}>
            <span>
              It is possible to overcome the mental health problems, all it
              takes is a little willpower and some help. Share your stories of
              recovery & inspire people in overcoming their struggles of various
              kinds.
            </span>
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
                label="link"
                id="outlined-size-small"
                size="small"
                onChange={handleChange2("link")}
                value={blog.link}
              />
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
            <div className={styles.blog3}>
              <button onClick={onProfileSubmit}>Submit the Podcast</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePod;
