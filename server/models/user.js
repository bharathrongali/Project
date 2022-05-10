/* B"H
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db, isConnected, ObjectId } = require('./mongo');

const collection = db.db('DB_APP').collection('users');

const SALT_ROUNDS = +process.env.SALT_ROUNDS;

const list = [
	{
		username: 'Bob',
		password: '123',
		avatar: "https://randomuser.me/api/portraits/men/7.jpg"
	},
	{
		username: 'Alice',
		password: '456',
		avatar: "https://randomuser.me/api/portraits/men/8.jpg"
	},
];

async function get(id) {
	const user = await collection.findOne({ _id: new ObjectId(id) });
	if (!user) {
		throw { statusCode: 404, message: 'User not found' };
	}
	return { ...user, password: undefined };
}

async function getByHandle(handle) {
	const user = await collection.findOne({ handle });
	if (!user) {
		throw { statusCode: 404, message: 'User not found' };
	}
	return { ...user, password: undefined };
}

async function remove(id) {
	const user = await collection.findOneAndDelete({ _id: new ObjectId(id) });

	return { ...user.value, password: undefined };
}

async function update(id, newUser) {
	if (newUser.password) {
		newUser.password = await bcrypt.hash(newUser.password, SALT_ROUNDS);
	}

	newUser = await collection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{ $set: newUser },
		{ returnDocument: 'after' }
	);

	return { ...newUser, password: undefined };
}

async function login(username, password) {
	const user = await collection.findOne({ username });
	if (!user) {
		throw { statusCode: 404, message: 'User not found' };
	}
	if (!(await bcrypt.compare(password, user.password))) {
		throw { statusCode: 401, message: 'Invalid password' };
	}

	const data = { ...user, password: undefined };
	const token = jwt.sign(data, process.env.JWT_SECRET);

	return { ...data, token };
}

function fromToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				resolve(decoded);
			}
		});
	});
}

const seed = () => {
	const l = list.map(e => ({
		...e,
		password: bcrypt.hashSync(e.password, SALT_ROUNDS),
	}));
	return collection.insertMany(l);
};

const create = async user => {
	user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
	const result = await collection.insertOne({...user, _id: undefined});
	return await get(result.insertedId);
};

module.exports = {
	collection,
	seed,
	getByHandle,
	create,
	remove,
	update,
	login,
	fromToken,
	async getList() {
		return (await collection.find().toArray()).map(x => ({
			...x,
			password: undefined,
		}));
	},
};
module.exports.get = get;
