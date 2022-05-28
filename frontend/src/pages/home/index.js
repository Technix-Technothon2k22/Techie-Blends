//home
import React, { useEffect, useState } from "react";
import styles from "../../styles/home/style.module.css";
import wallpaper from "../../assets/images/walpaper.mp4";
import coffeeleft from "../../assets/images/coffeeleft.png";
import coffeeright from "../../assets/images/coffeeright.png";
import { datas } from "./testdata.js";
import BlogBox from "../../components/blog/blogbox";
import Header from "../../components/base/header";
import storyleft from "../../assets/images/storyleft.png";
import storyright from "../../assets/images/storyright.png";
import Carousel from "nuka-carousel";
import Footer from "../../components/base/footer";
import { getAllBlogs } from "../../helper/BlogApiCalls";

const Home = () => {
  const [blog, setBlog] = useState();
  function fetchAllBlogs() {
    getAllBlogs().then((data) => {
      if (data.error) {
        console.log(data.message);
      } else {
        console.log(data, "ll");
        setBlog(data);
      }
    });
  }

  console.log(blog);
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  console.log(blog);
  const HomeScreen = () => {
    return (
      <div>
        <Header active={"home"} />
        <div className={styles.firstsection}>
          <div className={styles.banner_sec}>
            <div className={styles.video_sec}>
              <video autoPlay muted loop>
                <source src={wallpaper}></source>
              </video>
            </div>
            <div className={styles.container}>
              <div className={styles.textbox}>
                <h4>Welcome to HealingYou</h4>
                <h1>
                  Just <span>Breathe</span>
                  <br /> And <span>Relax...</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div className={styles.quicksearch_section}>
            <h3>How are you feeling today</h3>
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
            </ul>
          </div>
        </section>
        <div className={styles.section_curated}>
          <div className={styles.maincontainer}>
            <div className={styles.coffeeicons}>
              <img src={coffeeleft} alt="" />
              <img src={coffeeright} alt="" />
            </div>
            <div className={styles.titlewrapper}>
              <h3>Curated and Brewed Over Coffee!</h3>
              <div className={styles.textwidget}>
                <p>
                  Immerse yourself in our posts and be swept away to a world that is separate from
                  yours.
                  <br />
                  Thus, unraveling from all the dilemmas, stress & problems you might have.
                </p>
              </div>
            </div>
            <div className={styles.bloggrid}>
              {blog &&
                blog.map((data, index) => {
                  if (index >= 6) {
                    return null;
                  }
                  return (
                    <div key={index} className={styles.blogwrapper}>
                      <BlogBox blog={data} />
                    </div>
                  );
                })}
            </div>
            <div className={styles.readmore}>
              <a href="/blog/blog">View All</a>
            </div>
          </div>
        </div>
        <div className={styles.sec_always}>
          <div className={styles.container}>
            <div className={styles.sec_icon}>
              <img alt="" src={storyleft} />
              <img alt="" src={storyright} />
            </div>
            <div className={styles.titlewrapper}>
              <h3 class="heading-title">Words By Others(Stories)</h3>
              <div className={styles.textwidget}>
                <p>
                  Sharing is caring! Encourage and inspire others with your stories. Your
                  experiences can give them the
                  <br />
                  courage to face their fears, overcome their struggles, and come out stronger.
                </p>
              </div>
            </div>
            <div className={styles.slider}>
              <Carousel
                slidesToShow={2}
                cellSpacing={30}
                autoplay={true}
                wrapAround={true}
                pauseOnHover={true}
                renderBottomCenterControls={false}
              >
                {blog &&
                  blog.map((product, key) => {
                    return <BlogBox blog={product} />;
                  })}
              </Carousel>
            </div>
          </div>
        </div>
        <div className={styles.sec_here}>
          <div className={styles.container}>
            <div className={styles.vector_sec}>
              <img
                loading="lazy"
                className={styles.vector_1}
                src="https://www.calmsage.com/wp-content/themes/calmsage/assets/images-new/vector-1.png"
                alt="vectorimg"
              />
              <img
                loading="lazy"
                className={styles.vector_2}
                src="https://www.calmsage.com/wp-content/themes/calmsage/assets/images-new/vector-2.png"
                alt="vectorimg"
              />
              <img
                loading="lazy"
                className={styles.vector_3}
                src="https://www.calmsage.com/wp-content/themes/calmsage/assets/images-new/vector-3.png"
                alt="vectorimg"
              />
              <img
                loading="lazy"
                className={styles.vector_4}
                src="https://www.calmsage.com/wp-content/themes/calmsage/assets/images-new/vector-4.png"
                alt="vectorimg"
              />
              <img
                loading="lazy"
                className={styles.vector_5}
                src="https://www.calmsage.com/wp-content/themes/calmsage/assets/images-new/vector-5.png"
                alt="vectorimg"
              />
            </div>
            <div className={styles.section_title_wraper}>
              <h3 className={styles.heading_title}> We Are Here For You! </h3>
              <p>
                {" "}
                A self-improvement project with a focus on Personal Productivity, Motivation & Self
                Education. The goal is to create an environment of mutual support, where people can
                meet from all across the globe to solve problems related to anxiety, depression,
                negative thinking, stress, moodiness & <br /> other mental illness.{" "}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return <div>{HomeScreen()}</div>;
};

export default Home;
