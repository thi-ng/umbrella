import { map } from "@thi.ng/transducers/xform/map";

import { AppContext } from "../api";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";

const thead = (ctx: AppContext, head: Iterable<any>) =>
    ["thead",
        [row, ctx.ui.table.head.row,
            map((x) => ["th", ctx.ui.table.head.cell, x], head)]];

const row = (ctx: AppContext, attribs: any, body: Iterable<any>) =>
    ["tr", { ...ctx.ui.table.row, ...attribs }, ...body];

export const table = (ctx: AppContext, layout: any[], head: Iterable<any>, body: Iterable<Iterable<any>>) =>
    ["table", ctx.ui.table.root,
        map((x) => ["col", { style: { width: x } }], layout || []),
        [thead, head],
        mapcat(([hd, rows]) =>
            [
                hd ? [thead, hd] : null,
                ["tbody",
                    map((cols: any) => [row, null, map((x) => ["td", ctx.ui.table.cell, x], cols)], rows)
                ]
            ],
            body
        )
    ];
