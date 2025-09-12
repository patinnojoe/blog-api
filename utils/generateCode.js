const generateCode = (codeLength) => {
  let code = "";
  const number = String(Math.random()).split(".")[1].split("");
  const length = number.length;

  //   generate random numbers

  if (!codeLength) {
    codeLength = 4;
  }
  for (let i = 0; i < codeLength; i++) {
    code = code + number[length - (i + 1)];
  }

  return code;
};

module.exports = generateCode;
