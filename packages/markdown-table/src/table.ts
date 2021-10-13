import type { Fn, Keys } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import { juxt } from "@thi.ng/compose/juxt";
import { assert } from "@thi.ng/errors/assert";
import type { Stringer } from "@thi.ng/strings";
import { center } from "@thi.ng/strings/center";
import { padLeft } from "@thi.ng/strings/pad-left";
import { padRight } from "@thi.ng/strings/pad-right";
import { repeat } from "@thi.ng/strings/repeat";
import { wrap } from "@thi.ng/strings/wrap";
import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { last } from "@thi.ng/transducers/last";
import { map } from "@thi.ng/transducers/map";
import { max } from "@thi.ng/transducers/max";
import { multiplex } from "@thi.ng/transducers/multiplex";
import { repeat as $repeat } from "@thi.ng/transducers/repeat";
import { repeatedly } from "@thi.ng/transducers/repeatedly";
import { scan } from "@thi.ng/transducers/scan";
import { transduce } from "@thi.ng/transducers/transduce";
import type { Align, Column, Row, TableOpts } from "./api.js";

const PADS: Record<Align, Fn<number, Stringer<string>>> = {
    c: center,
    l: padRight,
    r: padLeft,
};

const SEPS: Record<Align, Stringer<number>> = {
    c: (x) => `:${repeat("-", x)}:`,
    l: (x) => `:${repeat("-", x + 1)}`,
    r: (x) => `${repeat("-", x + 1)}:`,
};

/**
 * Takes an array of column titles, an iterable of `rows` and (optional) table
 * options (e.g. column alignments). Returns string of formatted Markdown table.
 *
 * @remarks
 * Each `row` is a string array. Nullish cells/columns are allowed. Rows
 * can also be empty. By default all columns are left-aligned.
 *
 * @example
 * ```ts
 * markdownTable(
 *   ["ID", "Actor", "Comment"],
 *   [
 *     [1, "Alice"],
 *     [201, "Bob", "(foe)"],
 *     [3003, "Charlie", null],
 *     [44, "Dora", "(recipient)"],
 *   ],
 *   { bold: true, align: ["r", "c", "l"] }
 * );
 *
 * // | **ID** | **Actor** | **Comment** |
 * // |-------:|:---------:|:------------|
 * // |      1 |   Alice   |             |
 * // |    201 |    Bob    | (foe)       |
 * // |   3003 |  Charlie  |             |
 * // |     44 |   Dora    | (recipient) |
 * ```
 *
 * @param header
 * @param rows
 * @param opts
 */
export const table = (
    header: string[],
    rows: Iterable<Row>,
    opts: Partial<TableOpts> = {}
) => {
    const numColumns = header.length;
    const align = opts.align || [...$repeat<Align>("l", numColumns)];
    assert(align.length === numColumns, `invalid/missing column alignments`);
    opts.bold && (header = header.map(wrap("**")));
    const body = [header, ...rows];
    const widths = transduce(
        multiplex(
            ...(<[Transducer<Row, number>]>[
                ...repeatedly(
                    (i) =>
                        comp(
                            map((row: Row) =>
                                row[i] != null ? String(row[i]).length : 0
                            ),
                            scan(max())
                        ),
                    numColumns
                ),
            ])
        ),
        last<number[]>(),
        body
    );
    const pads = widths.map((w, i) => PADS[align![i]](w));
    const colIDs = [...repeatedly((x) => x, numColumns)];
    const result = body.map(
        (row) => colIDs.map((i) => `| ${pads[i](str(row[i]))} `).join("") + "|"
    );
    result.splice(
        1,
        0,
        widths.map((w, i) => `|${SEPS[align![i]](w)}`).join("") + "|"
    );
    return result.join("\n");
};

/**
 * Similar to {@link table}, however accepts rows as objects and looks up column
 * values using given `keys` array.
 *
 * @example
 * ```ts
 * tableKeys(
 *   ["ID", "Actor", "Comment"],
 *   ["id", "name", (x) => x.hint],
 *   [
 *       { id: 1, name: "Alice" },
 *       { id: 201, name: "Bob", hint: "(foe)" },
 *       { id: 3003, name: "Charlie" },
 *       { id: 44, name: "Dora", hint: "(recipient)" },
 *   ],
 *   { bold: true, align: ["r", "c", "l"] }
 * )
 *
 * // | **ID** | **Actor** | **Comment** |
 * // |-------:|:---------:|:------------|
 * // |      1 |   Alice   |             |
 * // |    201 |    Bob    | (foe)       |
 * // |   3003 |  Charlie  |             |
 * // |     44 |   Dora    | (recipient) |
 * ```
 *
 * @param headers
 * @param keys
 * @param items
 * @param opts
 */
export const tableKeys = <T>(
    headers: string[],
    keys: (Keys<T> | Fn<T, Column>)[],
    items: Iterable<T>,
    opts?: Partial<TableOpts>
) =>
    table(
        headers,
        map<T, Row>(
            juxt(
                // @ts-ignore
                ...keys.map((k) => (isString(k) ? (x) => str(x[k]) : k))
            ),
            items
        ),
        opts
    );

/** @internal */
const str = (x: any) => (x != null ? String(x) : "");
