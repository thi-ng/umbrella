import type { Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Stringer } from "@thi.ng/strings";
import { wrap } from "@thi.ng/strings/wrap";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { iterator } from "@thi.ng/transducers/iterator";
import { isReduced } from "@thi.ng/transducers/reduced";
import { str } from "@thi.ng/transducers/str";
import { transduce } from "@thi.ng/transducers/transduce";
import type { CSVFormatOpts, CSVRecord, CSVRow } from "./api";

export function formatCSV(
    opts?: Partial<CSVFormatOpts>
): Transducer<CSVRow | CSVRecord, string>;
export function formatCSV(
    opts: Partial<CSVFormatOpts>,
    src: Iterable<CSVRow | CSVRecord>
): IterableIterator<string>;
export function formatCSV(
    opts?: Partial<CSVFormatOpts>,
    src?: Iterable<CSVRow | CSVRecord>
): any {
    return isIterable(src)
        ? iterator(formatCSV(opts), src)
        : (rfn: Reducer<any, string>) => {
              let { header, cols, delim, quote } = {
                  delim: ",",
                  quote: `"`,
                  cols: [],
                  ...opts,
              };
              let colTx: Nullable<Stringer<any>>[];
              const reQuote = new RegExp(quote, "g");
              const reduce = rfn[2];
              let headerDone = false;
              return compR(rfn, (acc, row: CSVRow | CSVRecord) => {
                  if (!headerDone) {
                      if (!header && !isArray(row)) {
                          header = Object.keys(row);
                      }
                      colTx = isArray(cols)
                          ? cols
                          : header
                          ? header.map(
                                (id) =>
                                    (<Record<string, Stringer<any>>>cols)[id]
                            )
                          : [];
                  }
                  const $row = isArray(row)
                      ? row
                      : header!.map((k) => (<CSVRecord>row)[k]);
                  const line = (header || $row)
                      .map((_, i) => {
                          const val = $row[i];
                          const cell =
                              val != null
                                  ? colTx[i]
                                      ? colTx[i]!(val)
                                      : String(val)
                                  : "";
                          return cell.indexOf(quote) !== -1
                              ? wrap(quote)(
                                    cell.replace(reQuote, `${quote}${quote}`)
                                )
                              : cell;
                      })
                      .join(delim);
                  if (!headerDone) {
                      if (header) {
                          acc = reduce(acc, header.join(delim));
                      } else {
                          header = $row;
                      }
                      headerDone = true;
                      !isReduced(acc) && (acc = reduce(acc, line));
                      return acc;
                  } else {
                      return reduce(acc, line);
                  }
              });
          };
}

export const formatCSVString = (
    opts: Partial<CSVFormatOpts & { rowDelim: string }> = {},
    src: Iterable<CSVRow>
) => transduce(formatCSV(opts), str(opts.rowDelim || "\n"), src);
