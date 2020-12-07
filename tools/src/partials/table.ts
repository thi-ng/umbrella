import type { IObjectOf, Keys } from "@thi.ng/api";
import { juxt } from "@thi.ng/compose";
import { repeat } from "@thi.ng/strings";
import { Border, tableCanvas, toString } from "@thi.ng/text-canvas";
import {
    comp,
    last,
    map,
    max,
    multiplex,
    scan,
    transduce,
} from "@thi.ng/transducers";

const maxLen = (key: string) =>
    comp<IObjectOf<string>, number, number>(
        map((x) => x[key].length),
        scan(max(), 3)
    );

export const table = <T extends IObjectOf<string>>(
    headers: string[],
    keys: Keys<T>[],
    items: Iterable<T>
) => {
    const colWidths = transduce<any, number[], number[]>(
        // @ts-ignore
        multiplex(...keys.map((k) => maxLen(k))),
        last(),
        items
    );
    const rows = [
        headers,
        [...map((w) => repeat("-", w), colWidths)],
        ...map<T, string[]>(
            // @ts-ignore
            juxt(...keys.map((k) => (x: any) => x[k])),
            items
        ),
    ];
    return toString(
        tableCanvas(
            {
                cols: [...map((width) => ({ width }), colWidths)],
                padding: [1, 0],
                border: Border.V,
            },
            rows
        )
    );
};
