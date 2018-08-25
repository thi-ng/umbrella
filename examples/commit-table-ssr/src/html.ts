import { serialize } from "@thi.ng/hiccup";
import { mergeDeepObj } from "@thi.ng/associative/merge-deep";
import { map } from "@thi.ng/transducers/xform/map";
import { HTMLDoc, AppContext } from "./api";
import { DEFAULT_DOC } from "./config";

/**
 * Takes a `HTMLDoc` object and serializes it into an HTML5 string. The
 * `body` field of the document must contain elements in thi.ng/hiccup
 * format, i.e. it's an array in which each element is a nested array,
 * string or ES6 iterable, each encoding a part of the full DOM to be
 * generated. The resulting HTML string will not contain any whitespace
 * unless it's part of string values.
 *
 * See here for more reference:
 * https://github.com/thi-ng/umbrella/tree/master/packages/hiccup
 *
 * @param doc
 */
export const html = (doc: HTMLDoc) => {
    doc = mergeDeepObj(DEFAULT_DOC, doc);
    return `<!DOCTYPE html>${serialize(
        ["html", { lang: doc.lang || "en" },
            ["head",
                map((meta) => ["meta", meta], doc.head.meta),
                ["title", doc.head.title],
                map((link) => ["link", link], doc.head.links),
                map((script) => ["script", script], doc.head.scripts),
                map((css) => ["style", css], doc.head.styles),
            ],
            [body, ...doc.body]
        ],
        doc.ctx
    )}`;
};

const body = (ctx: AppContext, ...body) =>
    ["body", ctx.ui.body, ...body];
