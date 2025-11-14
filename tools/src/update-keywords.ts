// SPDX-License-Identifier: Apache-2.0
import { files, readJSON, writeJSON } from "@thi.ng/file-io";
import { LOGGER } from "./api.js";
import type { IObjectOf } from "@thi.ng/api";

const PKG_TAGS: IObjectOf<string[]> = {
	"/atom": ["atom"],
	"/canvas": ["canvas"],
	"/dl-asset": ["download", "export"],
	"/cellular": ["cellular", "automata", "generative"],
	"/color": ["color"],
	"/color-palettes": ["color", "palette"],
	"/dsp": ["dsp"],
	"/geom": ["geometry"],
	"/hdom-canvas": ["canvas"],
	"/hdom": ["ui"],
	"/hiccup": ["hiccup"],
	"/hiccup-canvas": ["canvas"],
	"/hiccup-svg": ["svg"],
	"/meta-css": ["css"],
	"/matrices": ["matrix"],
	"/parse": ["parser"],
	"/rdom": ["ui"],
	"/rstream": ["reactive"],
	"/shader-ast": ["dsl", "shader", "shader-ast"],
	"/transducers-binary": ["transducer", "binary"],
	"/transducers": ["transducer"],
	"/vectors": ["vector"],
	"/wasm-api": ["webassembly", "interop"],
	"/wasm-api-canvas": ["browser", "canvas"],
	"/wasm-api-dom": ["browser"],
	"/wasm-api-schedule": ["time"],
	"/wasm-api-webgl": ["webgl"],
	"/webgl": ["webgl"],
};

const updateTags = (deps: string[], tags: string[]) => {
	for (let [id, adds] of Object.entries(PKG_TAGS)) {
		if (deps.find((d) => d.endsWith(id))) tags.push(...adds);
	}
	return [...new Set(tags)];
};

for (let x of files(".", /(examples|packages)\/.+\/package.json$/, 3)) {
	const pkg = readJSON(x, LOGGER);
	const isExample = pkg.name.startsWith("@example");
	let tags = pkg.keywords;
	if (tags) {
		if (isExample) {
			tags = updateTags(Object.keys(pkg.dependencies || {}), tags);
		}
		pkg.keywords = tags.sort();
	} else if (isExample) {
		pkg.keywords = ["example"];
	}
	writeJSON(x, pkg, null, "\t", LOGGER);
}
