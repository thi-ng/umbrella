import type { Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { ESCAPES } from "@thi.ng/strings/escape";
import { split } from "@thi.ng/strings/split";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";
import type {
	ColumnSpec,
	CommonCSVOpts,
	CSVOpts,
	CSVRecord,
	CSVRow,
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
 * - thi.ng/transducers
 * - {@link CSVOpts}
 * - {@link parseCSVFromString}.
 *
 * @example
 * ```ts
 * import { parseCSV, upper, float } from "@thi.ng/csv";
 *
 * [...parseCSV(
 *   {
 *     all: false,
 *     cols: {
 *       "country": { tx: upper },
 *       "latitude": { alias: "lat", tx: float() },
 *       "longitude": { alias: "lon", tx: float() },
 *     }
 *   },
 *   [
 *      `"country","country group","name (en)","latitude","longitude"`,
 *      `"at","eu","Austria","47.6965545","13.34598005"`,
 *      `"be","eu","Belgium","50.501045","4.47667405"`,
 *      `"bg","eu","Bulgaria","42.72567375","25.4823218"`,
 *   ]
 * )]
 *
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
		: (rfn: Reducer<any, CSVRecord>) => {
				const { all, cols, delim, quote, comment, trim, header } = {
					all: true,
					...DEFAULT_OPTS,
					...opts,
				};
				const reduce = rfn[2];
				let index: Record<string, IndexEntry>;
				let revIndex: Record<number, string>;
				let first = true;
				let isQuoted = false;
				let record: string[] = [];

				const init = (header: string[]) => {
					cols && (index = initIndex(header, cols));
					all && (revIndex = initRevIndex(header));
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

				header && init(header);

				return compR(rfn, (acc, line: string) => {
					if (
						(!line.length || line.startsWith(comment!)) &&
						!isQuoted
					)
						return acc;
					if (!first) {
						isQuoted = parseLine(
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
						record = [];
						return reduce(acc, row);
					} else {
						isQuoted = parseLine(
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
 * ```ts
 * [...parseCSVSimple({ cols: [float(), ,float()]}, ["a,b,c","1,2,3","4,5,6"])]
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
		: (rfn: Reducer<any, CSVRecord>) => {
				const { cols, delim, quote, comment, trim, header } = {
					header: true,
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
						isQuoted = parseLine(
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
						isQuoted = parseLine(
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
 * [`split()`](https://docs.thi.ng/umbrella/strings/functions/split.html).
 *
 * @param opts -
 * @param src -
 */
export const parseCSVFromString = (opts: Partial<CSVOpts>, src: string) =>
	parseCSV(opts, split(src));

/**
 * Syntax sugar for iterator version of {@link parseCSVSimple}, efficiently
 * splitting given source string into a line based input using
 * [`split()`](https://docs.thi.ng/umbrella/strings/functions/split.html).
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
 */
const parseLine = (
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
			collectCell(acc, curr, openQuote);
			openQuote = false;
			curr = "";
		}
		// record unless escape seq start
		else if (c !== "\\") {
			curr += c;
		}
		p = c;
	}
	curr !== "" && collectCell(acc, curr, openQuote);
	return isQuoted;
};

const collectCell = (acc: string[], curr: string, openQuote: boolean) =>
	openQuote ? (acc[acc.length - 1] += "\n" + curr) : acc.push(curr);

const initIndex = (
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
					cols![id] ? ((acc[id] = { i, spec: cols![id] }), acc) : acc,
				<Record<string, IndexEntry>>{}
		  );

const initRevIndex = (line: string[]) =>
	line.reduce((acc, x, i) => ((acc[i] = x), acc), <Record<number, string>>{});
