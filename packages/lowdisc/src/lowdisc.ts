import { assert } from "@thi.ng/errors/assert";

/**
 * General purpose iterator yielding n-dimensional sequence values obtained from
 * given per-dimension sequence generators. Omits `offset` (default: 0) initial
 * values.
 *
 * @remarks
 * This function acts as shared impl for all other sequence generators in this
 * package.
 *
 * @param dims - 
 * @param offset - 
 */
export const lowDiscrepancy = (dims: Iterator<number>[], offset = 0) => {
    const num = dims.length;
    assert(num > 0, `invalid dimensions`);
    const [x, y, z] = dims;
    const iter =
        num === 1
            ? (function* () {
                  while (true) yield [<number>x.next().value];
              })()
            : num === 2
            ? (function* () {
                  while (true)
                      yield [<number>x.next().value, <number>y.next().value];
              })()
            : num === 3
            ? (function* () {
                  while (true)
                      yield [
                          <number>x.next().value,
                          <number>y.next().value,
                          <number>z.next().value,
                      ];
              })()
            : (function* () {
                  while (true) yield dims.map((d) => <number>d.next().value);
              })();
    for (; offset-- > 0; ) iter.next();
    return iter;
};
