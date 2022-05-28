import React, { useState, useEffect } from "react";
import Header from "../base/header";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import styles from "../../styles/blog/style.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import { getPodById, getAllPods } from "../../helper/PodApiCalls/index";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../../helper/AuthApiCalls/index";
const PodSection = ({ match }) => {
  const [blogs, setBlogs] = useState();

  const [isBusy, setBusy] = useState(true);

  const [blog, setBlog] = useState([]);

  function fetchAllBlogs() {
    getAllPods().then((data) => {
      if (data.error) {
        console.log(data.message);
      } else {
        setBlog(data.data);
      }
    });
  }

  const param = useParams();

  function fetchBlogs() {
    getPodById(param.id).then((data) => {
      if (data.status === "fail") {
        console.log(data.message);
      } else {
        setBlogs(data);
        setBusy(false);
      }
    });
  }

  useEffect(() => {
    fetchBlogs();

    fetchAllBlogs();
  }, []);

  const blogTitle = blogs ? blogs.title : "Failed to load";
  const blogDate = blogs ? blogs.date : "Failed to load";
  const blogImage = blogs ? blogs.image[0].url : "some ";
  const blogDes = blogs ? blogs.description : "Failed to load";
  console.log(blogs, "blodfhbdhfb");
  return (
    <div>
      <Header />
      {isBusy ? (
        <div>hey</div>
      ) : (
        <main className={styles.mainContainer}>
          <section className={styles.first}>
            <div>
              <span className={styles.cats}>Therapy</span>
              <h1 className={styles.heading1}>{blogTitle}</h1>
              <div className={styles.authdetails}>
                Update on Last <span>{blogDate}</span>: Podcast By
                <span>{blogs.advisor.name}</span>
              </div>
            </div>
            <main>
              <div>
                <img src={blogImage} alt="blogimage" />
              </div>
              <div className={styles.content}>
                <p>{blogDes}</p>
              </div>
              <div className={styles.shareContainer}>
                <span className={styles.share}>
                  <span style={{ color: "gray" }}>Share</span> : &nbsp; &nbsp;
                  <div className={styles.icons}>
                    <a href={blogs.link} target="_blank">
                      {blogs.link}
                    </a>
                  </div>
                </span>
              </div>

              {/* about author */}
              <div className={styles.authContainer}>
                <h3>About the author</h3>
                <div>
                  <div className={styles.dpcontainer}>
                    <img
                      src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      alt=""
                      className={styles.dp}
                    />
                    <p>
                      <h3 className={styles.authboi}>{blogs.advisor.name}</h3>I am an English
                      literature (major) and psychology (minor) graduate from St. Bede’s College,
                      Shimla. Postgraduate in Clinical psychology from IIS University, Jaipur. She
                      has published a Research paper on Music therapy in the military population and
                      Workplace stress in a national seminar conducted by Fortis hospital (gurugram)
                      and international seminar conducted by St. Bede’s College, Shimla,
                      Respectively. Authored a dissertation work on ‘effect of social media
                      addiction on the mental and physical well-being in adolescents’ Currently
                      working at calm sage as a writer
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </section>
          <section className={styles.right}>
            <div className={styles.latest}>
              <h4 className={styles.read}>LATEST READ</h4>
              {blog.reverse().map((data) => (
                <div className={styles.smallC}>
                  <img src={data.image[0].url} alt="" className={styles.dtimg} />
                  <span>
                    <h4>{data.title}</h4>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default PodSection;
