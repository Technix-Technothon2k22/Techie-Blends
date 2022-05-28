import React, { useState, useEffect } from "react";
import Header from "../../components/base/header";
import PodCard from "../../components/podcasts/podContainer";
import styles from "../../styles/blog/style.module.css";
import { getAllPods } from "../../helper/PodApiCalls/index";
const ShowPods = () => {
  const [blogs, setBlogs] = useState([]);

  function fetchBlogs() {
    getAllPods().then((data) => {
      if (data.status === "fail") {
        console.log(data.message);
      } else {
        setBlogs(data.data);
      }
    });
  }
  console.log(blogs, "bloging");
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <main>
      <Header />
      <section className={styles.topdiv}>
        <div>
          {" "}
          <h1 className={styles.heading}>Podcasts</h1>
          <p className={styles.tagtext}>
            just forget ur problems for a bit while listening to this podcast
          </p>
        </div>
        <section>
          <div className={styles.quicksearch_section}>
            <ul>
              <li>
                <a href="/">Anxiety</a>
              </li>
              <li>
                <a href="/">Stress</a>
              </li>
              <li>
                <a href="/">Activities</a>
              </li>
              <li>
                <a href="/">Depression</a>
              </li>
              <li>
                <a href="/">Mood Swings</a>
              </li>
              <li>
                <a href="/">Relationships</a>
              </li>
              <li>
                <a href="/">Self-Esteem</a>
              </li>
            </ul>
          </div>
        </section>

        <div className={styles.blogGrid}>
          {blogs.map((data, index) => {
            return (
              <div key={index} className={styles.blogwrapper}>
                <PodCard blog={data} />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ShowPods;
