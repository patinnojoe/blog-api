const { PORT, DB_CONNECTION, JWT_SECRET, SENDER_EMAIL, EMAIL_PASSWORD } =
  process.env;

module.exports = {
  port: PORT,
  connectionURL: DB_CONNECTION,
  jwt_secret: JWT_SECRET,
  sender_email: SENDER_EMAIL,
  email_password: EMAIL_PASSWORD,
};
