const cluster = require("cluster");

console.log(cluster.isMaster);
if (cluster.isMaster) {
	cluster.fork(); // index.js executed again but in slave(child) mode
	cluster.fork();
	cluster.fork();
	cluster.fork();
	cluster.fork();
} else {
	// i am a child, i will act like a server
	const express = require("express");
	const crypto = require("crypto");
	const app = express();

	// function doWok(duration) {
	// 	const start = Date.now();
	// 	while (Date.now() - start < duration) {
	// 		Math.random();
	// 	}
	// }

	app.get("/", (req, res) => {
		// doWok(5000);
		crypto.pbkdf2("mircea", "b", 100_000, 512, "sha512", () => {
			res.send("hi there!");
		});
	});
	app.get("/fast", (req, res) => {
		res.send("this was fast");
	});
	app.listen(3000);
}
