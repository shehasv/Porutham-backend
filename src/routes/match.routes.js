const { Router } = require('express');
const { matchHoroscope } = require('../controllers/match.controller');

const router = Router();

router.post('/match', matchHoroscope);

module.exports = router;
