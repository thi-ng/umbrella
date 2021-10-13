import type { IObjectOf } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import type { Op1, Op2, Sym, Term } from "../api/nodes.js";
import type { ComparisonOperator, Operator } from "../api/ops.js";
import type {
    BoolTerm,
    FloatTerm,
    IntTerm,
    Mat2Term,
    Mat3Term,
    Mat4Term,
    UintTerm,
    Vec2Term,
    Vec3Term,
    Vec4Term,
} from "../api/terms.js";
import type {
    Comparable,
    Int,
    IVec,
    Mat,
    NumericF,
    NumericI,
    NumericU,
    Prim,
    Type,
    UVec,
    Vec,
} from "../api/types.js";
import { isMat, isVec } from "./checks.js";
import { numberWithMatchingType } from "./item.js";
import { float } from "./lit.js";

export const op1 = <T extends Type>(
    op: Operator,
    val: Term<T>,
    post = false
): Op1<T> => ({
    tag: "op1",
    type: val.type,
    op,
    val,
    post,
});

const OP_INFO: IObjectOf<string> = {
    mave: "mv",
    vema: "vm",
    vefl: "vn",
    mafl: "vn",
    flve: "nv",
    flma: "nv",
    ivin: "vn",
    iniv: "nv",
    uvui: "vn",
    uiuv: "nv",
};

export const op2 = (
    op: Operator,
    _l: Term<any> | number,
    _r: Term<any> | number,
    rtype?: Type,
    info?: string
): Op2<any> => {
    const nl = isNumber(_l);
    const nr = isNumber(_r);
    let type: Type;
    let l: Term<any>;
    let r: Term<any>;
    if (nl) {
        if (nr) {
            // (number, number)
            l = float(_l);
            r = float(_r);
            type = "float";
        } else {
            // (number, term)
            r = <Term<any>>_r;
            l = numberWithMatchingType(r, <number>_l);
            type = r.type;
        }
    } else if (nr) {
        // (term, number)
        l = <Term<any>>_l;
        r = numberWithMatchingType(l, <number>_r);
        type = l.type;
    } else {
        // (term, term)
        l = <Term<any>>_l;
        r = <Term<any>>_r;
        type =
            rtype ||
            (isVec(l)
                ? l.type
                : isVec(r)
                ? r.type
                : isMat(r)
                ? r.type
                : l.type);
    }
    return {
        tag: "op2",
        type: rtype || type!,
        info: info || OP_INFO[l!.type.substr(0, 2) + r!.type.substr(0, 2)],
        op,
        l: l!,
        r: r!,
    };
};

export const inc = <T extends Prim | Int>(t: Sym<T>): Op1<T> =>
    op1("++", t, true);

export const dec = <T extends Prim | Int>(t: Sym<T>): Op1<T> =>
    op1("--", t, true);

