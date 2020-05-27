module.exports = (res, code, message) => {
  if (res) {
    res.status(code);
    return res.send(message);
  }
}