import type { IObjectOf } from "@thi.ng/api";
import { readFileSync } from "fs";

const RE_IGNORE = /^\w+\/vnd\./;

const LO_PRIORITIES: IObjectOf<string> = {
    "3gpp": "audio/3gpp",
    mp3: "audio/mp3",
    wav: "audio/wave",
    x3db: "model/x3d+binary",
    x3dv: "model/x3d+vrml",
    rtf: "text/rtf",
    xml: "text/xml",
    jpm: "video/jpm",
};

// Source: https://raw.githubusercontent.com/jshttp/mime-db/master/db.json
const src = JSON.parse(readFileSync("tools/mime-db.json", "utf-8"));

const dest: IObjectOf<IObjectOf<string | string[]>> = {};

for (let type in src) {
    const ext = src[type].extensions;
    if (!ext || RE_IGNORE.test(type)) continue;
    const [prefix, suffix] = type.split("/");
    let group = dest[prefix];
    if (!group) {
        dest[prefix] = group = {};
    }
    const $ext = ext
        .map((e: string) => (LO_PRIORITIES[e] === type ? "*" : "") + e)
        .join(",");
    group[suffix] = $ext;
}

console.log(
    `/**
 * generated @ ${new Date().toISOString()} - DO NOT EDIT!
 *
 * @internal
 */
export const DB: Record<string, Record<string, string>> =`,
    dest
);
