const router = require('express').Router();
const authService = require('../service/auth');

router.post('/login', async (req, res) => {
  try {
    
    if (!req.body.id || !req.body.password) {
      return error(res, 400, 'Missing Login Params');
    }

    return res.send(await authService.login(req, res));

  } catch(e) {
    return error(res, 500, e);
  }
});

router.post('/logout', async (req, res) => {
  try {
    return res.send(await authService.logout(req, res));
  } catch(e) {
    return error(res, 500, e);
  }
});

module.exports = router;