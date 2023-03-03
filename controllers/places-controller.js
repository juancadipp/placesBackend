const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

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

const getPlacesById = (req, res, next) => {
	console.log('GET request in places');
	const placeId = req.params.pid;
	const place = DUMMY_PLACES.find((place) => {
		return place.id === placeId;
	});
	if(!place) {
		throw new HttpError('Could not find a place for the provided id.', 404);
	}
	res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
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
};

const createPlace = (req, res, next) => {
	const {title, description, coordinates, address, creatorId } = req.body;
	const createdPlace = {
		id: uuidv4(),
		title,
		description,
		location: coordinates,
		address,
		creatorId
	};
	DUMMY_PLACES.push(createdPlace);
	res.status(201).json({place: createdPlace});
};

exports.getPlaceById = getPlacesById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;