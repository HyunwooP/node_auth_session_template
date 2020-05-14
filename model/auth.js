const router = require('express').Router();
const authService = require('../service/auth');

router.post('/login', async (req, res) => {
  return res.send(await authService.login(req, res));
});

router.post('/logout', async (req, res) => {
  return res.send(await authService.logout(req, res));
});

module.exports = router;