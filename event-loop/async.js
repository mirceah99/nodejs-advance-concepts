const https = require("https");

const start = new Date();
function doRequestXTimes(x) {
	while (x) {
		https
			.request("https://www.google.com", (res) => {
				res.on("data", () => {});
				res.on("end", () => {
					console.log(Date.now() - start);
				});
			})
			.end();
		x--;
	}
}
doRequestXTimes(20);
