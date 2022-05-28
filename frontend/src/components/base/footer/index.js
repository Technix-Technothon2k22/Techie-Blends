//footer
import React from "react";
import styles from "../../../styles/footer/style.module.css";
import logo from "../../../assets/images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <footer>
      <div className={styles.first}>
        <ul>
          <li>
            <a href=""> About Us</a>
          </li>
          <li>
            <a href=""> Stories</a>
          </li>
          <li>
            <a href=""> Blogs</a>
          </li>
          <li>
            <a href=""> Contact us</a>
          </li>
          <li>
            <a href=""> Privacy Policy</a>
          </li>
        </ul>
      </div>
      <div className={styles.second}>
        <img src={logo} alt="" className={styles.logo} />
        <p className={styles.smile}>Thousands of smiles delivered everyday</p>
        <div>
          <p className={styles.follow}>Follow us on</p>
          <div className={styles.icons}>
            <FacebookIcon />
            <InstagramIcon />
            <LinkedInIcon />
          </div>
        </div>
      </div>
      <div className={styles.third}>
        <p>Join us as an mental expert</p>
        <a href="/signup">Join</a>
      </div>
    </footer>
  );
};

export default Footer;
