import React, { useState, useEffect } from "react";
import Header from "../../components/base/header";
import BlogCard from "../../components/blog/blogCard";
import styles from "../../styles/blog/style.module.css";

import { getAllBlogs } from "../../helper/BlogApiCalls/index";
import { categories } from "../../helper/Category/category";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [] },
  });
  const [busy, setBusy] = useState(true);
  const handleFilters = (name, filterBy) => {
    var index = -1;
    const newFilters = { ...myFilters };

    if (newFilters.filters[filterBy].includes(name)) {
      index = newFilters.filters[filterBy].indexOf(name);
    }
    if (index !== -1) {
      newFilters.filters[filterBy].splice(index, 1);
    } else {
      newFilters.filters[filterBy].push(name);
    }

    fetchBlogs(myFilters.filters);
    setMyFilters(newFilters);
  };

  function fetchBlogs(filters) {
    getAllBlogs(filters).then((data) => {
      console.log(data);
      if (data.status === "fail") {
        console.log(data.message);
      } else {
        setBlogs(data);
        setBusy(false);
      }
    });
  }

  function selected(name) {
    if (myFilters.filters.category.includes(name)) {
      return { backgroundColor: "#d56603" };
    } else {
      return;
    }
  }

  useEffect(() => {
    fetchBlogs(myFilters.filters);
  }, []);

  return (
    <main>
      <Header active={"blog"} />
      {busy ? (
        <>Loading</>
      ) : (
        <section className={styles.topdiv}>
          <div>
            {" "}
            <h1 className={styles.heading}>Blogs</h1>
            <p className={styles.tagtext}>
              With our well-researched and educational posts explore solutions
              to your various mental, emotional, spiritual health problems, and
              much more!
            </p>
          </div>
          <section>
            <div className={styles.quicksearch_section}>
              <ul>
                {categories.map((category, inde) => {
                  return (
                    <li
                      onClick={() => handleFilters(category, "category")}
                      key={inde}
                    >
                      <button style={selected(category)}>{category}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <div className={styles.blogGrid}>
            {blogs.length > 0 ? (
              <>
                {blogs.map((data, index) => {
                  return (
                    <div key={index} className={styles.blogwrapper}>
                      <BlogCard blog={data} />
                    </div>
                  );
                })}
              </>
            ) : (
              <>No Blogs to show</>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Blog;
