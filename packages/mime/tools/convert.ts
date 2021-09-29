import type { IObjectOf } from "@thi.ng/api";
import { readFileSync, writeFileSync } from "fs";

const RE_IGNORE = /^\w+\/vnd\./;

// always include types listed here...
const INCLUDE = new Set<string>([
    "application/vnd.apple.installer+xml",
    "application/vnd.apple.keynote",
    "application/vnd.apple.mpegurl",
    "application/vnd.apple.numbers",
    "application/vnd.apple.pages",
    "application/vnd.apple.pkpass",
    "application/vnd.google-apps.document",
    "application/vnd.google-apps.presentation",
    "application/vnd.google-apps.spreadsheet",
    "application/vnd.google-earth.kml+xml",
    "application/vnd.google-earth.kmz",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
    "application/vnd.openstreetmap.data+xml",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
    "application/vnd.rar",
    "application/vnd.unity",
    "image/vnd.adobe.photoshop",
    "image/vnd.dwg",
    "image/vnd.dxf",
    "image/vnd.microsoft.icon",
    "model/vnd.usdz+zip",
    "text/vnd.graphviz",
]);

const LO_PRIORITIES: IObjectOf<string> = {
    "3gpp": "audio/3gpp",
    jpm: "video/jpm",
    markdown: "text/markdown",
    mp3: "audio/mp3",
    rtf: "text/rtf",
    wav: "audio/wave",
    x3db: "model/x3d+binary",
    x3dv: "model/x3d+vrml",
    xml: "text/xml",
};

// Source: https://raw.githubusercontent.com/jshttp/mime-db/master/db.json
const src = JSON.parse(readFileSync("tools/mime-db.json", "utf-8"));

// Destination index w/ prefilled types not included in mime-db
const dest: IObjectOf<IObjectOf<string>> = {
    // see: https://twitter.com/toxi/status/1378719456269058058
    application: {
        "x-sidefx-houdini-project": "hip,hipnc,hiplc",
        "x-sidefx-houdini-asset": "hda",
    },
    image: {
        // http://fileformats.archiveteam.org/wiki/Radiance_HDR
        "vnd.radiance": "hdr,*pic,rgbe,xyze",
    },
    model: {
        // Houdini default extension for binary STL models
        "stl+binary": "bstl",
        // Houdini geometry formats
        "x-sidefx-houdini": "geo",
        "x-sidefx-houdini+binary": "bgeo",
    },
};

// build index
for (let type in src) {
    const ext = src[type].extensions;
    if (!ext || (RE_IGNORE.test(type) && !INCLUDE.has(type))) continue;
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

// sort groups
const result: any = {};
for (let gid of Object.keys(dest).sort()) {
    const group = dest[gid];
    result[gid] = Object.keys(group)
        .sort()
        .reduce((acc, id) => ((acc[id] = group[id]), acc), <any>{});
}

const body = `// thing:no-export
/**
 * generated @ ${new Date().toISOString()} - DO NOT EDIT!
 *
 * @internal
 */
export const DB: Record<string, Record<string, string>> = ${JSON.stringify(
    result,
    null,
    4
)}`;

writeFileSync("src/generated.ts", body, "utf-8");
