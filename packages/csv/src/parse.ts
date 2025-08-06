// SPDX-License-Identifier: Apache-2.0
import type { Maybe, Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { ESCAPES } from "@thi.ng/strings/escape";
import { split } from "@thi.ng/strings/split";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";
import type {
	CSVOpts,
	CSVRecord,
	CSVRow,
	ColumnSpec,
	CommonCSVOpts,
	SimpleCSVOpts,
} from "./api.js";

/** @internal */
type IndexEntry = { i: number; spec: ColumnSpec };

/**
 * Default parser options.
 *
 * @internal
 */
const DEFAULT_OPTS: Partial<CommonCSVOpts> = {
	delim: ",",
	quote: '"',
	comment: "#",
	trim: false,
};

/**
 * Configurable CSV parsing transducer, operating on line-based string iterables
 * and yielding tuple objects of CSV row records. If called with input, returns
 * ES6 iterator instead.
 *
 * @remarks
 * Parsing behavior can be customized via given {@link CSVOpts}. The default
 * behavior is:
 *
 * - comma delimiter
 * - field names are obtained from first line/row
 * - all columns are processed, but no coercions
 * - untrimmed cell values
 * - line comment prefix `#`
 *
 * Using the `cols` option, specific columns can be renamed and their values
 * coerced/transformed. Additionally, if `all` option is `false`, then the
 * result objects will only contain values of the columns specified in `cols`.
 *
 * Also see:
 *
 * - thi.ng/transducers
 * - {@link CSVOpts}
 * - {@link parseCSVFromString}.
 *
 * @example
 * ```ts tangle:../export/parse-csv.ts
 * import { parseCSV, upper, float } from "@thi.ng/csv";
 *
 * console.log(
 *   [...parseCSV(
 *     {
 *       all: false,
 *       cols: {
 *         "country": { tx: upper },
 *         "latitude": { alias: "lat", tx: float() },
 *         "longitude": { alias: "lon", tx: float() },
 *       }
 *     },
 *     [
 *        `"country","country group","name (en)","latitude","longitude"`,
 *        `"at","eu","Austria","47.6965545","13.34598005"`,
 *        `"be","eu","Belgium","50.501045","4.47667405"`,
 *        `"bg","eu","Bulgaria","42.72567375","25.4823218"`,
 *     ]
 *   )]
 * );
 * // [
 * //   { country: 'AT', lat: 47.6965545, lon: 13.34598005 },
 * //   { country: 'BE', lat: 50.501045, lon: 4.47667405 },
 * //   { country: 'BG', lat: 42.72567375, lon: 25.4823218 }
 * // ]
 * ```
 *
 * @param opts -
 */
export function parseCSV(
	opts?: Partial<CSVOpts>
): Transducer<string, CSVRecord>;
export function parseCSV(
	opts: Partial<CSVOpts>,
	src: Iterable<string>
): IterableIterator<CSVRecord>;
export function parseCSV(opts?: Partial<CSVOpts>, src?: Iterable<string>): any {
	return isIterable(src)
		? iterator1(parseCSV(opts), src)
		: (rfn: Reducer<CSVRecord, any>) => {
				const {
					all = true,
					cols,
					comment,
					delim,
					header,
					quote,
					trim,
				} = {
					...DEFAULT_OPTS,
					...opts,
				};
				const reduce = rfn[2];
				let index: Record<string, IndexEntry>;
				let revIndex: Record<number, string>;
				let defaults: Maybe<ColumnSpec[]>;
				let first = true;
				let isQuoted = false;
				let record: string[] = [];

				const init = (header: string[]) => {
					if (cols) {
						index = __initIndex(header, cols);
						defaults = __initDefaults(cols);
					}
					if (all) revIndex = __initRevIndex(header);
					first = false;
				};

				const collectAll = (row: CSVRecord) =>
					record.reduce(
						(acc, x, i) => (
							(acc[revIndex[i]] = trim ? x.trim() : x), acc
						),
						row
					);

				const collectIndexed = (row: CSVRecord) =>
					Object.entries(index).reduce((acc, [id, { i, spec }]) => {
						let val = record[i];
						if (val !== undefined) {
							trim && (val = val.trim());
							all && spec.alias && delete acc[id];
							acc[spec.alias || id] = spec.tx
								? spec.tx(val, acc)
								: val;
						}
						return acc;
					}, row);

				const collectDefaults = (row: CSVRecord) =>
					defaults!.reduce((acc, { alias, default: val }) => {
						if (acc[alias!] === undefined || acc[alias!] === "") {
							acc[alias!] = isFunction(val) ? val(acc) : val;
						}
						return acc;
					}, row);

				header && init(header);

				return compR(rfn, (acc, line: string) => {
					if (
						(!line.length || line.startsWith(comment!)) &&
						!isQuoted
					)
						return acc;
					if (!first) {
						isQuoted = __parseLine(
							line,
							record,
							isQuoted,
							delim!,
							quote!
						);
						if (isQuoted) return acc;

						const row: CSVRecord = {};
						all && collectAll(row);
						index && collectIndexed(row);
						defaults && collectDefaults(row);
						record = [];
						return reduce(acc, row);
					} else {
						isQuoted = __parseLine(
							line,
							record,
							isQuoted,
							delim!,
							quote!
						);
						if (!isQuoted) {
							init(record);
							record = [];
						}
						return acc;
					}
				});
		  };
}

/**
 * Simplified version of {@link parseCSV} for use cases when no object mapping
 * is desired/required. Here, each CSV row will be emitted as simple array,
 * optionally with only filtered or transformed columns.
 *
 * @remarks
 * See {@link SimpleCSVOpts} for available options. Defaults are similar to
 * those used by {@link parseCSV}.
 *
 * @example
 * ```ts tangle:../export/parse-csv-simple.ts
 * import { parseCSVSimple, float } from "@thi.ng/csv";
 *
 * console.log(
 *   [...parseCSVSimple(
 *     { cols: [float(), null,float()]},
 *     ["a,b,c","1,2,3","4,5,6"])
 *   ]
 * );
 * // [ [ 1, 3 ], [ 4, 6 ] ]
 * ```
 *
 * @param opts -
 */
export function parseCSVSimple(
	opts?: Partial<SimpleCSVOpts>
): Transducer<string, CSVRow>;
export function parseCSVSimple(
	opts: Partial<SimpleCSVOpts>,
	src: Iterable<string>
): IterableIterator<CSVRow>;
export function parseCSVSimple(
	opts?: Partial<SimpleCSVOpts>,
	src?: Iterable<string>
): any {
	return isIterable(src)
		? iterator1(parseCSVSimple(opts), src)
		: (rfn: Reducer<CSVRecord, any>) => {
				const {
					header = true,
					cols,
					comment,
					delim,
					quote,
					trim,
				} = {
					...DEFAULT_OPTS,
					...opts,
				};
				const reduce = rfn[2];
				let first = header;
				let isQuoted = false;
				let record: string[] = [];

				const collect = () =>
					cols!.reduce((acc, col, i) => {
						if (col) {
							let val = record[i];
							if (val !== undefined) {
								trim && (val = val.trim());
								acc.push(isFunction(col) ? col(val, acc) : val);
							}
						}
						return acc;
					}, <CSVRow>[]);

				return compR(rfn, (acc, line: string) => {
					if (
						(!line.length || line.startsWith(comment!)) &&
						!isQuoted
					)
						return acc;
					if (!first) {
						isQuoted = __parseLine(
							line,
							record,
							isQuoted,
							delim!,
							quote!
						);
						if (isQuoted) return acc;
						const row: CSVRow = cols ? collect() : record;
						record = [];
						return reduce(acc, row);
					} else {
						isQuoted = __parseLine(
							line,
							record,
							isQuoted,
							delim!,
							quote!
						);
						first = false;
						record = [];
						return acc;
					}
				});
		  };
}

/**
 * Syntax sugar for iterator version of {@link parseCSV}, efficiently splitting
 * given source string into a line based input using
 * [`split`](https://docs.thi.ng/umbrella/strings/functions/split.html).
 *
 * @param opts -
 * @param src -
 */
export const parseCSVFromString = (opts: Partial<CSVOpts>, src: string) =>
	parseCSV(opts, split(src));

/**
 * Syntax sugar for iterator version of {@link parseCSVSimple}, efficiently
 * splitting given source string into a line based input using
 * [`split`](https://docs.thi.ng/umbrella/strings/functions/split.html).
 *
 * @param opts -
 * @param src -
 */
export const parseCSVSimpleFromString = (
	opts: Partial<SimpleCSVOpts>,
	src: string
) => parseCSVSimple(opts, split(src));

/**
 * Parses line into `acc`, taking quoted cell values and linebreaks into
 * account.
 *
 * @remarks
 * If `isQuoted` is true, the previous line ended with a quoted cell value,
 * which might only end in the new or a future line. If that's the case, then
 * the current line's contents will be added to the current last value of `acc`
 * until the quoted cell is complete.
 *
 * Function returns current state of `isQuoted` (i.e. if line terminated in a
 * quoted cell) and should be (re)called with new lines until it returns false.
 *
 * @param line -
 * @param acc -
 * @param isQuoted -
 * @param delim -
 * @param quote -
 *
 * @internal
 */
const __parseLine = (
	line: string,
	acc: string[],
	isQuoted: boolean,
	delim: string,
	quote: string
) => {
	let curr = "";
	let p = "";
	let openQuote = isQuoted;
	for (let i = 0, n = line.length; i < n; i++) {
		const c = line[i];
		// escaped char
		if (p === "\\") {
			curr += ESCAPES[c] || c;
		}
		// quote open/close & CSV escape pair (aka `""`)
		else if (c === quote) {
			if (!isQuoted) {
				p = "";
				isQuoted = true;
				continue;
			} else if (p === quote) {
				curr += quote;
				p = "";
				continue;
			} else if (line[i + 1] !== quote) isQuoted = false;
		}
		// field delimiter
		else if (!isQuoted && c === delim) {
			__collectCell(acc, curr, openQuote);
			openQuote = false;
			curr = "";
		}
		// record unless escape seq start
		else if (c !== "\\") {
			curr += c;
		}
		p = c;
	}
	curr !== "" && __collectCell(acc, curr, openQuote);
	return isQuoted;
};

/** @internal */
const __collectCell = (acc: string[], curr: string, openQuote: boolean) =>
	openQuote ? (acc[acc.length - 1] += "\n" + curr) : acc.push(curr);

/** @internal */
const __initIndex = (
	line: string[],
	cols: Nullable<ColumnSpec>[] | Record<string, ColumnSpec>
) =>
	isArray(cols)
		? cols.reduce((acc, spec, i) => {
				if (spec) {
					const alias = spec.alias || line[i] || String(i);
					acc[alias] = { i, spec: { alias, ...spec } };
				}
				return acc;
		  }, <Record<string, IndexEntry>>{})
		: line.reduce(
				(acc, id, i) =>
					cols[id] ? ((acc[id] = { i, spec: cols[id] }), acc) : acc,
				<Record<string, IndexEntry>>{}
		  );

/** @internal */
const __initRevIndex = (line: string[]) =>
	line.reduce((acc, x, i) => ((acc[i] = x), acc), <Record<number, string>>{});

/** @internal */
const __initDefaults = (
	cols: Nullable<ColumnSpec>[] | Record<string, ColumnSpec>
) => {
	const defaults = isArray(cols)
		? <ColumnSpec[]>cols.filter((c) => {
				if (!c || c.default == undefined) return false;
				if (!c.alias)
					illegalArgs(
						`missing column alias for default: ${c.default}`
					);
				return true;
		  })
		: Object.entries(cols).reduce((acc, [k, v]) => {
				if (v.default !== undefined) {
					acc.push({
						alias: v.alias ?? k,
						default: v.default,
					});
				}
				return acc;
		  }, <ColumnSpec[]>[]);
	return defaults.length ? defaults : undefined;
};
