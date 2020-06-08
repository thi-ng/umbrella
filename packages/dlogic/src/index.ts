export interface Sum<T> {
    s: T;
    c: boolean;
}

/**
 * {@link https://en.wikipedia.org/wiki/Inverter_(logic_gate)}
 *
 * | X | Q |
 * |---|---|
 * | 0 | 1 |
 * | 1 | 0 |
 *
 * @param x -
 */
export const not = (x: boolean) => !x;

/**
 * {@link https://en.wikipedia.org/wiki/NAND_gate}
 *
 * | A | B | Q |
 * |---|---|---|
 * | 0 | 0 | 1 |
 * | 0 | 1 | 1 |
 * | 1 | 0 | 1 |
 * | 1 | 1 | 0 |
 *
 * @param a -
 * @param b -
 */
export const nand = (a: boolean, b: boolean) => !(a && b);

/**
 * {@link https://en.wikipedia.org/wiki/AND_gate}
 *
 * | A | B | Q |
 * |---|---|---|
 * | 0 | 0 | 0 |
 * | 0 | 1 | 0 |
 * | 1 | 0 | 0 |
 * | 1 | 1 | 1 |
 *
 * @param a -
 * @param b -
 */
export const and = (a: boolean, b: boolean) => a && b;

/**
 * {@link https://en.wikipedia.org/wiki/OR_gate}
 *
 * | A | B | Q |
 * |---|---|---|
 * | 0 | 0 | 0 |
 * | 0 | 1 | 1 |
 * | 1 | 0 | 1 |
 * | 1 | 1 | 1 |
 *
 * @param a -
 * @param b -
 */
export const or = (a: boolean, b: boolean) => a || b;

/**
 * {@link https://en.wikipedia.org/wiki/NOR_gate}
 *
 * | A | B | Q |
 * |---|---|---|
 * | 0 | 0 | 1 |
 * | 0 | 1 | 0 |
 * | 1 | 0 | 0 |
 * | 1 | 1 | 0 |
 *
 * @param a -
 * @param b -
 */
export const nor = (a: boolean, b: boolean) => !(a || b);

/**
 * {@link https://en.wikipedia.org/wiki/XOR_gate}
 *
 * | A | B | Q |
 * |---|---|---|
 * | 0 | 0 | 0 |
 * | 0 | 1 | 1 |
 * | 1 | 0 | 1 |
 * | 1 | 1 | 0 |
 *
 * @param a -
 * @param b -
 */
export const xor = (a: boolean, b: boolean) => a !== b;

/**
 * {@link https://en.wikipedia.org/wiki/XNOR_gate}
 *
 * | A | B | Q |
 * |---|---|---|
 * | 0 | 0 | 1 |
 * | 0 | 1 | 0 |
 * | 1 | 0 | 0 |
 * | 1 | 1 | 1 |
 *
 * @param a -
 * @param b -
 */
export const xnor = (a: boolean, b: boolean) => a === b;

/**
 * {@link https://web.archive.org/web/20160304050642/http://www.zigwap.com/digital/gates/imply_gate}
 *
 * | A | B | Q |
 * |---|---|---|
 * | 0 | 0 | 1 |
 * | 0 | 1 | 1 |
 * | 1 | 0 | 0 |
 * | 1 | 1 | 1 |
 * @param a -
 * @param b -
 */
export const imply = (a: boolean, b: boolean) => !a || b;

