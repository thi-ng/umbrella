import type { IObjectOf } from "@thi.ng/api";
import { unescape } from "@thi.ng/strings/escape";
import { maybeParseFloat, maybeParseInt } from "@thi.ng/strings/parse";
import { base64Decode } from "@thi.ng/transducers-binary/base64";
import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import { IS_NODE, NODE_ONLY, TagParser } from "./api";

export const BUILTINS: IObjectOf<TagParser> = {
    base64: IS_NODE
        ? (_, body) => Buffer.from(body, "base64")
        : (_, body) => base64Decode(body),
    date: (_, body) => new Date(body),
    file: (_, path, ctx) => {
        if (IS_NODE && ctx.opts.includes) {
            path = resolvePath(ctx.opts.root!, unescape(path));
            ctx.logger.debug("loading value from:", path);
            return readFileSync(path).toString();
        } else {
            ctx.logger.debug("skipping file value:", path);
            return path;
        }
    },
    gpg: IS_NODE
        ? (_, body, ctx) =>
              (ctx.opts.decrypt
                  ? execFileSync("gpg", ["--decrypt"], {
                        input: body,
                    }).toString()
                  : body
              ).trim()
        : NODE_ONLY,
    hex: (_, body) => maybeParseInt(body, 0, 16),
    json: (_, body) => JSON.parse(unescape(body)),
    list: (_, body) => body.split(/[\n\r\t ]+/g).map(unescape),
    num: (_, body) => maybeParseFloat(body, 0),
};
