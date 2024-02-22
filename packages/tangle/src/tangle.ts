import type { IObjectOf } from "@thi.ng/api";
import { isPlainObject, isString } from "@thi.ng/checks";
import { compareByKey } from "@thi.ng/compare";
import { FMT_ISO_SHORT } from "@thi.ng/date";
import { defError } from "@thi.ng/errors/deferror";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { readText } from "@thi.ng/file-io";
import { split } from "@thi.ng/strings";
import { assocObj, map, transduce } from "@thi.ng/transducers";
import { extname, isAbsolute, resolve, sep } from "node:path";
import {
	BLOCK_FORMATS,
	COMMENT_FORMATS,
	LOGGER,
	type Block,
	type Blocks,
	type TangleCtx,
	type TangleRef,
} from "./api.js";

const UnknownBlockError = defError<[string, string]>(
	(err) => `can't include unknown block ID: ${err![0]} (via ${err![1]})`,
	() => ""
);

const extractBlocks = (src: string, { format, logger }: TangleCtx) => {
	let nextID = 0;
	const blocks: Blocks = {};
	const re = new RegExp(
		`^${format.prefix.replace("+", "\\+")}(\\w+)\\s+(.+)$`,
		"gm"
	);
	let match: RegExpExecArray | null;
	while ((match = re.exec(src))) {
		let { id, tangle, noweb, publish } = parseBlockHeader(match[2]);
		!id && (id = `__block-${nextID++}`);
		const matchStart = match.index;
		const start = src.indexOf("\n", matchStart) + 1;
		const end = src.indexOf(`\n${format.suffix}`, matchStart + 1);
		logger.debug(
			"codeblock",
			id,
			start,
			end,
			matchStart,
			src.substring(start, 8)
		);
		const body = src.substring(start, end);
		blocks[id] = {
			id,
			lang: match[1],
			tangle,
			publish,
			noweb,
			start,
			end,
			matchStart,
			matchEnd: end + format.suffix.length + 2,
			body,
		};
	}
	return blocks;
};

const resolveBlock = (block: Block, ref: TangleRef, ctx: TangleCtx) => {
	if (block.resolved) return;
	if (block.noweb === "no") {
		block.resolved = true;
		return;
	}
	ctx.logger.debug("resolve", block.id);
	const re = /<<(.+)>>/g;
	let match: RegExpExecArray | null;
	let body = block.body;
	while ((match = re.exec(body))) {
		const paramIdx = match[1].indexOf(" ");
		let [childID, params] =
			paramIdx > 0
				? [
						match[1].substring(0, paramIdx),
						JSON.parse(match[1].substring(paramIdx).trim()),
				  ]
				: [match[1]];
		let childBlock: Block;
		if (childID.indexOf("#") > 0) {
			const [file, blockID] = childID.split("#");
			childBlock = loadAndResolveBlocks(
				ctx.fs.resolve(ctx.fs.resolve(ref.path, ".."), file),
				ctx
			).blocks[blockID];
			childID = blockID;
		} else {
			childID = childID.replace("#", "");
			childBlock = ref.blocks[childID];
		}
		if (!childBlock) throw new UnknownBlockError([childID, block.id]);
		resolveBlock(childBlock, ref, ctx);
		const newBody = isPlainObject(params)
			? parametricBody(childBlock.body, params)
			: childBlock.body;
		block.body = block.body.replace(`<<${match[1]}>>`, newBody);
		block.edited = true;
	}
	block.resolved = true;
	block.body = block.body.replace(/\\</g, "<");
};

const resolveBlocks = (ref: TangleRef, ctx: TangleCtx) => {
	for (let id in ref.blocks) {
		resolveBlock(ref.blocks[id], ref, ctx);
	}
	return ref;
};

const parseFileMeta = (src: string): Record<string, string> => {
	if (!src.startsWith("---\n")) return {};
	const res: Record<string, string> = {};
	for (let line of split(src.substring(4))) {
		if (line === "---") break;
		const [key, val] = line.split(/:\s+/g);
		res[key.trim()] = val.trim();
	}
	return res;
};

const parseBlockHeader = (header: string) =>
	transduce(
		map((x) => <[string, string]>x.split(":")),
		assocObj<string>(),
		header.split(/\s+/)
	);

const parametricBody = (body: string, params: any) =>
	body.replace(/\{\{(\w+)\}\}/g, (_, id) =>
		params[id] != null ? params[id] : id
	);

