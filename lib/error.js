module.exports = (res, code, message) => {
  console.log(`error ===============> ${code} / ${message}`);
  if (res) {
    res.status(code);
    return res.send(message);
  }
}