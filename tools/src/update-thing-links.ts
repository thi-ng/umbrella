// SPDX-License-Identifier: Apache-2.0
import { DAY, durationAs } from "@thi.ng/date";
import {
	deleteFile,
	dirs,
	readJSON,
	tempFilePath,
	writeText,
} from "@thi.ng/file-io";
import { DOCTYPE_HTML, serialize } from "@thi.ng/hiccup";
import { head, html, meta, title } from "@thi.ng/hiccup-html";
import { getIn } from "@thi.ng/paths";
import { execFileSync } from "node:child_process";
import { join, sep } from "node:path";
import { LOGGER, type Package } from "./api.js";
import { S3_OPTS } from "./aws-config.js";

const CACHE_CTRL = `max-age=${durationAs("s", DAY * 30)}`;

const baseDir = "./packages";
const tmpFile = tempFilePath();

const pkgDirs =
	process.argv.length > 2
		? process.argv.slice(2).map((x) => join(baseDir, x))
		: dirs(baseDir, "", 1);

for (let f of pkgDirs) {
	try {
		const pkg = readJSON<Package>(join(f, "package.json"), LOGGER);
		const id = pkg.name.split(sep)[1];
		if (getIn(pkg, ["thi.ng", "shortlink"]) === false) {
			LOGGER.info(`\tskipping pkg: ${id}`);
			continue;
		}
		const branch = getIn(pkg, ["thi.ng", "branch"]) || "develop";
		const root =
			getIn(pkg, ["thi.ng", "status"]) === "deprecated"
				? "deprecated/"
				: "";
		const doc = html(
			{ lang: "en" },
			head(
				{},
				meta({ charset: "UTF-8" }),
				meta({
					name: "keywords",
					content: pkg.keywords?.join(",") || "",
				}),
				meta({ property: "og:url", content: `https://thi.ng/${id}` }),
				meta({ property: "og:site_name", content: `thi.ng/${id}` }),
				meta({ property: "og:title", content: pkg.description }),
				meta({
					property: "og:image",
					content:
						"https://thi.ng/assets/img/twitter-card-800x418.jpg",
				}),
				meta({ property: "og:image:width", content: "800" }),
				meta({ property: "og:image:height", content: "418" }),
				meta(<any>{
					name: "twitter:card",
					content: "summary_large_image",
				}),
				meta(<any>{
					name: "twitter:site:id",
					content: "@thing_umbrella",
				}),
				meta(<any>{
					name: "twitter:creator",
					content: "@thing_umbrella",
				}),
				meta(<any>{
					name: "twitter:image:alt",
					content:
						"thi.ng logo with a colorful generative art background",
				}),
				meta({
					"http-equiv": "refresh",
					content: `0; url=https://github.com/thi-ng/umbrella/tree/${branch}/${root}packages/${id}#readme`,
				}),
				title({}, pkg.name)
			)
		);
		const $html = serialize([DOCTYPE_HTML, doc]);
		LOGGER.debug($html, "\n-------");
		writeText(tmpFile, $html, LOGGER);
		execFileSync(
			"aws",
			`s3 cp ${tmpFile} s3://thi.ng/${id} ${S3_OPTS} --content-type text/html --cache-control ${CACHE_CTRL}`.split(
				" "
			)
		);
	} catch (e) {
		console.warn(`error: ${(<Error>e).message}`);
	}
}

deleteFile(tmpFile, LOGGER);
