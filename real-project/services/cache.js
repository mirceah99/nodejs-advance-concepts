const mongoose = require("mongoose");
const util = require("util");

const redis = require("redis");
const { Console } = require("console");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
const expireTimeSeconds = 60 * 10;

client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
	if (this.useCache) {
		const redisKey =
			JSON.stringify(this.getQuery()) + "-" + this.mongooseCollection.name;

		// check if i have this query cached
		const cachedValue = await client.hget(this.hashKey, redisKey);
		//if i do return it
		if (cachedValue) {
			const response = JSON.parse(cachedValue);

			// convert plain object to mongoose document
			return response.length
				? response.map((item) => new this.model(item))
				: new this.model(response);
		}

		// else execute query and cache result
		const resultFromDb = await exec.apply(this, arguments);
		client.hset(
			this.hashKey,
			redisKey,
			JSON.stringify(resultFromDb),
			"EX",
			expireTimeSeconds
		);
		return resultFromDb;
	} else {
		return exec.apply(this, arguments);
	}
};
mongoose.Query.prototype.cache = function (options = { hashKey: "DEFAULT" }) {
	this.useCache = true;

	this.hashKey = JSON.stringify(options.hashKey || "DEFAULT");
	return this;
};

module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	},
};
