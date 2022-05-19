const { db, ObjectId } = require('./mongo');
const userModel = require('./user');

const collection = db.db('DB_APP').collection('users');

const getList = async (chars) => {
	const result = await collection.find({"username" : {$regex : chars}});
	const list = [];
	await result.forEach(e => list.push(e.username));
	return list;
}

module.exports.getList = getList;
