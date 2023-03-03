const express = require('express');
const HttpError = require('../models/http-error');
const router = express.Router();

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'first Place',
		description: 'this is the description for the first place',
		location: {
			lat: 1123,
			lng: 123,
		},
		address: 'address for first place',
		creatorId: 'u1',
	},
];

router.get('/:pid', (req, res, next) => {
	console.log('GET request in places');
	const placeId = req.params.pid;
	const place = DUMMY_PLACES.find((place) => {
		return place.id === placeId;
	});
	if(!place) {
		throw new HttpError('Could not find a place for the provided id.', 404);
	}
	res.json({ place });
});

router.get('/users/:uid', (req, res, next) => {
	const userId = req.params.uid;
	const place = DUMMY_PLACES.find((place) => {
		return place.creatorId === userId;
	});
	if(!place) {
		return next(
			new HttpError('Could not find a place for the provided user id.', 404)
		);
	}
	res.json({ place });
});

module.exports = router;
