const { db, ObjectId } = require('./mongo');
const userModel = require('./user');

const collection = db.db('DB_APP').collection('tasks');

let hieghstId = 3;

const list = [
	{
		by: 'Bob',
		date: '20-04-2022',
		done: false,
		title: 'Update NodeJS',
		for: 'Alice'
	},
	{
		by: 'Alice',
		date: '20-04-2022',
		done: false,
		title: 'Update Vue',
		for: 'Bob'
	},
	{
		by: 'Alice',
		date: '20-04-2022',
		done: true,
		title: 'Do something',
		for: 'Bob'
	}
];

const includeUser = async post => ({
	...post,
	user: await userModel.getByHandle(post.owner),
});

async function get(id) {
	const post = await collection.findOne({ _id: new ObjectId(id) });
	if (!post) {
		throw { status: 404, message: 'Post not found' };
	}
	return includeUser(post);
}

async function getWall(handle) {
	const posts = await collection.find({ owner: handle }).toArray();

	return Promise.all(posts.map(x => includeUser(x)));
}

async function remove(id) {
	const post = await collection.findOneAndDelete({ _id: new ObjectId(id) });

	return includeUser(post.value);
}

async function update(id, task) {
	await collection.findOneAndReplace(
		{ _id: new ObjectId(id) },
		{ ...task, _id: new ObjectId(id) },
		{ returnDocument: 'after' }
	);

	return task;
}

function seed() {
	return collection.insertMany(list);
}

const create = async (post) => {
	const result = await collection.insertOne(post);
	post = await get(result.insertedId);

	return includeUser(post);
}

module.exports = {
	create,
	remove,
	update,
	async getList() {
		const posts = await collection.find({}).toArray();

		return Promise.all(posts.map(x => includeUser(x)));
	},
	getWall,
	seed,
};
module.exports.get = get;
