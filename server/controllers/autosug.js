const express = require('express');
const app = express.Router();

const autoSugModel = require('../models/autoSug');

app
	.post('/', (req, res, next) => {
		autoSugModel
			.getList(req.body.chars)
			.then(list => res.json({ success: true, errors: [], data: list }))
			.catch(next);
	})

module.exports = app;
