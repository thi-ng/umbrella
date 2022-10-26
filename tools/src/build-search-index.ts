import { ArraySet, MultiTrie } from "@thi.ng/associative";
import {
	files,
	readJSON,
	readText,
	writeFile,
	writeJSON,
} from "@thi.ng/file-io";
// @ts-ignore
import msgpack from "@ygoe/msgpack";
import { execFileSync } from "child_process";
import { LOGGER } from "./api.js";
import { build, defEncoder } from "./search.js";

const RE_DOC_START = /^\s*\/\*\*$/;
const RE_DOC_END = /^\s+\*\/$/;
const RE_DOC_CODE = /^\s+\* \`\`\`/;
const RE_SYM = /^export (type|interface|class|const|function|enum) (\w+)/;

// pkg, file, line
type IndexValue = number;

const fileIDs = new Map<string, number>();
const pkgIDs = new Map<string, number>();
const index = new MultiTrie<string, IndexValue>(null, {
	vals: () => new ArraySet<IndexValue>(),
});
const ignore = new Set(readJSON("./tools/ignore-words.json", LOGGER));

const encodeConfig = [
	[0, 0xff],
	[8, 0xfff],
	[20, 0xfff],
];
const encode = defEncoder(encodeConfig);

let numFiles = 0;
for (let f of files("packages", ".ts")) {
	if (f.indexOf("/src/") < 0 || /\/(dev|export|fixtures)\//.test(f)) continue;
	console.log(f);
	const path = /packages\/([a-z0-9-]+)\/src\/(.+)/.exec(f)!;
	let [, pkg, fname] = path;
	fname = fname.substr(0, fname.length - 3);
	const pkgId =
		pkgIDs.get(pkg) || (pkgIDs.set(pkg, pkgIDs.size), pkgIDs.size - 1);
	const fileId = fileIDs.has(fname) ? fileIDs.get(fname)! : fileIDs.size;
	const src = readText(f, LOGGER);
	let indexed = false;
	let isComment = false;
	let isCode = false;
	let ln = 0;
	const knownWords = new Set<string>();
	for (let line of src.split("\n")) {
		ln++;
		if (RE_DOC_START.test(line)) {
			isComment = true;
			continue;
		}
		if (RE_DOC_END.test(line)) {
			isComment = false;
			continue;
		}
		if (RE_DOC_CODE.test(line)) {
			isCode = !isCode;
			continue;
		}
		const sym = RE_SYM.exec(line);
		if (sym) {
			const word = sym[2].toLowerCase();
			if (word.length < 3 || ignore.has(word) || word.startsWith("_"))
				continue;
			if (!knownWords.has(word)) {
				// knownWords.add(word);
				index.add(word, encode(pkgId, fileId, ln));
				indexed = true;
			}
		} else if (isComment && !isCode) {
			const re = /[@a-z][@a-z0-9_-]{2,}/gi;
			let match;
			while ((match = re.exec(line))) {
				const word = match[0].toLowerCase();
				if (ignore.has(word)) continue;
				if (!knownWords.has(word)) {
					// knownWords.add(word);
					index.add(word, encode(pkgId, fileId, ln));
					indexed = true;
				}
			}
		}
	}
	if (indexed) {
		fileIDs.set(fname, fileId);
		numFiles++;
	}
}

const packed = build(
	encodeConfig,
	pkgIDs,
	fileIDs,
	numFiles,
	[...index.keys()].length,
	[...index.values()].length,
	index
);

writeJSON("assets/search.json", packed, null, 0, LOGGER);
// msgpack'd binary version
writeFile("assets/search.bin", msgpack.serialize(packed), {}, LOGGER);
execFileSync("gzip", "-9 -f assets/search.bin".split(" "));

console.log("uploading...");
console.log(
	execFileSync(
		"aws",
		"s3 cp assets/search.bin.gz s3://docs.thi.ng/umbrella/search-index-latest.bin --content-encoding gzip --acl public-read --profile thing-umbrella".split(
			" "
		)
	).toString()
);
