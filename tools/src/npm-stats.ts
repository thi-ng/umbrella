import { delayed } from "@thi.ng/compose";
import { writeJSON } from "@thi.ng/file-io";
import { readdirSync } from "fs";
import { request } from "https";
import { LOGGER } from "./api.js";

(async () => {
	const stats: any = {};
	for (let f of readdirSync("packages")) {
		console.log(f);
		const req = request(
			`https://api.npmjs.org/downloads/point/last-month/@thi.ng/${f}`,
			(res) => {
				console.log("status:", res.statusCode);
				res.setEncoding("utf8");
				res.on("data", (d) => {
					stats[f] = JSON.parse(d.toString()).downloads || 0;
				});
			}
		);

		req.on("error", (e) => {
			console.error(e);
		});
		req.end();

		await delayed(null, 1000);
	}

	await delayed(null, 5000);
	writeJSON("stats.json", stats, null, "\t", LOGGER);
	console.log("done");
})();
