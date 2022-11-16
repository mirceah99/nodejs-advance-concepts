const e = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Blog = mongoose.model("Blog");

const cleanCache = require("../middlewares/clearCache");

module.exports = (app) => {
	app.get("/api/blogs/:id", requireLogin, async (req, res) => {
		const blog = await Blog.findOne({
			_user: req.user.id,
			_id: req.params.id,
		});
		res.send(blog);
	});

	app.get("/api/blogs", requireLogin, async (req, res) => {
		const blogs = await Blog.find({ _user: req.user.id }).cache({
			hashKey: req.user.id,
		});
		res.send(blogs);
	});

	app.get("/clear/cache", async (req, res) => {
		console.log("CLEAR CACHE!");
		const redis = require("redis");
		const redisUrl = "redis://127.0.0.1:6379";
		const client = redis.createClient(redisUrl);
		client.flushdb(function (err, succeeded) {
			if (succeeded) {
				// will be true if successful
				res.send("success!!");
			} else {
				res.send(500);
			}
		});
	});

	app.post("/api/blogs", requireLogin, cleanCache, async (req, res) => {
		const { title, content } = req.body;
		const blog = new Blog({
			title,
			content,
			_user: req.user.id,
		});

		try {
			await blog.save();
			res.send(blog);
		} catch (err) {
			res.send(400, err);
		}
	});
};
