import type { IBase } from "./api";

export const defBase = (chars: string) => new BaseN(chars);

export class BaseN implements IBase {
    readonly N: number;
    readonly index: Record<string, number>;

    constructor(public readonly base: string) {
        this.N = base.length;
        this.index = [...base].reduce(
            (acc, x, i) => ((acc[x] = i), acc),
            <Record<string, number>>{}
        );
    }

    encode(x: number) {
        const { base, N } = this;
        if (x === 0) return base[0];
        let res = "";
        while (x > 0) {
            res = base[x % N] + res;
            x = (x / N) | 0;
        }
        return res;
    }

    encodeBigInt(x: bigint) {
        if (x < BigInt(2 ** 53)) return this.encode(Number(x));
        const { base, N } = this;
        if (x === BigInt(0)) return base[0];
        const NN = BigInt(N);
        let res = "";
        while (x > 0) {
            res = base[Number(x % NN)] + res;
            x /= NN;
        }
        return res;
    }

    decode(x: string) {
        const { index, N } = this;
        let res = 0;
        for (let n = x.length - 1, i = 0; i <= n; i++) {
            res += index[x[i]] * N ** (n - i);
        }
        return res;
    }

    decodeBigInt(x: string): bigint {
        const { index, N } = this;
        const NN = BigInt(N);
        let res = BigInt(0);
        for (let n = x.length - 1, i = 0; i <= n; i++) {
            res += BigInt(index[x[i]]) * NN ** BigInt(n - i);
        }
        return res;
    }

    validate(x: string) {
        return new RegExp(`^[${this.base}]+$`).test(x);
    }
}
