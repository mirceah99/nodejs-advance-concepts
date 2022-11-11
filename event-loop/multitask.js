const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = new Date();
function doRequestXTimes(x) {
	while (x) {
		https
			.request("https://www.google.com", (res) => {
				res.on("data", () => {});
				res.on("end", () => {
					console.log(`req: ${Date.now() - start}`);
				});
			})
			.end();
		x--;
	}
}
// doRequestXTimes(20);
let i = 0;
function doHash() {
	crypto.pbkdf2("mircea", "b", 100_000, 512, "sha512", () => {
		console.log(`Hash ${++i}: ${Date.now() - start}`);
	});
}

// function () {
// }

doRequestXTimes(1);

fs.readFile("multitask.js", "utf8", () => {
	console.log(`FS: ${Date.now() - start}`);
});

doHash();
doHash();
doHash();
doHash();
