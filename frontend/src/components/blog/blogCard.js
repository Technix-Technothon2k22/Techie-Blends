import React from "react";
import styles from "../../styles/blogbox/style.module.css";

const BlogCard = ({ blog }) => {
  console.log(blog, "blogcard");
  return (
    <div className={styles.blogBox}>
      <div>
        <div className={styles.imgBlock}>
          <a href={blog.link}>
            <img src={blog.image[0].url} alt="blogimage" className={styles.img} />
          </a>
        </div>
        <div className={styles.postContainer}>
          <div className={styles.postmeta}>
            <p>{blog.date}</p>
          </div>
          <div className={styles.postContent}>
            <div className={styles.title}>
              <h4>
                <a href={blog.link}>{blog.title}</a>
              </h4>
            </div>
            <div>
              <p>It has never been easy to accept all your emotions, especially emotions...</p>
            </div>
            <div className={styles.button}>
              <a href={`/blogs/${blog._id}`}>Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
