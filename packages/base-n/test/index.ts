import * as assert from "assert";
import {
    BASE32_HEX,
    BASE32_RFC4648,
    BASE36,
    BASE58,
    BASE64,
    BASE85,
} from "../src";

describe("base-n", () => {
    it("roundtrip", () => {
        const X = BigInt(2) ** BigInt(128) - BigInt(1);

        // prettier-ignore
        assert.strictEqual(BASE32_RFC4648.encodeBigInt(X), "H7777777777777777777777777");
        // prettier-ignore
        assert.strictEqual(BASE32_RFC4648.decodeBigInt("H7777777777777777777777777"), X);

        // prettier-ignore
        assert.strictEqual(BASE32_HEX.encodeBigInt(X), "7VVVVVVVVVVVVVVVVVVVVVVVVV");
        // prettier-ignore
        assert.strictEqual(BASE32_HEX.decodeBigInt("7VVVVVVVVVVVVVVVVVVVVVVVVV"), X);

        assert.strictEqual(BASE36.encodeBigInt(X), "F5LXX1ZZ5PNORYNQGLHZMSP33");
        assert.strictEqual(BASE36.decodeBigInt("F5LXX1ZZ5PNORYNQGLHZMSP33"), X);

        assert.strictEqual(BASE58.encodeBigInt(X), "YcVfxkQb6JRzqk5kF2tNLv");
        assert.strictEqual(BASE58.decodeBigInt("YcVfxkQb6JRzqk5kF2tNLv"), X);

        assert.strictEqual(BASE64.encodeBigInt(X), "3/////////////////////");
        assert.strictEqual(BASE64.decodeBigInt("3/////////////////////"), X);

        assert.strictEqual(BASE85.encodeBigInt(X), "=r54lj&NUUO~Hi%c2ym0");
        assert.strictEqual(BASE85.decodeBigInt("=r54lj&NUUO~Hi%c2ym0"), X);
    });
});
