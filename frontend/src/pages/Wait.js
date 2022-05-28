import React from "react";
import Header from "../components/base/header";
import wait from "../assets/images/wait.png";
import styles from "../styles/home/style.module.css";
const Wait = () => {
  return (
    <div>
      <Header />
      <div className={styles.waitContainer}>
        <img src={wait} alt="wait" className={styles.waitImage} />
        <h1 className={styles.formC}>Your Form has been submitted</h1>
        <p>
          Please be patient until your application is reviewed and we get back
          to you ..
        </p>
        <p>
          Visit our &nbsp;
          <a href="/">Home</a> to continue browsing
        </p>
      </div>
    </div>
  );
};

export default Wait;
