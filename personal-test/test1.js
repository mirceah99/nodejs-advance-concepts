const crypto = require("crypto");
const mod = 100;
const apparitions = new Array(mod).fill(0);
const loopsNumber = 500_000;
for (let i = 0; i < loopsNumber; i++) {
	apparitions[crypto.randomBytes(1).readUint8() % mod]++;
}
console.log(apparitions);
