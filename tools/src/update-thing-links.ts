import { deleteFile, readJSON, tempFilePath, writeText } from "@thi.ng/file-io";
import { DOCTYPE_HTML, serialize } from "@thi.ng/hiccup";
import { head, html, meta, title } from "@thi.ng/hiccup-html";
import { getIn } from "@thi.ng/paths";
import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { LOGGER } from "./api.js";

const baseDir = "./packages/";
const tmpFile = tempFilePath();

for (let f of readdirSync(baseDir)) {
	f = baseDir + f;
	if (f.indexOf(".DS_Store") >= 0 || !statSync(f).isDirectory) continue;
	try {
		const pkg = readJSON(f + "/package.json", LOGGER);
		const id = pkg.name.split("/")[1];
		if (getIn(pkg, ["thi.ng", "shortlink"]) === false) {
			console.log(`\tskipping: ${id}`);
			continue;
		}
		const branch = getIn(pkg, ["thi.ng", "branch"]) || "develop";
		const doc = html(
			{ lang: "en" },
			head(
				{},
				meta({ charset: "UTF-8" }),
				meta({
					content: pkg.keywords.join(","),
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
		console.log($html, "\n-------");
		writeText(tmpFile, $html);
		execFileSync(
			"aws",
			`s3 cp ${tmpFile} s3://thi.ng/${id} --profile thing-umbrella --acl public-read --content-type text/html --cache-control max-age=2592000`.split(
				" "
			)
		);
	} catch (e) {
		console.warn(`error: ${(<Error>e).message}`);
	}
}

deleteFile(tmpFile, LOGGER);
