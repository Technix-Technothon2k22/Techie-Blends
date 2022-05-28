import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Godaddy",
  host: "smtpout.secureserver.net",
  secureConnection: true,
  port: 80,
  auth: {
    user: "contact@eduudr.org",
    pass: "Udaipur12@",
  },
});

const sendEmail = async (email, subject, message) => {
  var mailOptions = {
    from: `contact@eduudr.org`,
    to: `${email}`,
    subject: `${subject}`,
    generateTextFromHTML: true,
    html: `${message}`,
  };

  smtpTransport
    .sendMail(mailOptions)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((err) => {
      console.log("Failed to send email");
      console.error(err);
    });
};
export default sendEmail;