const commentForLang = (lang: string, body: string) => {
	const syntax = COMMENT_FORMATS[lang];
	return isString(syntax)
		? `${syntax} ${body}`
		: `${syntax[0]} ${body} ${syntax[1]}`;
};

const loadAndResolveBlocks = (path: string, ctx: TangleCtx) => {
	path = ctx.fs.resolve(path);
	if (!ctx.files[path]) {
		const src = ctx.fs.read(path, ctx.logger);
		const blocks = extractBlocks(src, ctx);
		const ref = (ctx.files[path] = { path, src, blocks });
		resolveBlocks(ref, ctx);
	}
	return ctx.files[path];
};

/**
 * Takes a file `path` and partial {@link TangleCtx}. Reads "file"
 * (implementation specific, could be from memory or other source) and then
 * performs all tangling steps on the document body, i.e. expanding &
 * transcluding code blocks, generating outputs for various target files etc.
 * Returns updated TangleCtx with all generated outputs stored under the
 * {@link TangleCtx.outputs} key.
 *
 * @param path
 * @param ctx
 */
export const tangleFile = (path: string, ctx: Partial<TangleCtx> = {}) => {
	const fmt = ctx.format || BLOCK_FORMATS[extname(path)];
	!fmt && illegalArgs(`unsupported file type: ${extname(path)}`);
	const $ctx: TangleCtx = {
		files: {},
		outputs: {},
		format: fmt,
		logger: LOGGER,
		fs: {
			isAbsolute,
			resolve,
			read: readText,
		},
		...ctx,
		opts: {
			comments: true,
			...ctx.opts,
		},
	};
	const { path: $path, src, blocks } = loadAndResolveBlocks(path, $ctx);
	const parentDir = $ctx.fs.resolve($path, "..");
	const meta = parseFileMeta(src);
	const sorted = Object.values(blocks).sort(compareByKey("start"));
	let prev = 0;
	let res: string[] = [];
	for (let block of sorted) {
		if (meta.publish) {
			res.push(src.substring(prev, Math.max(prev, block.matchStart)));
			if (block.publish !== "no") {
				res.push(
					`${fmt.prefix}${block.lang}\n${block.body}\n${fmt.suffix}\n`
				);
			}
		}
		if (block.tangle) {
			const dest = $ctx.fs.isAbsolute(block.tangle)
				? block.tangle
				: $ctx.fs.resolve(
						parentDir,
						`${meta.tangle || "."}${sep}${block.tangle}`
				  );
			let body = block.body;
			if (!$ctx.outputs[dest]) {
				if ($ctx.opts.comments && COMMENT_FORMATS[block.lang]) {
					body = [
						commentForLang(
							block.lang,
							`Tangled @ ${FMT_ISO_SHORT()} - DO NOT EDIT!`
						),
						commentForLang(block.lang, `Source: ${$path}`),
						"",
						body,
					].join("\n");
				}
				$ctx.outputs[dest] = body;
			} else {
				$ctx.outputs[dest] += "\n\n" + body;
			}
		}
		prev = block.matchEnd;
	}
	res.push(src.substring(prev));
	if (meta.publish) {
		const dest = $ctx.fs.resolve(parentDir, meta.publish);
		$ctx.outputs[dest] = res.join("").trim();
	}
	return $ctx;
};

/**
 * In-memory version of {@link tangleFile}. Take a file name and an object of
 * file names and their respective contents, then calls {@link tangleFile} with
 * a customized {@link TangleCtx} which resolves code block refs using given
 * virtual "file system" (of sorts).
 *
 * @remarks
 * Relative file reference paths are only supported if they refer to children or
 * siblings, i.e. `foo/bar.md` is okay, but `../foo/bar.md` is NOT supported.
 *
 * @param fileID
 * @param files
 * @param ctx
 */
export const tangleString = (
	fileID: string,
	files: IObjectOf<string>,
	ctx: Partial<TangleCtx> = {}
) =>
	tangleFile(fileID, {
		fs: {
			isAbsolute: (path) => path[0] === "/" || path[0] === "\\",
			resolve: (...path) => path[path.length - 1],
			read: (path, logger) => {
				logger.debug("reading file ref", path);
				const body = files[path];
				return body !== undefined
					? body
					: illegalArgs(`missing file for ref: ${path}`);
			},
		},
		...ctx,
	});
