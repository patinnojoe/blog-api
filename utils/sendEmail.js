const nodemailer = require("nodemailer");
const { email_password, sender_email } = require("../config/keys");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: sender_email,
      pass: email_password,
    },
  });

  const message = {
    to: emailTo,
    subject,
    html: `
     <div>
     <h3>Use this below code to ${content}</h3>
     <p>Code: ${code}</p>
     </div>`,
  };

  transporter.sendMail(message);
};

module.exports = sendEmail;
