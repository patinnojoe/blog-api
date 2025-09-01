const { PORT, DB_CONNECTION } = process.env;

module.exports = { port: PORT, connectionURL: DB_CONNECTION };
