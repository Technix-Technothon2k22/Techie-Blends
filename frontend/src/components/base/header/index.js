//header
import React from "react";
import logo from "../../../assets/images/logo.png";
import { isAuthenticated, signout } from "../../../helper/AuthApiCalls";
import styles from "../../../styles/header/style.module.css";

const Header = ({ active }) => {
  function returnColor(option) {
    console.log(option, active);
    if (option === active) {
      return { color: "#d56603" };
    } else {
      return;
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.topbar}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className={styles.navigation}>
        <div className={styles.grid}>
          <div className={styles.navigationoption}>
            <a style={returnColor("home")} href="/">
              Home
            </a>
          </div>
          <div className={styles.navigationoption}>
            <a style={returnColor("blog")} href="/blog/blog">
              Blogs
            </a>
          </div>
          <div className={styles.navigationoption}>
            <a style={returnColor("stories")} href="/blog/story">
              Stories
            </a>
          </div>
          <div className={styles.navigationoption}>
            <a style={returnColor("write")} href="/createblog">
              Write a{" "}
              {isAuthenticated() && <> {isAuthenticated().role === "user" ? "Story" : "Blog"}</>}
              {!isAuthenticated() && "Something"}
            </a>
          </div>
          <div className={styles.navigationoption}>
            <a target="_blank" style={returnColor("video")} href="/video">
              Video Call
            </a>
          </div>

          <div className={styles.navigationoption}>
            <a style={returnColor("podcast")} href="/podcasts">
              Podcast
            </a>
          </div>
          <div className={styles.navigationoption}>
            {!isAuthenticated() && (
              <a style={returnColor("signup")} href="/signin">
                Signin/Signup
              </a>
            )}{" "}
            {isAuthenticated() && (
              <>
                <div className={styles.name}>
                  {isAuthenticated().name.toUpperCase()} <i className={styles.arrowbottom}></i>
                </div>
                <div className={styles.userlist}>
                  <div className={styles.dropuparrow}></div>
                  <div className={styles.droppeduserlist}>
                    <ul>
                      {isAuthenticated().role === "advisor" && (
                        <li>
                          <a href="/createblog">Create a Blog</a>
                        </li>
                      )}
                      {isAuthenticated().role === "advisor" && (
                        <li>
                          <a href="/createpod">Create a Podcast</a>
                        </li>
                      )}
                      <li>
                        <a href="/chat">Chats</a>
                      </li>

                      <li
                        onClick={() => {
                          signout(() => {
                            window.location.reload(false);
                          });
                        }}
                      >
                        <a href="/"> Logout</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
