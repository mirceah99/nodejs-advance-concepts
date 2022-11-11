process.env.UV_THREADPOOL_SIZE = 2; // linux is okay, maybe macOS
// but because windows please call script like this: set UV_THREADPOOL_SIZE=2 & node threads.js
const crypto = require("crypto");
const start = new Date();
crypto.pbkdf2("mircea", "b", 200_000, 512, "sha512", () => {
	console.log(`1: ${Date.now() - start}`);
});
crypto.pbkdf2("mircea", "b", 200_000, 512, "sha512", () => {
	console.log(`2: ${Date.now() - start}`);
});
crypto.pbkdf2("mircea", "b", 100_000, 512, "sha512", () => {
	console.log(`3: ${Date.now() - start}`);
});
crypto.pbkdf2("mircea", "b", 200_000, 512, "sha512", () => {
	console.log(`4: ${Date.now() - start}`);
});
crypto.pbkdf2("mircea", "b", 200_000, 512, "sha512", () => {
	console.log(`5: ${Date.now() - start}`);
});
crypto.pbkdf2("mircea", "b", 200_000, 512, "sha512", () => {
	console.log(`6: ${Date.now() - start}`);
});
crypto.pbkdf2("mircea", "b", 200_000, 512, "sha512", () => {
	console.log(`7: ${Date.now() - start}`);
});
crypto.pbkdf2("mircea", "b", 200_000, 512, "sha512", () => {
	console.log(`8: ${Date.now() - start}`);
});
