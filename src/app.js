const express = require('express');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const NyaDB = require('@decaded/nyadb');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const db = new NyaDB();

/**
 * Rate limiter middleware to prevent abuse.
 * Limits requests to 100 per 15 minutes per IP address.
 * Good enough for a small personal project.
 */
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: 'Too many requests, please try again later.',
});

app.use(limiter);

const authenticate = (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token || token !== API_KEY) {
		console.log('Unauthorized access attempt');
		return res.status(401).json({
			error: 'Unauthorized.',
			reason: { info: 'If you want access to this API, go to Kronos Writing Emporium Discord server and ask Dec.', discord: 'https://discord.gg/TeV3KB8Ueh' },
		});
	}
	console.log('Authenticated request from', req.ip);
	next();
};

/**
 * Generic route handler to fetch data from a collection.
 * Supports querying by ID or name.
 */
const getData = collection => async (req, res) => {
	try {
		console.log(`Fetching data from collection: ${collection}`);
		const data = db.get(collection);
		const query = req.params.query;

		if (query) {
			const itemById = data[query];
			if (itemById) {
				return res.json(itemById);
			}

			const itemByName = Object.values(data).find(item => item.name.toLowerCase() === query.toLowerCase());
			if (itemByName) {
				return res.json(itemByName);
			}

			return res.status(404).json({ error: 'Item not found' });
		}

		console.log(`Data retrieved successfully for collection: ${collection}`);
		res.json({ message: 'Use /PokeAPI/' + collection + '/{id} or /PokeAPI/' + collection + '/{name} to retrieve specific data.' });
	} catch (error) {
		console.error(`Error retrieving data from ${collection}:`, error);
		res.status(500).json({ error: 'Failed to retrieve data' });
	}
};

/**
 * Route: GET /PokeAPI/:collection
 * Fetches data from a specified collection.
 * Valid collections: abilities, berries, items, moves, pokedex.
 */
app.get('/PokeAPI/:collection', authenticate, (req, res) => {
	const { collection } = req.params;
	if (!['abilities', 'berries', 'items', 'moves', 'pokedex'].includes(collection)) {
		return res.status(404).json({ error: 'Invalid collection' });
	}
	getData(collection)(req, res);
});

/**
 * Route: GET /PokeAPI/:collection/:query
 * Fetches data from a specified collection, filtering by ID or name.
 * Valid collections: abilities, berries, items, moves, pokedex.
 */
app.get('/PokeAPI/:collection/:query', authenticate, (req, res) => {
	const { collection, query } = req.params;
	if (!['abilities', 'berries', 'items', 'moves', 'pokedex'].includes(collection)) {
		return res.status(404).json({ error: 'Invalid collection' });
	}
	getData(collection)(req, res);
});

/**
 * Route: GET /PokeAPI/
 * Welcome route for the API.
 * Provides instructions for using the API.
 */
app.get('/PokeAPI/', authenticate, (req, res) => {
	res.json({
		message:
			'Welcome to the PokeAPI! Use /PokeAPI/{collection}/{id} or /PokeAPI/{collection}/{name} to retrieve specific data. Current collections are; abilities, berries, items, moves, pokedex',
	});
});

/**
 * Starts the Express server.
 */
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
