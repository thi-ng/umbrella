import { Type } from "@thi.ng/api";
import * as assert from "assert";
import { NativePool } from "../src";

const pool = new NativePool();

describe("native", () => {
    it("mallocAs", () => {
        assert.deepStrictEqual(pool.mallocAs(Type.F32, 0), new Float32Array(0));
        assert.deepStrictEqual(pool.mallocAs(Type.F32, 4), new Float32Array(4));
    });

    it("callocAs", () => {
        assert.deepStrictEqual(
            pool.callocAs(Type.F32, 0, 1),
            new Float32Array([])
        );
        assert.deepStrictEqual(
            pool.callocAs(Type.F32, 4, 1),
            new Float32Array([1, 1, 1, 1])
        );
    });

    it("reallocAs", () => {
        assert.deepStrictEqual(
            pool.reallocArray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]), 4),
            new Float32Array([1, 2, 3, 4])
        );
    });
});