// prettier-ignore
export function add<A extends Prim | Int | IVec | Mat, B extends A>(l: Term<A>, r: Term<B>): Op2<A>;
export function add<T extends Int | "float">(l: number, r: Term<T>): Op2<T>;
export function add<T extends Int | "float">(l: Term<T>, r: number): Op2<T>;
// prettier-ignore
export function add<T extends Vec | Mat>(l: FloatTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function add<T extends Vec | Mat>(l: Term<T>, r: FloatTerm | number): Op2<T>;
// prettier-ignore
export function add<T extends IVec>(l: IntTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function add<T extends IVec>(l: Term<T>, r: IntTerm | number): Op2<T>;
// prettier-ignore
export function add(l: Term<any> | number, r: Term<any> | number): Op2<any> {
    return op2("+", l, r);
}

// prettier-ignore
export function sub<A extends Prim | Int | IVec | Mat, B extends A>(l: Term<A>, r: Term<B>): Op2<A>;
export function sub<T extends Int | "float">(l: number, r: Term<T>): Op2<T>;
export function sub<T extends Int | "float">(l: Term<T>, r: number): Op2<T>;
// prettier-ignore
export function sub<T extends Vec | Mat>(l: FloatTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function sub<T extends Vec | Mat>(l: Term<T>, r: FloatTerm | number): Op2<T>;
// prettier-ignore
export function sub<T extends IVec>(l: IntTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function sub<T extends IVec>(l: Term<T>, r: IntTerm| number): Op2<T>;
export function sub(l: Term<any> | number, r: Term<any> | number): Op2<any> {
    return op2("-", l, r);
}

// prettier-ignore
export function mul<A extends Prim | Int | IVec | Mat, B extends A>(l: Term<A>, r: Term<B>): Op2<A>;
export function mul<T extends Int | "float">(l: number, r: Term<T>): Op2<T>;
export function mul<T extends Int | "float">(l: Term<T>, r: number): Op2<T>;
// prettier-ignore
export function mul<T extends Vec | Mat>(l: FloatTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function mul<T extends Vec | Mat>(l: Term<T>, r: FloatTerm | number): Op2<T>;
// prettier-ignore
export function mul<T extends IVec>(l: IntTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function mul<T extends IVec>(l: Term<T>, r: IntTerm | number): Op2<T>;
export function mul(l: Mat2Term, r: Vec2Term): Op2<"vec2">;
export function mul(l: Mat3Term, r: Vec3Term): Op2<"vec3">;
export function mul(l: Mat4Term, r: Vec4Term): Op2<"vec4">;
export function mul(l: Vec2Term, r: Mat2Term): Op2<"vec2">;
export function mul(l: Vec3Term, r: Mat3Term): Op2<"vec3">;
export function mul(l: Vec4Term, r: Mat4Term): Op2<"vec4">;
export function mul(l: Term<any> | number, r: Term<any> | number): Op2<any> {
    return op2(
        "*",
        l,
        r,
        !isNumber(l) && !isNumber(r) && isMat(l) && isVec(r)
            ? r.type
            : undefined
    );
}

// prettier-ignore
export function div<A extends Prim | Int | IVec | Mat, B extends A>(l: Term<A>, r: Term<B>): Op2<A>;
export function div<T extends Int | "float">(l: number, r: Term<T>): Op2<T>;
export function div<T extends Int | "float">(l: Term<T>, r: number): Op2<T>;
// prettier-ignore
export function div<T extends Vec | Mat>(l: FloatTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function div<T extends Vec | Mat>(l: Term<T>, r: FloatTerm | number): Op2<T>;
// prettier-ignore
export function div<T extends IVec>(l: IntTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function div<T extends IVec>(l: Term<T>, r: IntTerm | number): Op2<T>;
export function div(l: Term<any> | number, r: Term<any> | number): Op2<any> {
    return op2("/", l, r);
}

/**
 * Integer % (modulo) operator
 *
 * @param l -
 * @param b -
 */
// prettier-ignore
export function modi<A extends Int | IVec | UVec, B extends A>(l: Term<A>, r: Term<B>): Op2<A>;
// prettier-ignore
export function modi<T extends IVec>(l: IntTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function modi<T extends IVec>(l: Term<T>, r: IntTerm | number): Op2<T>;
// prettier-ignore
export function modi<T extends UVec>(l: UintTerm | number, r: Term<T>): Op2<T>;
// prettier-ignore
export function modi<T extends UVec>(l: Term<T>, r: UintTerm | number): Op2<T>;
export function modi(l: Term<any> | number, r: Term<any> | number): Op2<any> {
    return op2(
        "%",
        isNumber(l) ? numberWithMatchingType(<Term<any>>r, l) : l,
        isNumber(r) ? numberWithMatchingType(<Term<any>>l, r) : r
    );
}

/**
 * Syntax sugar for `-x`.
 *
 * @param val
 */
export const neg = <T extends Prim | Int | IVec | Mat>(val: Term<T>) =>
    op1("-", val);

/**
 * Syntax sugar for `1 / x`.
 *
 * @param val
 */
export const reciprocal = <T extends Prim>(val: Term<T>): Op2<T> =>
    op2("/", 1, val);

/**
 * Multiply-add: a * b + c. The `b` and `c` terms must be compatible with `a`.
 *
 * @param a -
 * @param b -
 * @param c -
 */
// prettier-ignore
export function madd<A extends Prim, B extends A, C extends B>(a: Term<A>, b: Term<B> | NumericF, c: Term<C> | NumericF): Term<A>;
// prettier-ignore
export function madd<A extends IVec | "int", B extends A, C extends B>(a: Term<A>, b: Term<B> | NumericI, c: Term<C> | NumericI): Term<A>;
// prettier-ignore
export function madd<A extends UVec | "uint", B extends A, C extends B>(a: Term<A>, b: Term<B> | NumericU, c: Term<C> | NumericU): Term<A>;
// prettier-ignore
export function madd(a: Term<any>, b: Term<any> | number, c: Term<any> | number): Term<any> {
    return add(mul(<Term<any>>a, <any>b), <any>c);
}

/**
 * Add-multiply: (a + b) * c. The `b` and `c` terms must be compatible with `a`.
 *
 * @param a -
 * @param b -
 * @param c -
 */
// prettier-ignore
export function addm<A extends Prim, B extends A, C extends B>(a: Term<A>, b: Term<B> | NumericF, c: Term<C> | NumericF): Term<A>;
// prettier-ignore
export function addm<A extends IVec | "int", B extends A, C extends B>(a: Term<A>, b: Term<B> | NumericI, c: Term<C> | NumericI): Term<A>;
// prettier-ignore
export function addm<A extends UVec | "uint", B extends A, C extends B>(a: Term<A>, b: Term<B> | NumericU, c: Term<C> | NumericU): Term<A>;
// prettier-ignore
export function addm(a: Term<any>, b: Term<any> | number, c: Term<any> | number): Term<any> {
    return mul(add(<Term<any>>a, <any>b), <any>c);
}

export const not = (val: BoolTerm) => op1("!", val);
export const or = (a: BoolTerm, b: BoolTerm) => op2("||", a, b);
export const and = (a: BoolTerm, b: BoolTerm) => op2("&&", a, b);

const cmp =
    (op: ComparisonOperator) =>
    <A extends Comparable, B extends A>(a: Term<A>, b: Term<B>): BoolTerm =>
        op2(op, a, b, "bool");

export const eq = cmp("==");
export const neq = cmp("!=");
export const lt = cmp("<");
export const lte = cmp("<=");
export const gt = cmp(">");
export const gte = cmp(">=");

export const bitnot = <T extends IntTerm | UintTerm | Term<IVec> | Term<UVec>>(
    val: T
) => op1("~", val);

// prettier-ignore
export function bitand<A extends Int | IVec | UVec, B extends A>(l: Term<A>, r: Term<B>): Term<A>;
// prettier-ignore
export function bitand<T extends IVec>(l: Term<T>, r: IntTerm | number): Term<T>;
// prettier-ignore
export function bitand<T extends IVec>(l: IntTerm | number, r: Term<T>): Term<T>;
// prettier-ignore
export function bitand<T extends UVec>(l: Term<T>, r: UintTerm | number): Term<T>;
// prettier-ignore
export function bitand<T extends UVec>(l: UintTerm | number, r: Term<T>): Term<T>;
// prettier-ignore
export function bitand(l: Term<any> | number, r: Term<any> | number): Op2<any> {
    return op2("&", l, r, undefined);
}

// prettier-ignore
export function bitor<A extends Int | IVec | UVec, B extends A>(l: Term<A>, r: Term<B>): Term<A>;
// prettier-ignore
export function bitor<T extends IVec>(l: Term<T>, r: IntTerm | number): Term<T>;
// prettier-ignore
export function bitor<T extends IVec>(l: IntTerm | number, r: Term<T>): Term<T>;
// prettier-ignore
export function bitor<T extends UVec>(l: Term<T>, r: UintTerm | number): Term<T>;
// prettier-ignore
export function bitor<T extends UVec>(l: UintTerm | number, r: Term<T>): Term<T>;
// prettier-ignore
export function bitor(l: Term<any> | number, r: Term<any> | number): Op2<any> {
    return op2("|", l, r, undefined);
}

// prettier-ignore
export function bitxor<A extends Int | IVec | UVec, B extends A>(l: Term<A>, r: Term<B>): Term<A>;
// prettier-ignore
export function bitxor<T extends IVec>(l: Term<T>, r: IntTerm | number): Term<T>;
// prettier-ignore
export function bitxor<T extends IVec>(l: IntTerm | number, r: Term<T>): Term<T>;
// prettier-ignore
export function bitxor<T extends UVec>(l: Term<T>, r: UintTerm | number): Term<T>;
// prettier-ignore
export function bitxor<T extends UVec>(l: UintTerm | number, r: Term<T>): Term<T>;
// prettier-ignore
export function bitxor(l: Term<any> | number, r: Term<any> | number): Op2<any> {
    return op2("^", l, r, undefined);
}
