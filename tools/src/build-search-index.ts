// SPDX-License-Identifier: Apache-2.0
import { timed } from "@thi.ng/bench";
import {
	files,
	readJSON,
	readText,
	writeFile,
	writeJSON,
} from "@thi.ng/file-io";
import { serialize } from "@thi.ng/msgpack";
import { MultiTrie } from "@thi.ng/trie";
import { LOGGER } from "./api.js";
import { S3_BUCKET_DOCS, S3_COMPRESS_OPTS } from "./aws-config.js";
import { build, defEncoder } from "./search.js";
import { compressFile, execAWS } from "./utils.js";

const RE_DOC_START = /^\s*\/\*\*$/;
const RE_DOC_END = /^\s+\*\/$/;
const RE_DOC_CODE = /^\s+\* ```/;
const RE_SYM = /^export (type|interface|class|const|function|enum) (\w+)/;

// pkg, file, line
type IndexValue = number;

const fileIDs = new Map<string, number>();
const pkgIDs = new Map<string, number>();
const index = new MultiTrie<string, IndexValue>(
	null
	// { values: () => new ArraySet<IndexValue>() }
);
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
				index.add(word.split(""), encode(pkgId, fileId, ln));
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
					index.add(word.split(""), encode(pkgId, fileId, ln));
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
writeFile(
	"assets/search.bin",
	timed(() => serialize(packed, { initial: 1024 * 1024 }), "msgpack"),
	{},
	LOGGER
);
compressFile("assets/search.bin");

console.log("uploading...");
console.log(
	execAWS(
		`s3 cp assets/search.bin.br ${S3_BUCKET_DOCS}/umbrella/search-index-latest.bin ${S3_COMPRESS_OPTS}`
	)
);

// execAWS(
// 	`cloudfront create-invalidation --distribution-id ${CF_DISTRO_DOCS} --paths ${S3_PREFIX}/search-index-latest.bin ${AWS_PROFILE}`
// );
