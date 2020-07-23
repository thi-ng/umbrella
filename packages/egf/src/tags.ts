import type { IObjectOf } from "@thi.ng/api";
import { maybeParseFloat, maybeParseInt } from "@thi.ng/strings";
import { base64Decode } from "@thi.ng/transducers-binary";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import { IS_NODE, NODE_ONLY, TagParser } from "./api";

export const BUILTINS: IObjectOf<TagParser> = {
    base64: IS_NODE
        ? (_, body) => {
              const buf = Buffer.from(body, "base64");
              return new Uint8Array(buf.buffer, 0, buf.length);
          }
        : (_, body) => new Uint8Array([...base64Decode(body)]),
    date: (_, body) => new Date(Date.parse(body)),
    file: (_, path, ctx) => {
        if (IS_NODE && ctx.opts.includes) {
            path = resolvePath(ctx.opts.root!, path);
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
                  ? execSync(`echo "${body}" | gpg --decrypt`).toString()
                  : body
              ).trim()
        : NODE_ONLY,
    hex: (_, body) => maybeParseInt(body, 0, 16),
    json: (_, body) => JSON.parse(body),
    list: (_, body) => body.split(/[\n\r\t ]+/g),
    num: (_, body) => maybeParseFloat(body, 0),
};
