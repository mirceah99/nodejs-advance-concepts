const express = require("express");
const crypto = require("crypto");
const app = express();

app.get("/", (req, res) => {
	crypto.pbkdf2("mircea", "b", 100_000, 512, "sha512", () => {
		res.send("hi there!");
	});
});
app.get("/fast", (req, res) => {
	res.send("this was fast");
});
app.listen(3000);
