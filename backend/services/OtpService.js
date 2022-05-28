import crypto from "crypto";

class OtpService {
  static generateOtp() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  }

  static verifyOtp(dbOtp, userOtp) {
    return dbOtp === userOtp;
  }
}

export default OtpService;

export const message = (otp) => {
  return `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">EduUdr Community</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing EduUdr.Use the following OTP to complete your Sign Up procedures. <b>OTP</b> is valid for <b>10</b> minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><b>${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br/>EduUdr</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>>EduUdr</p>
          <p>India</p>
        </div>
      </div>
    </div> </b>
      `;
};
