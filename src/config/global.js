const globals = {
  error: (res, code, message) => require('../lib/error')(res, code, message)
}

module.exports = () => {
  for (let key in globals) {
	  global[key] = globals[key];
  }
}
