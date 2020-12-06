import type { StackFn, StackProgram } from "../src";
import * as pf from "../src";

/**
 * This higher order word defines a 2D loop construct, executing a user
 * provided `body` quotation for each iteration. The `body` MUST consume
 * the current `i,j` counter pair and produce no new TOS (if the body
 * produces results, these must be rotated down by 2 values, e.g.. using
 * {@link invrot}). Iteratation goes from 0..i and 0..j for outer/inner loops
 * respectively.
 *
 * @param i -
 * @param j -
 * @param bodyQ -
 */
const loop2 = (i: number, j: number, bodyQ: StackProgram) =>
    pf.defWord([
        0,
        pf.defLoop(
            [pf.dup, i, pf.lt],
            [
                0,
                pf.defLoop([pf.dup, j, pf.lt], [pf.dup2, ...bodyQ, pf.inc]),
                pf.drop,
                pf.inc,
            ]
        ),
        pf.drop,
    ]);

/**
 * Executes `loop2` using {@link runU} and with user provided body quotation
 * assumed to consume the current `i,j` counter pair and produce a
 * single value for each iteration. In each iteration this result is
 * then rotated down the stack so that after the loop is done the
 * produced values are remaining in order of iteration. The last step is
 * to collect these results into a single result tuple.
 *
 * @param i - outer size
 * @param j - inner size
 * @param body - user quotation
 */
const grid = (i: number, j: number, body: StackProgram = [pf.defTuple(2)]) =>
    pf.defWord([loop2(i, j, [...body, pf.invrot]), pf.defTuple(i * j)]);

/**
 * Special version of `grid` which transforms `i,j` pairs into strings
 * using user provided mapping array/object/string. Different mappings
 * can be given for outer/inner counters. The tuple values are joined
 * with given `sep`arator.
 *
 * @param i - outer size
 * @param j - inner size
 * @param sep - separator
 * @param id1 - outer id gen
 * @param id2 - inner id gen
 */
const makeids = (
    i: number,
    j: number,
    sep: string,
    id1: StackFn = pf.nop,
    id2 = id1
) => grid(i, j, [id2, pf.swap, id1, pf.swap, pf.defTuple(2), pf.defJoin(sep)]);

// helper word which looks up TOS in given string/array/object, i.e. to
// transform a number into another value (e.g. string)
const idgen = (ids: any) => pf.maptos((x) => ids[x]);

console.log(pf.runU(grid(4, 4)));
console.log(pf.runU(makeids(4, 4, "", idgen("abcd"))));
console.log(
    pf.runU(
        makeids(4, 4, "-", idgen(["alpha", "beta", "gamma", "delta"]), pf.nop)
    )
);

console.log(
    pf.runU([
        makeids(4, 4, "", idgen("abcd")),
        pf.maptos((id) => pf.runU(makeids(4, 4, "/", idgen(id)))),
        pf.maptos((id) => pf.runU(makeids(4, 4, "-", idgen(id)))),
    ])
);
