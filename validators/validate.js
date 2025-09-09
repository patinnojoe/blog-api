const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = {};

  //   validate if error exist
  if (Object.keys(errors.errors).length < 1) {
    next();
  } else {
    errors.errors.map((error) => {
      mappedErrors[error.path] = error.msg;
    });

    res.status(400).json({ errors: mappedErrors, status: false, code: 400 });
  }
};

module.exports = validate;
