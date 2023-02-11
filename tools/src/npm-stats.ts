import { delayed } from "@thi.ng/compose";
import { defFormat } from "@thi.ng/date";
import { writeJSON } from "@thi.ng/file-io";
import { add, range } from "@thi.ng/transducers";
import { readdirSync } from "fs";
import { request } from "https";
import { LOGGER } from "./api.js";

const currDate = defFormat(["yyyy", "-", "MM", "-", "dd"])();
const currYear = new Date().getFullYear();

(async () => {
	const stats: any = {};
	for (let f of readdirSync("packages")) {
		console.log(f);
		for (let year of range(2018, currYear + 1)) {
			const endDate = year < currYear ? `${year + 1}-01-01` : currDate;
			const url = `https://api.npmjs.org/downloads/point/${year}-01-01:${endDate}/@thi.ng/${f}`;
			// console.log(url);
			const req = request(url, (res) => {
				// console.log("status:", res.statusCode);
				res.setEncoding("utf8");
				res.on("data", (d) => {
					const num = JSON.parse(d.toString()).downloads || 0;
					stats[f] = stats[f] ? stats[f] + num : num;
				});
			});

			req.on("error", (e) => {
				console.error(e);
			});
			req.end();
			await delayed(null, 2000);
		}
		console.log(`${f},${stats[f]}`);

		await delayed(null, 5000);
	}

	await delayed(null, 5000);
	writeJSON("npm-stats.json", stats, null, "\t", LOGGER);

	console.log("total:", add(Object.values<number>(stats)));

	console.log("done");
})();
