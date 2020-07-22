import type { Fn3 } from "@thi.ng/api";
import { defmulti, DEFAULT } from "@thi.ng/defmulti";
import { maybeParseFloat, maybeParseInt } from "@thi.ng/strings";
import { base64Decode } from "@thi.ng/transducers-binary";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve as resolvePath } from "path";
import { IS_NODE, NODE_ONLY, ParseContext } from "./api";
import { qualifiedID } from "./utils";

export const parseTag = defmulti<string, string, ParseContext, any>(
    (tag) => tag
);

parseTag.addAll({
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
    ref: (_, id, ctx) => {
        id = ctx.opts.prefixes ? qualifiedID(ctx.prefixes, id) : id;
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
    },
});

export const registerTag = (
    tag: string,
    fn: Fn3<string, string, ParseContext, any>
) => parseTag.add(tag, fn);

export const enableUnknownTags = () => parseTag.add(DEFAULT, (_, x) => x);

export const disableUnknownTags = () => parseTag.remove(DEFAULT);
