import { comp } from "@thi.ng/transducers/func/comp";
import { range } from "@thi.ng/transducers/iter/range";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { take } from "@thi.ng/transducers/xform/take";
import {
    Vec,
    VecOp1,
    VecOp2,
    VecOp2o,
    VecOp3,
    VecOp3o,
    VecOpN2,
    VecOpN2o,
    VecOpN3,
    VecOpN3o
} from "./api";

type CommonOps = [

    // set, setN
    VecOp2<Vec>,
    VecOpN2<Vec>,

    // add, sub, mul, div
    VecOp2<Vec>,
    VecOp2<Vec>,
    VecOp2<Vec>,
    VecOp2<Vec>,

    VecOp2o<Vec>,
    VecOp2o<Vec>,
    VecOp2o<Vec>,
    VecOp2o<Vec>,

    VecOpN2<Vec>,
    VecOpN2<Vec>,
    VecOpN2<Vec>,
    VecOpN2<Vec>,

    VecOpN2o<Vec>,
    VecOpN2o<Vec>,
    VecOpN2o<Vec>,
    VecOpN2o<Vec>,

    // madd / msub
    VecOp3<Vec>,
    VecOpN3<Vec>,
    VecOp3<Vec>,
    VecOpN3<Vec>,

    // Math.*
    VecOp1<Vec>,
    VecOp1<Vec>,
    VecOp1<Vec>,
    VecOp1<Vec>,
    VecOp1<Vec>,
    VecOp1<Vec>,
    VecOp1<Vec>,

    // pow, min,max
    VecOp2<Vec>,
    VecOp2<Vec>,
    VecOp2<Vec>,

    // mix, mixN, mixo, mixNo
    VecOp3<Vec>,
    VecOpN3<Vec>,
    VecOp3o<Vec>,
    VecOpN3o<Vec>
];

/**
 * HOF array index lookup gen to provide optimized versions of:
 *
 * ```
 * lookup("a")(0) // a[ia]
 * lookup("a")(1) // a[ia * sa]
 * lookup("a")(2) // a[ia + 2 * sa]
 * ```
 *
 * @param sym
 */
const lookup = (sym) =>
    (i) => i > 1 ?
        `${sym}[i${sym}+${i}*s${sym}]` :
        i == 1 ? `${sym}[i${sym}+s${sym}]` :
            `${sym}[i${sym}]`;

/**
 * Infinite iterator of index lookups for `sym`.
 *
 * @param sym
 */
const indices = (sym) => map(lookup(sym), range());

/**
 * Takes a vector size `dim`, a code template function and an array of
 * symbol names participating in the template. For each symbol, creates
 * iterator of index lookups, forms them into tuples and passes them to
 * template to generate code. If the optional `ret` arg is not `null`
 * (default `"a"`), appends a `return` statement to the result array,
 * using `ret` as return value. Returns array
 *
 * @param dim
 * @param tpl
 * @param syms
 * @param ret
 */
const assemble = (dim: number, tpl: (syms: string[]) => string, syms: string[], ret = "a") => {
    const src = transduce(
        comp(take(dim), map(tpl)),
        push(),
        tuples.apply(null, [...map(indices, syms)])
    );
    ret !== null && src.push(`return ${ret};`);
    return src;
};

const compile = (args: string, src: string[]) =>
    new Function(args, src.join(""));

export const defop1 = (dim: number, op: string): VecOp1<Vec> =>
    <any>compile(
        "a,ia=0,sa=1",
        assemble(dim, ([a]) => `${a}=${op}(${a});`, ["a"])
    );

export const defop2 = (dim: number, op: string): VecOp2<Vec> =>
    <any>compile(
        "a,b,ia=0,ib=0,sa=1,sb=1",
        assemble(dim, ([a, b]) => `${a}${op}=${b};`, ["a", "b"])
    );

export const defopfn2 = (dim: number, fn: string): VecOp2<Vec> =>
    <any>compile(
        "a,b,ia=0,ib=0,sa=1,sb=1",
        assemble(dim, ([a, b]) => `${a}=${fn}(${a},${b});`, ["a", "b"])
    );

