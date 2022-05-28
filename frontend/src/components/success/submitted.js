import React from "react";
import checkmark from "../../assets/images/checkmark.gif";
import styles from "../../styles/handlercomponents/success.module.css";

const Success = ({ type }) => {
  const SubmittedComponent = () => {
    return (
      <div className={styles.submitted}>
        <div className={styles.product}>
          <div className={styles.gifblock}>
            <img src={checkmark} alt="" />
          </div>
          <p className={styles.first}>Your form for {type} has been submitted successfully.</p>
          <p className={styles.second}>
            {type === "Psychiatrist Form" ? (
              <p> Our team would soon review your form and get back to you.</p>
            ) : (
              <p>
                Go back to home and continue browsing <a href="/">Home</a>
              </p>
            )}
          </p>
        </div>
      </div>
    );
  };

  return <div className="submittedcomponent">{SubmittedComponent()}</div>;
};

export default Success;
