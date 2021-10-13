import {
    defJoin,
    defLoop,
    defTuple,
    defWord,
    drop,
    dup,
    dup2,
    inc,
    invrot,
    lt,
    maptos,
    nop,
    runU,
    StackFn,
    StackProgram,
    swap,
} from "../src/index.js"

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
    defWord([
        0,
        defLoop(
            [dup, i, lt],
            [0, defLoop([dup, j, lt], [dup2, ...bodyQ, inc]), drop, inc]
        ),
        drop,
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
const grid = (i: number, j: number, body: StackProgram = [defTuple(2)]) =>
    defWord([loop2(i, j, [...body, invrot]), defTuple(i * j)]);

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
    id1: StackFn = nop,
    id2 = id1
) => grid(i, j, [id2, swap, id1, swap, defTuple(2), defJoin(sep)]);

// helper word which looks up TOS in given string/array/object, i.e. to
// transform a number into another value (e.g. string)
const idgen = (ids: any) => maptos((x) => ids[x]);

console.log(runU(grid(4, 4)));
console.log(runU(makeids(4, 4, "", idgen("abcd"))));
console.log(
    runU(makeids(4, 4, "-", idgen(["alpha", "beta", "gamma", "delta"]), nop))
);

console.log(
    runU([
        makeids(4, 4, "", idgen("abcd")),
        maptos((id) => runU(makeids(4, 4, "/", idgen(id)))),
        maptos((id) => runU(makeids(4, 4, "-", idgen(id)))),
    ])
);
