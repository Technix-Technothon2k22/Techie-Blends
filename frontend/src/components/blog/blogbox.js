import React from "react";
import styles from "../../styles/blogbox/style.module.css";

const BlogBox = ({ blog }) => {
  console.log(blog);
  return (
    <div className={styles.blogbox}>
      <div>
        <div className={styles.imageblock}>
          <a href={`/blog/${blog._id}`}>
            <img src={blog.image[0].url} alt="blogimage" />
          </a>
        </div>
        <div className={styles.postimage}>
          <div className={styles.postmeta}>
            <p>{blog.createdAt}</p>
          </div>
          <div className={styles.postcontent}>
            <div className={styles.title}>
              <h4>
                <a href={`/blog/${blog._id}`}>{blog.title}</a>
              </h4>
            </div>
            <div className={styles.button}>
              <a href={`/blog/${blog._id}`}>Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogBox;
