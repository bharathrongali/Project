require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userModel = require('./models/user');
const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');

const { requireAuth } = require('./models/auth');

const app = express();
const port = process.env.PORT || 3000;

app
	.use(cors())
	.use(express.json())

	.use((req, res, next) => {
		const auth = req.headers.authorization;
		if (auth) {
			const token = auth.split(' ')[1];
			userModel
				.fromToken(token)
				.then(user => {
					req.user = user;
					next();
				})
				.catch(next);
		} else {
			next();
		}
	})

	.use('/api/users', usersController)
	.use('/api/posts', requireAuth, postsController)
	.use((err, req, res, next) => {
		console.error(err);

		res
			.status(err.statusCode || 500)
			.send({ errors: [err.message ?? 'Internal server error'] });
	})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
