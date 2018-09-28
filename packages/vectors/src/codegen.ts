import {
    Vec,
    VecOp1,
    VecOp2,
    VecOp2o,
    VecOpN2,
    VecOpN2o
} from "@thi.ng/vectors/src/api";

const compile = (args: string, src: string[]) =>
    new Function(args, src.join(""));

const assemble = (fn: (op: string, i: number) => string, dim: number, op: string, ret = "a") => {
    const src = [];
    for (let i = 0; i < dim; i++) {
        src.push(fn(op, i));
    }
    src.push(`return ${ret};`);
    return src;
}

const uniop = (op: string, i: number) =>
    i > 1 ?
        `a[ia+${i}*sa]=${op}(a[ia+${i}*sa]);` :
        i == 1 ?
            `a[ia+sa]=${op}(a[ia+sa]);` :
            `a[ia]=${op}(a[ia]);`;

const binop = (op: string, i: number) =>
    i > 1 ?
        `a[ia+${i}*sa]${op}=b[ib+${i}*sb];` :
        i == 1 ?
            `a[ia+sa]${op}=b[ib+sb];` :
            `a[ia]${op}=b[ib];`;

const binopN = (op: string, i: number) =>
    i > 1 ?
        `a[ia+${i}*sa]${op}=n;` :
        i == 1 ?
            `a[ia+sa]${op}=n;` :
            `a[ia]${op}=n;`;

const binopO = (op: string, i: number) =>
    i > 1 ?
        `o[io+${i}*so]=a[ia+${i}*sa]${op}b[ib+${i}*sb];` :
        i == 1 ?
            `o[io+so]=a[ia+sa]${op}b[ib+sb];` :
            `o[io]=a[ia]${op}b[ib];`;

const binopON = (op: string, i: number) =>
    i > 1 ?
        `o[io+${i}*so]=a[ia+${i}*sa]${op}n;` :
        i == 1 ?
            `o[io+so]=a[ia+sa]${op}n;` :
            `o[io]=a[ia]${op}n;`;

export const vuniop = (dim: number, op: string): VecOp1<Vec> =>
    <any>compile("a,ia=0,sa=1", assemble(uniop, dim, op));

export const vbinop = (dim: number, op: string): VecOp2<Vec> =>
    <any>compile("a,b,ia=0,ib=0,sa=1,sb=1", assemble(binop, dim, op));

export const vbinopN = (dim: number, op: string): VecOpN2<Vec> =>
    <any>compile("a,n,ia=0,sa=1", assemble(binopN, dim, op));

export const vbinopO = (dim: number, op: string): VecOp2o<Vec> =>
    <any>compile("o,a,b,io=0,ia=0,ib=0,so=1,sa=1,sb=1", assemble(binopO, dim, op, "o"));

export const vbinopON = (dim: number, op: string): VecOpN2o<Vec> =>
    <any>compile("o,a,n,io=0,ia=0,so=1,sa=1", assemble(binopON, dim, op, "o"));
