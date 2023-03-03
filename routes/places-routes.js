const express = require('express');
const router = express.Router();

const placesControllers = require('../controllers/places-controller');

router.get('/:pid', placesControllers.getPlaceById);

router.get('/users/:uid', placesControllers.getPlaceByUserId);

router.post('/', placesControllers.createPlace);

module.exports = router;