/**
 * {@link https://en.wikipedia.org/wiki/AND-OR-Invert}
 *
 * `q = nor(a, and(b, c))`
 *
 * | A | B | C | Q |
 * |---|---|---|---|
 * | 0 | 0 | 0 | 1 |
 * | 0 | 0 | 1 | 1 |
 * | 0 | 1 | 0 | 1 |
 * | 0 | 1 | 1 | 0 |
 * | 1 | 0 | 0 | 0 |
 * | 1 | 0 | 1 | 0 |
 * | 1 | 1 | 0 | 0 |
 * | 1 | 1 | 1 | 0 |
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const aoi21 = (a: boolean, b: boolean, c: boolean) => !(a || (b && c));

/**
 * {@link https://en.wikipedia.org/wiki/AND-OR-Invert}
 *
 * `q = nor(and(a, b), and(c, d))`
 *
 * | A | B | C | D | Q |
 * |---|---|---|---|---|
 * | 0 | X | X | 0 | 1 |
 * | X | 0 | X | 0 | 1 |
 * | 0 | X | 0 | X | 1 |
 * | X | 0 | 0 | X | 1 |
 * | 1 | 1 | X | X | 0 |
 * | X | X | 1 | 1 | 0 |
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const aoi22 = (a: boolean, b: boolean, c: boolean, d: boolean) =>
    !((a && b) || (c && d));

/**
 * Complement logic of {@link aoi21}.
 *
 * `q = nand(a, or(b, c))`
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const oai21 = (a: boolean, b: boolean, c: boolean) => !(a && (b || c));

/**
 * Complement logic of {@link aoi22}.
 *
 * `q = nand(or(a, b), or(c, d))`
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const oai22 = (a: boolean, b: boolean, c: boolean, d: boolean) =>
    !((a || b) && (c || d));

/**
 * {@link https://en.wikipedia.org/wiki/NAND_logic#MUX}
 *
 * | A | B | S | Q |
 * |---|---|---|---|
 * | 0 | 0 | 0 | 0 |
 * | 0 | 1 | 0 | 0 |
 * | 1 | 0 | 0 | 1 |
 * | 1 | 1 | 0 | 1 |
 * | 0 | 0 | 1 | 0 |
 * | 0 | 1 | 1 | 1 |
 * | 1 | 0 | 1 | 0 |
 * | 1 | 1 | 1 | 1 |
 *
 * @param a -
 * @param b -
 * @param s -
 */
export const mux = (a: boolean, b: boolean, s: boolean) =>
    (a && !s) || (b && s);

/**
 * {@link https://en.wikipedia.org/wiki/NAND_logic#DEMUX}
 *
 * | I | S | A | B |
 * |---|---|---|---|
 * | 0 | 0 | 0 | 0 |
 * | 1 | 0 | 1 | 0 |
 * | 0 | 1 | 0 | 0 |
 * | 1 | 1 | 0 | 1 |
 *
 * @param i -
 * @param s -
 */
export const demux = (i: boolean, s: boolean): [boolean, boolean] => [
    i && !s,
    i && s,
];

/**
 * {@link https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder}
 *
 * @param a -
 * @param b -
 */
export const hadd1 = (a: boolean, b: boolean): Sum<boolean> => ({
    s: a !== b,
    c: a && b,
});

/**
 * {@link https://en.wikipedia.org/wiki/Adder_(electronics)#Full_adder}
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const fadd1 = (a: boolean, b: boolean, c: boolean): Sum<boolean> => ({
    s: (a !== b) !== c,
    c: (a !== b && c) || (a && b),
});

/**
 * {@link https://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder}
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const rca = (a: boolean[], b: boolean[], c: boolean): Sum<boolean[]> => {
    const s: boolean[] = [];
    for (let n = a.length, i = 0; i < n; i++) {
        const r = fadd1(a[i], b[i], c);
        s.push(r.s);
        c = r.c;
    }
    return { s, c };
};

/**
 * HOF delay line generator. Returned function takes single boolean arg,
 * buffers `n` values (ring buffer) and returns currently oldest. The
 * first `n` results will always be `false`.
 *
 * @param n -
 */
export const delay = (n: number) => {
    const buf: boolean[] = new Array(n).fill(false);
    let i = 0;
    return n > 0
        ? (x: boolean) => {
              const y = buf[i];
              buf[i++] = x;
              i %= n;
              return y;
          }
        : (x: boolean) => x;
};