export const defopN = (dim: number, op: string): VecOpN2<Vec> =>
    <any>compile(
        "a,n,ia=0,sa=1",
        assemble(dim, ([a]) => `${a}${op}=n;`, ["a"])
    );

export const defop2o = (dim: number, op: string): VecOp2o<Vec> =>
    <any>compile(
        "o,a,b,io=0,ia=0,ib=0,so=1,sa=1,sb=1",
        assemble(dim, ([o, a, b]) => `${o}=${a}${op}${b};`, ["o", "a", "b"], "o")
    );

export const defopNo = (dim: number, op: string): VecOpN2o<Vec> =>
    <any>compile(
        "o,a,n,io=0,ia=0,so=1,sa=1",
        assemble(dim, ([o, a]) => `${o}=${a}${op}n;`, ["o", "a"], "o")
    );

export const defop3 = (dim: number, op1: string, op2: string): VecOp3<Vec> =>
    <any>compile(
        "a,b,c,ia=0,ib=0,ic=0,sa=1,sb=1,sc=1",
        assemble(dim, ([a, b, c]) => `${a}${op1}=${b}${op2}${c};`, ["a", "b", "c"])
    );

export const defopN3 = (dim: number, op1: string, op2: string): VecOpN3<Vec> =>
    <any>compile(
        "a,b,n,ia=0,ib=0,sa=1,sb=1",
        assemble(dim, ([a, b]) => `${a}${op1}=${b}${op2}n;`, ["a", "b"])
    );

export const defmix = (dim: number): VecOp3<Vec> =>
    <any>compile(
        "a,b,c,ia=0,ib=0,ic=0,sa=1,sb=1,sc=1",
        assemble(dim, ([a, b, c]) => `${a}+=(${b}-${a})*${c};`, ["a", "b", "c"])
    );

export const defmixN = (dim: number): VecOpN3<Vec> =>
    <any>compile(
        "a,b,n,ia=0,ib=0,sa=1,sb=1",
        assemble(dim, ([a, b]) => `${a}+=(${b}-${a})*n;`, ["a", "b"])
    );

export const defmixo = (dim: number): VecOp3o<Vec> =>
    <any>compile(
        "o,a,b,c,io=0,ia=0,ib=0,ic=0,so=1,sa=1,sb=1,sc=1",
        assemble(dim, ([o, a, b, c]) => `${o}=${a}+(${b}-${a})*${c};`, ["o", "a", "b", "c"], "o")
    );

export const defmixNo = (dim: number): VecOpN3o<Vec> =>
    <any>compile(
        "o,a,b,n,io=0,ia=0,ib=0,so=1,sa=1,sb=1",
        assemble(dim, ([o, a, b]) => `${o}=${a}+(${b}-${a})*n;`, ["o", "a", "b"], "o")
    );

export const defcommon = (dim: number): CommonOps =>
    <any>[
        defop2(dim, ""),
        defopN(dim, ""),

        ...mapcat(
            (f) => map((op) => f(dim, op), "+-*/"),
            [defop2, defop2o, defopN, defopNo]
        ),
        ...mapcat(
            ([op1, op2]) => [defop3(dim, op1, op2), defopN3(dim, op1, op2)],
            [["+", "*"], ["-", "*"]]
        ),
        ...map(
            (op) => defop1(dim, `Math.${op}`),
            ["abs", "sign", "floor", "ceil", "sin", "cos", "sqrt"]
        ),
        ...map(
            (op) => defopfn2(dim, `Math.${op}`),
            ["pow", "min", "max"]
        ),
        defmix(dim),
        defmixN(dim),
        defmixo(dim),
        defmixNo(dim),
    ];

/**
 * Helper function to create vector/matrix index & property accessors.
 *
 * @param proto
 * @param indices
 * @param props
 */
export const declareIndices = (proto: any, props: string[]) => {
    const get = (i: number) => function () { return this.buf[this.i + i * (this.s || 1)]; };
    const set = (i: number) => function (n: number) { this.buf[this.i + i * (this.s || 1)] = n; };
    props.forEach((id, i) => {
        Object.defineProperty(proto, i, {
            get: get(i),
            set: set(i),
            enumerable: true,
        });
        Object.defineProperty(proto, id, {
            get: get(i),
            set: set(i),
            enumerable: true,
        });
    });
};
