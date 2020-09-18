import { IObjectOf, NULL_LOGGER } from "@thi.ng/api";
import { illegalState, unsupported } from "@thi.ng/errors";
import * as $prefixes from "@thi.ng/prefixes";
import { unescape } from "@thi.ng/strings";
import { readFileSync } from "fs";
import { dirname, resolve as resolvePath } from "path";
import { IS_NODE, Node, ParseContext, ParseOpts, TagParser } from "./api";
import { BUILTINS } from "./tags";
import { qualifiedID } from "./utils";

const INCLUDE = "@include ";
const PREFIX = "@prefix ";

export const parse = (src: string, ctx: ParseContext) => {
    const lines = src.split(/\r?\n/);
    const nodes = ctx.nodes;
    const usePrefixes = ctx.opts.prefixes;
    for (let i = 0, n = lines.length; i < n; ) {
        let subj = lines[i++];
        if (!subj.length || subj[0] === ";") continue;
        if (subj[0] === "@") {
            if (subj.startsWith(INCLUDE)) {
                parseInclude(subj, ctx);
                continue;
            } else if (subj.startsWith(PREFIX)) {
                usePrefixes && parsePrefix(subj, ctx);
                continue;
            }
        }
        subj = unescape(subj);
        usePrefixes && (subj = qualifiedID(ctx.prefixes, subj));
        const curr: Node = nodes[subj] || (nodes[subj] = { $id: subj });
        while (i < n) {
            let line = lines[i];
            if (line[0] === "\t" || line.startsWith("    ")) {
                i = parseProp(curr, ctx, line, lines, i);
            } else if (!line.length) {
                i++;
                break;
            } else if (line[0] === ";") {
                i++;
            } else illegalState(`expected property or comment @ line: ${i}`);
        }
    }
    ctx.opts.resolve && ctx.opts.prune && pruneNodes(ctx);
    return ctx;
};

const parseInclude = (line: string, ctx: ParseContext) => {
    const path = unescape(line.substr(INCLUDE.length));
    if (IS_NODE && ctx.opts.includes) {
        $parseFile(path, {
            ...ctx,
            cwd: dirname(ctx.file),
            prefixes: { ...ctx.prefixes },
            opts: { ...ctx.opts, prune: false },
        });
    } else {
        ctx.logger.debug("skipping include:", path);
    }
};

const RE_PREFIX = /^([a-z0-9-_$]*)$/i;

const parsePrefix = (line: string, ctx: ParseContext) => {
    const idx = line.indexOf(": ", PREFIX.length);
    if (idx > 0) {
        const id = unescape(line.substring(PREFIX.length, idx));
        if (RE_PREFIX.test(id)) {
            const val = unescape(line.substr(idx + 2).trim());
            if (val.length) {
                ctx.logger.debug(`declare prefix: ${id} = ${val}`);
                ctx.prefixes[id] = val;
                return;
            }
        }
    }
    illegalState(`invalid prefix decl: ${line}`);
};

const parseTag: TagParser = (tag, body, ctx) => {
    const parser = ctx.tags[tag] || ctx.defaultTag;
    return parser
        ? parser(tag, body, ctx)
        : unsupported(`missing parser for tag: ${tag}`);
};

