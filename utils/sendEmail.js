const nodemailer = require("nodemailer");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "innocentjosiah57@gmail.com",
      pass: "hagzwbqfsksqwutj",
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
