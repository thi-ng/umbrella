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
import { LOGGER, type Package } from "./api.js";
import { S3_OPTS } from "./aws-config.js";

const CACHE_CTRL = `max-age=${durationAs("s", DAY * 30)}`;

const baseDir = "./packages/";
const tmpFile = tempFilePath();

for (let f of dirs(baseDir, "", 1)) {
	try {
		const pkg = readJSON<Package>(f + "/package.json", LOGGER);
		const id = pkg.name.split("/")[1];
		if (getIn(pkg, ["thi.ng", "shortlink"]) === false) {
			LOGGER.info(`\tskipping pkg: ${id}`);
			continue;
		}
		const branch = getIn(pkg, ["thi.ng", "branch"]) || "develop";
		const doc = html(
			{ lang: "en" },
			head(
				{},
				meta({ charset: "UTF-8" }),
				meta({
					content: pkg.keywords?.join(",") || "",
					name: "keywords",
				}),
				meta(<any>{
					content: "summary_large_image",
					name: "twitter:card",
				}),
				meta(<any>{ content: "@thing_umbrella", name: "twitter:site" }),
				meta(<any>{
					content: "@thing_umbrella",
					name: "twitter:creator",
				}),
				meta({ content: "https://thi.ng/", property: "og:url" }),
				meta({ content: "thi.ng", property: "og:site_name" }),
				meta({
					content: pkg.description,
					property: "og:title",
				}),
				meta({
					content:
						"https://thi.ng/assets/img/twitter-card-800x418.jpg",
					property: "og:image",
				}),
				meta(<any>{
					content:
						"thi.ng logo with a colorful generative art background",
					name: "twitter:image:alt",
				}),
				meta({
					"http-equiv": "refresh",
					content: `0; url=https://github.com/thi-ng/umbrella/tree/${branch}/packages/${id}`,
				}),
				title({}, pkg.name)
			)
		);
		const $html = serialize([DOCTYPE_HTML, doc]);
		// console.log($html, "\n-------");
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
