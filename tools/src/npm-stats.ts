import type { IObjectOf } from "@thi.ng/api";
import { delayed } from "@thi.ng/compose";
import { FMT_yyyyMMdd } from "@thi.ng/date";
import { dirs, writeJSON } from "@thi.ng/file-io";
import { add, map, range, vals } from "@thi.ng/transducers";
import { request } from "node:https";
import { basename } from "node:path";
import { LOGGER } from "./api.js";

const currDate = FMT_yyyyMMdd();
const currYear = new Date().getFullYear();

(async () => {
	const stats: IObjectOf<number> = {};
	for (let f of map(basename, dirs("packages", "", 1))) {
		LOGGER.info(f);
		for (let year of range(2018, currYear + 1)) {
			const endDate = year < currYear ? `${year + 1}-01-01` : currDate;
			const url = `https://api.npmjs.org/downloads/point/${year}-01-01:${endDate}/@thi.ng/${f}`;
			const req = request(url, (res) => {
				res.setEncoding("utf8");
				res.on("data", (d) => {
					const num = JSON.parse(d.toString()).downloads || 0;
					stats[f] = stats[f] ? stats[f] + num : num;
				});
			});
			req.on("error", (e) => {
				LOGGER.warn(e);
			});
			req.end();
			await delayed(null, 2000);
		}
		LOGGER.info(`${f}: ${stats[f]}`);

		await delayed(null, 5000);
	}

	await delayed(null, 5000);
	writeJSON("npm-stats.json", stats, null, "\t", LOGGER);

	LOGGER.info("total:", add(vals(stats)));
})();
