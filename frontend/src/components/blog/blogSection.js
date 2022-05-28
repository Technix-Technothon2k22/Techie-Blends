import React, { useState, useEffect } from "react";
import Header from "../base/header";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import styles from "../../styles/blog/style.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";
import {
  getBlogById,
  createFeedback,
  getFeedById,
  getAllBlogs,
} from "../../helper/BlogApiCalls/index";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../../helper/AuthApiCalls/index";
const BlogSection = () => {
  const [blogs, setBlogs] = useState();
  const [reveiws, setReveiws] = useState([]);

  const [isBusy, setBusy] = useState(true);
  const [feedback, setFeedback] = useState("");

  const [blog, setBlog] = useState([]);

  const param = useParams();

  function fetchBlogs() {
    getBlogById(param.id).then((data) => {
      if (data.status === "fail") {
        console.log(data.message);
      } else {
        setBlogs(data);
        fetchFeeds();
      }
    });
  }
  function fetchFeeds() {
    getFeedById(param.id).then((data) => {
      if (data.error) {
        console.log(data.message);
      } else {
        setReveiws(data);
        fetchAllBlogs();
      }
    });
  }

  function fetchAllBlogs() {
    getAllBlogs().then((data) => {
      if (data.error) {
        console.log(data.message);
      } else {
        setBlog(data);
        setBusy(false);
      }
    });
  }
  console.log(isAuthenticated());
  function onSubmitFeed() {
    let info = {
      userId: isAuthenticated().id,
      blogId: param.id,
      feedback,
    };

    createFeedback(info).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        window.location.reload(false);
      }
    });
  }

  function submitLike(id, hey) {
    const config = {
      method: "POST",
      url: `http://localhost:5000/api/v1/blog/operations/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("_access_token"))}`,
      },
      data: JSON.stringify({
        operation: hey,
        uid: isAuthenticated().id,
      }),
    };

    console.log(isAuthenticated(), "auth");

    axios(config).then((response) => {
      console.log(response, "ddd");
      window.location.reload(false);
    });
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const blogTitle = blogs ? blogs.title : "Failed to load";
  const blogDate = blogs ? blogs.date : "Failed to load";
  const blogImage = blogs ? blogs.image[0].url : "some ";
  const blogDes = blogs ? blogs.description : "Failed to load";

  return (
    <div>
      <Header />
      {isBusy ? (
        <div>hey</div>
      ) : (
        <main className={styles.mainContainer}>
          <section className={styles.first}>
            <div>
              <span className={styles.cats}>{blogs.category}</span>
              <h1 className={styles.heading1}>{blogTitle}</h1>
              <div className={styles.authdetails}>
                Update on Last <span>{blogDate}</span>: Written By
                <span>{blogs.advisor.name}</span>
              </div>
            </div>
            <main>
              <div className={styles.blogshit}>
                <img src={blogImage} alt="blogimage" />
              </div>
              <div className={styles.content}>
                <p>{blogDes}</p>
              </div>
              <div className={styles.shareContainer}>
                <span className={styles.share}>
                  <span style={{ color: "gray" }}>Share</span> : &nbsp; &nbsp;
                  <div className={styles.icons}>
                    <FacebookIcon style={{ cursor: "pointer", width: "25px" }} />
                    <InstagramIcon style={{ cursor: "pointer", width: "25px" }} />
                  </div>
                </span>
                <span className={styles.share}>
                  <span style={{ color: "gray" }}>Quick Reaction : </span> &nbsp; &nbsp;
                  <div className={styles.likeContainer}>
                    <span>{blogs.likes.length}</span>
                    <button onClick={() => submitLike(param.id, "like")}>
                      <MoodIcon />
                    </button>
                    <span>{blogs.dislikes.length}</span>
                    <button onClick={() => submitLike(param.id, "dislike")}>
                      <SentimentVeryDissatisfiedIcon />
                    </button>
                  </div>
                </span>
              </div>

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

              <div className={styles.commentContainer}>
                <h3>Leave a Review</h3>
                <div className={styles.comment}>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    name="comment"
                    id=""
                    cols="30"
                    rows="10"
                    className={styles.textarea}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  ></textarea>
                </div>
                ;
                {!isAuthenticated() ? (
                  <button className={styles.cmtBtn} disabled={true}>
                    Login to give comment
                  </button>
                ) : (
                  <button className={styles.cmtBtn} onClick={onSubmitFeed}>
                    Post Comment
                  </button>
                )}
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

            <div className={styles.reviewCont}>
              <h4 className={styles.read}>Reviews</h4>
              <div className={styles.review}>
                {console.log(reveiws)}
                {reveiws.map((data) => (
                  <div className={styles.smallC}>
                    <img
                      src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      alt=""
                      className={styles.userdp}
                    />
                    <span>
                      <h4>{data.comment}</h4>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default BlogSection;