const parseProp = (
    node: Node,
    ctx: ParseContext,
    line: string,
    lines: string[],
    i: number
) => {
    const idx0 = line[0] === "\t" ? 1 : 4;
    if (line[idx0] === ";") return ++i;
    let idx = line.indexOf(" ", idx0);
    let key = unescape(line.substring(idx0, idx));
    ctx.opts.prefixes && (key = qualifiedID(ctx.prefixes, key));
    let tag: string | undefined;
    let body: string;
    idx++;
    if (line[idx] === "-" && line[idx + 1] === ">") {
        addProp(
            ctx.index,
            node,
            key,
            parseRef(unescape(line.substr(idx + 2).trim()), ctx)
        );
        return ++i;
    } else if (line[idx] === "#") {
        const tstart = idx + 1;
        idx = line.indexOf(" ", tstart);
        tag = unescape(line.substring(tstart, idx));
        idx++;
    }
    if (line[idx] === ">" && line[idx + 1] === ">" && line[idx + 2] === ">") {
        body = line.substr(idx + 3);
        idx = body.indexOf("<<<");
        if (idx < 0) {
            const n = lines.length;
            let closed = false;
            while (++i < n) {
                line = lines[i];
                idx = line.indexOf("<<<");
                if (idx >= 0) {
                    body += "\n" + line.substr(0, idx);
                    closed = true;
                    i++;
                    break;
                } else {
                    body += "\n" + line;
                }
            }
            !closed && illegalState("unterminated value, EOF reached");
        } else {
            body = body.substr(0, idx);
            i++;
        }
    } else {
        body = line.substr(idx);
        i++;
    }
    body = body.trim();
    addProp(
        ctx.index,
        node,
        key,
        tag ? parseTag(tag, body, ctx) : unescape(body)
    );
    return i;
};

const addProp = (
    index: IObjectOf<number>,
    acc: Node,
    key: string,
    val: any
) => {
    const exist = acc[key];
    const id = acc.$id + "~" + key;
    if (exist !== undefined) {
        ++index[id] > 2 ? exist.push(val) : (acc[key] = [exist, val]);
    } else {
        acc[key] = val;
        index[id] = 1;
    }
};

const parseRef = (id: string, ctx: ParseContext) => {
    ctx.opts.prefixes && (id = qualifiedID(ctx.prefixes, id));
    return ctx.opts.resolve
        ? ctx.nodes[id] || (ctx.nodes[id] = { $id: id })
        : {
              $ref: id,
              deref() {
                  return ctx.nodes[id];
              },
              equiv(o: any) {
                  return o != null && o.$ref === this.$ref;
              },
          };
};

const pruneNodes = ({ nodes, logger }: ParseContext) => {
    for (let id in nodes) {
        const keys = Object.keys(nodes[id]);
        if (keys.length === 1 && keys[0] === "$id") {
            logger.debug("pruning node:", id);
            delete nodes[id];
        }
    }
};

const initContext = (ctx: Partial<ParseContext> = {}) => {
    const opts = <ParseOpts>{
        decrypt: false,
        includes: true,
        prefixes: false,
        prune: false,
        resolve: false,
        ...ctx.opts,
    };
    return <ParseContext>{
        cwd: ctx.cwd || ".",
        file: ctx.file || "",
        files: ctx.files || [],
        nodes: ctx.nodes || {},
        index: ctx.index || {},
        tags: { ...BUILTINS, ...ctx.tags },
        defaultTag: ctx.defaultTag,
        prefixes: ctx.prefixes
            ? { ...ctx.prefixes }
            : { ...$prefixes, void: $prefixes.VOID },
        logger: ctx.logger || NULL_LOGGER,
        opts,
    };
};

/** @interal */
export const $parseFile = (path: string, ctx?: Partial<ParseContext>) => {
    const $ctx = initContext(ctx);
    $ctx.file = path = resolvePath($ctx.cwd, path);
    if ($ctx.files.includes(path)) {
        $ctx.logger.warn("file already processed, skipping:", path);
        return $ctx;
    }
    $ctx.files.push(path);
    $ctx.logger.debug("loading file:", path);
    return parse(readFileSync(path).toString(), $ctx);
};

/**
 * Parses EGF graph from given local file name, using provided options (if any)
 * to customize the parser. Returns object of graph `nodes` and `prefixes`.
 *
 * @param path
 * @param ctx
 */
export const parseFile = (path: string, ctx?: Partial<ParseContext>) => {
    const res = $parseFile(path, ctx);
    return { nodes: res.nodes, prefixes: res.prefixes };
};

/**
 * Parses EGF graph from given string and provided options (if any) to customize
 * the parser. Returns object of graph `nodes` and `prefixes`.
 *
 * @param path
 * @param ctx
 */
export const parseString = (src: string, ctx?: Partial<ParseContext>) => {
    const res = parse(src, initContext(ctx));
    return { nodes: res.nodes, prefixes: res.prefixes };
};
