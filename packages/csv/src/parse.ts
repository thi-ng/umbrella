import { compR, iterator1, Reducer, Transducer } from "@thi.ng/transducers";
import { ESCAPES, split } from "@thi.ng/strings";
import { isArray, isIterable } from "@thi.ng/checks";
import type { Nullable } from "@thi.ng/api";
import type { ColumnSpec, CSVOpts, CSVRow } from "./api";

/** @internal */
type IndexEntry = { i: number; spec: ColumnSpec };

/**
 * Default parser options.
 *
 * @internal
 */
const DEFAULT_OPTS: Partial<CSVOpts> = {
    all: true,
    delim: ",",
    quote: '"',
    comment: "#",
    trim: false,
};

/**
 * Configurable CSV parsing transducer, operating on line-based string iterables
 * and yielding tuple objects of CSV records. If called with input, returns ES6
 * iterator instead.
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
 * Also see {@link parseCSVString}.
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
 * @param opts
 */
export function parseCSV(opts?: Partial<CSVOpts>): Transducer<string, CSVRow>;
export function parseCSV(
    opts: Partial<CSVOpts>,
    src: Iterable<string>
): IterableIterator<CSVRow>;
export function parseCSV(opts?: Partial<CSVOpts>, src?: Iterable<string>): any {
    return isIterable(src)
        ? iterator1(parseCSV(opts), src)
        : (rfn: Reducer<any, CSVRow>) => {
              const { all, cols, delim, quote, comment, trim, header } = {
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

              const collectAll = (row: CSVRow) =>
                  record.reduce(
                      (acc, x, i) => (
                          (acc[revIndex[i]] = trim ? x.trim() : x), acc
                      ),
                      row
                  );

              const collectIndexed = (row: CSVRow) =>
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
                  if ((!line.length || line.startsWith(comment!)) && !isQuoted)
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

                      const row: CSVRow = {};
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
 * Syntax sugar for iterator version of {@link parseCSV}, efficiently splitting
 * given source string into a line based input using
 * {@link @thi.ng/strings#split}.
 *
 * @param opts
 * @param src
 */
export const parseCSVString = (opts: Partial<CSVOpts>, src: string) =>
    parseCSV(opts, split(src));

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
 * @param line
 * @param acc
 * @param isQuoted
 * @param delim
 * @param quote
 *
 * @internal
 */
export const parseLine = (
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
            if (openQuote) acc[acc.length - 1] += "\n" + curr;
            else acc.push(curr);
            openQuote = false;
            curr = "";
        }
        // record unless escape seq start
        else if (c !== "\\") {
            curr += c;
        }
        p = c;
    }
    if (curr !== "") {
        if (openQuote) acc[acc.length - 1] += "\n" + curr;
        else acc.push(curr);
    }
    return isQuoted;
};

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
