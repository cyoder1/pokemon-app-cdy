const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const { route } = require('./pokemon');

router.get('/', ctrl.players.index);
router.get('/signup', ctrl.players.signUp);
router.post('/signup', ctrl.players.infoToPage);
router.get('/profile/:index', ctrl.players.profile);
router.get('/login' , ctrl.players.renderlogin);
router.post('/login', ctrl.players.login);
router.put('/profile/:index', ctrl.players.edit);
router.delete('/profile/:index', ctrl.players.deletePlayer);

module.exports = router;