// SPDX-License-Identifier: Apache-2.0
import { isPlainObject } from "@thi.ng/checks";
import { files, writeText } from "@thi.ng/file-io";
import { interpolate } from "@thi.ng/strings";
import { execFileSync } from "node:child_process";
import { basename } from "node:path";

const CONVERT_PATH = "../../examples/xml-converter/bin/hiccup";
const CONVERT_ARGS = `--format json --attribs xmlns,xmlns:xlink,xml:space,version,id,class,fill,stroke,stroke-width,width,height,x,y,style,data-name,viewBox --tags desc,title,defs tmp.svg`;

const IGNORE_PATHS = new Set([
	"M0 0h32v32H0z",
	"M0 32V0h32v32z",
	"M32 0v32H0V0z",
	"M32 32H0V0h32z",
	"M32 32H0V0h32",
]);

const [srcDir, destDir, prefix] = process.argv.slice(2);

const sourceFiles = ["_svg", "with-size"];

for (let src of files(srcDir, /\.svg$/, 1)) {
	const name = basename(src);
	if (prefix && !name.startsWith(prefix)) continue;
	const dest = name
		.substring(0, name.length - 4)
		.toLowerCase()
		.replace(/-{2,}/g, "-");
	let varName = dest.toUpperCase().replace(/-/g, "_");
	if (/^[0-9]/.test(varName)) {
		varName =
			[
				"ZERO",
				"ONE",
				"TWO",
				"THREE",
				"FOUR",
				"FIVE",
				"SIX",
				"SEVEN",
				"EIGHT",
				"NINE",
			][+varName[0]] +
			"_" +
			varName.substring(1);
	}
	console.log(name, dest, varName);
	execFileSync("svgo", ["-i", src, "-o", "tmp.svg"]);
	const srcDoc = execFileSync(
		CONVERT_PATH,
		interpolate(CONVERT_ARGS, varName).split(" ")
	).toString();
	console.log(srcDoc);
	let parsed = JSON.parse(srcDoc);
	const start = isPlainObject(parsed[1]) ? 2 : 1;
	// remove/hoist weird illustrator content
	// e.g. see `data-quality-definion.svg`
	if (parsed[start]?.[0] === "switch") {
		parsed = [
			...parsed.slice(0, start),
			...parsed[start][
				parsed[start][1]?.[0] === "foreignObject" ? 2 : 1
			].slice(1),
		];
	}
	const body: string[] = [];
	const imports: Set<string> = new Set(["svg"]);
	for (let i = start; i < parsed.length; i++) {
		const item = parsed[i];
		const [id, attribs] = item;
		// if (id.includes(".")) continue;
		switch (id) {
			case "circle":
				imports.add(id);
				body.push(
					`circle(${attribs.cx}, ${attribs.cy}, ${attribs.r}),`
				);
				break;
			case "path":
				if (!IGNORE_PATHS.has(attribs?.d)) {
					imports.add(id);
					body.push(`path("${attribs.d}"),`);
				}
				break;
			case "rect":
				break;
			default:
				body.push(JSON.stringify(item) + ",");
		}
	}
	const res = [
		`// SPDX-License-Identifier: Apache-2.0
import { ${[...imports].sort().join(", ")} } from "./_svg.js";

/**
 * https://demo.thi.ng/umbrella/hiccup-carbon-icons/#${varName}
 */
// prettier-ignore
export const ${varName}: any[] = svg(`,
		...body,
		");",
	];
	console.log(res);
	writeText(`${destDir}/${dest}.ts`, res);
	sourceFiles.push(dest);
}

if (!prefix) {
	writeText(
		`${destDir}/index.ts`,
		sourceFiles.map((id) => `export * from "./${id}.js";`).join("\n")
	);
} else {
	console.log("prefix was defined, skip writing index.ts...");
}
