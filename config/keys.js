const { PORT, DB_CONNECTION, JWT_SECRET } = process.env;

module.exports = {
  port: PORT,
  connectionURL: DB_CONNECTION,
  jwt_secret: JWT_SECRET,
};
