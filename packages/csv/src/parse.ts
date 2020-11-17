import { isIterable } from "@thi.ng/checks";
import { ESCAPES, split } from "@thi.ng/strings";
import { compR, iterator1, Reducer, Transducer } from "@thi.ng/transducers";
import type { ColumnSpec, CSVOpts, CSVRow } from "./api";

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
                  all: true,
                  delim: ",",
                  quote: '"',
                  comment: "#",
                  trim: false,
                  ...opts,
              };
              const reduce = rfn[2];
              let index: Record<string, number>;
              let revIndex: Record<number, string>;
              let first = true;
              let isQuoted = false;
              let record: string[] = [];
              if (header) {
                  cols && (index = initIndex(header, cols));
                  all && (revIndex = initRevIndex(header));
                  first = false;
              }
              return compR(rfn, (acc, line: string) => {
                  if ((!line.length || line.startsWith(comment)) && !isQuoted)
                      return acc;
                  if (!first) {
                      isQuoted = tokenizeLine(
                          line,
                          record,
                          isQuoted,
                          delim,
                          quote
                      );
                      if (isQuoted) return acc;
                      const row: CSVRow = {};
                      all &&
                          record.reduce(
                              (acc, x, i) => (
                                  (acc[revIndex[i]] = trim ? x.trim() : x), acc
                              ),
                              row
                          );
                      cols &&
                          Object.entries(cols).reduce((acc, [id, spec]) => {
                              let val = record[index[id]];
                              trim && (val = val.trim());
                              acc[spec.alias || id] = spec.coerce
                                  ? spec.coerce(val, acc)
                                  : val;
                              return acc;
                          }, row);
                      record = [];
                      return reduce(acc, row);
                  } else {
                      isQuoted = tokenizeLine(
                          line,
                          record,
                          isQuoted,
                          delim,
                          quote
                      );
                      if (!isQuoted) {
                          cols && (index = initIndex(record, cols));
                          all && (revIndex = initRevIndex(record));
                          first = false;
                          record = [];
                      }
                      return acc;
                  }
              });
          };
}

export const parseCSVString = (opts: Partial<CSVOpts>, src: string) =>
    parseCSV(opts, split(src));

/**
 * @param line
 * @param acc
 * @param isQuoted
 * @param delim
 * @param quote
 *
 * @internal
 */
export const tokenizeLine = (
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

const initIndex = (line: string[], cols: Record<string, ColumnSpec>) =>
    line.reduce(
        (acc, id, i) => (cols![id] ? ((acc[id] = i), acc) : acc),
        <Record<string, number>>{}
    );

const initRevIndex = (line: string[]) =>
    line.reduce((acc, x, i) => ((acc[i] = x), acc), <Record<number, string>>{});
