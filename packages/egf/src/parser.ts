import { NULL_LOGGER } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { illegalState } from "@thi.ng/errors";
import * as $prefixes from "@thi.ng/prefixes";
import { readFileSync } from "fs";
import { dirname, resolve as resolvePath } from "path";
import { IS_NODE, Node, ParseContext, ParseOpts } from "./api";
import { parseTag } from "./tags";
import { qualifiedID } from "./utils";

const INCLUDE = "@include ";
const PREFIX = "@prefix ";
const OPEN = ">>>";
const CLOSE = "<<<";
const EOF = "unterminated value, EOF reached";

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
    return ctx;
};

const parseInclude = (line: string, ctx: ParseContext) => {
    const path = line.substr(INCLUDE.length);
    if (IS_NODE && ctx.opts.includes) {
        parseFile(path, {
            ...ctx,
            cwd: dirname(ctx.file),
            prefixes: { ...ctx.prefixes },
        });
    } else {
        ctx.logger.debug("skipping include:", path);
    }
};

const RE_PREFIX = /^([a-z0-9-_$]*)$/i;

const parsePrefix = (line: string, ctx: ParseContext) => {
    const idx = line.indexOf(": ", PREFIX.length);
    if (idx > 0) {
        const id = line.substring(PREFIX.length, idx);
        if (RE_PREFIX.test(id)) {
            const val = line.substr(idx + 2).trim();
            if (val.length) {
                ctx.logger.debug(`declare prefix: ${id} = ${val}`);
                ctx.prefixes[id] = val;
                return;
            }
        }
    }
    illegalState(`invalid prefix decl: ${line}`);
};

const parseProp = (
    acc: Node,
    ctx: ParseContext,
    line: string,
    lines: string[],
    i: number
) => {
    const idx0 = line[0] === "\t" ? 1 : 4;
    if (line[idx0] === ";") return ++i;
    let idx = line.indexOf(" ", idx0);
    let key = line.substring(idx0, idx);
    ctx.opts.prefixes && (key = qualifiedID(ctx.prefixes, key));
    let tag: string | undefined;
    let body: string;
    idx++;
    if (line[idx] === "#") {
        const tstart = idx + 1;
        idx = line.indexOf(" ", tstart);
        tag = line.substring(tstart, idx);
        idx++;
    }
    if (line.substr(idx, 3) === OPEN) {
        body = line.substr(idx + 3);
        idx = body.indexOf(CLOSE);
        if (idx < 0) {
            const n = lines.length;
            let closed = false;
            while (++i < n) {
                line = lines[i];
                idx = line.indexOf(CLOSE);
                if (idx >= 0) {
                    body += "\n" + line.substr(0, idx);
                    closed = true;
                    i++;
                    break;
                } else {
                    body += "\n" + line;
                }
            }
            !closed && illegalState(EOF);
        } else {
            body = body.substr(0, idx);
            i++;
        }
    } else {
        body = line.substr(idx);
        i++;
    }
    body = body.trim();
    const val = tag ? parseTag(tag, body, ctx) : body;
    const exist = acc[key];
    if (exist) {
        isArray(exist) ? exist.push(val) : (acc[key] = [exist, val]);
    } else {
        acc[key] = val;
    }
    return i;
};

const initContext = (ctx: Partial<ParseContext> = {}) => {
    const opts = <ParseOpts>{
        includes: true,
        prefixes: false,
        decrypt: false,
        resolve: false,
        ...ctx.opts,
    };
    return <ParseContext>{
        cwd: ctx.cwd || ".",
        file: ctx.file || "",
        pid: -1,
        nodes: ctx.nodes || {},
        prefixes: ctx.prefixes
            ? { ...ctx.prefixes }
            : { ...$prefixes, void: $prefixes.VOID },
        logger: ctx.logger || NULL_LOGGER,
        opts,
    };
};

export const parseFile = (path: string, ctx?: Partial<ParseContext>) => {
    const $ctx = initContext(ctx);
    $ctx.file = path = resolvePath($ctx.cwd, path);
    $ctx.logger.debug("loading file:", path);
    return parse(readFileSync(path).toString(), $ctx);
};

export const parseString = (src: string, ctx?: Partial<ParseContext>) =>
    parse(src, initContext(ctx));
