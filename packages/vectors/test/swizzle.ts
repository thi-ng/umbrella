import * as assert from "assert";
import { Vec2, swizzle2 } from "../src/vec2";
import { Vec3, swizzle3 } from "../src/vec3";
import { Vec4, swizzle4 } from "../src/vec4";

describe("swizzle", () => {

    it("vec2", () => {
        assert.deepEqual(
            swizzle2([], [10, 20], 1, 0),
            [20, 10]
        );
        assert.deepEqual(
            swizzle2([], [10, 20], 1, 1),
            [20, 20]
        );
        assert.deepEqual(
            swizzle2([0, 0, 0, 0], [10, 20], 1, 0, 1, 0, 2, 1),
            [0, 20, 0, 10]
        );
        assert.deepEqual(
            swizzle2([], [0, 10, 0, 0, 0, 20], 1, 0, 0, 1, 1, 4),
            [20, 10]
        );
        assert.deepEqual(
            new Vec2([]).swizzle(new Vec2([10, 0, 20, 0], 0, 2), 1, 0).buf,
            [20, 10]
        );
        assert.deepEqual(
            new Vec2([0, 0, 0, 0, 0], 1, 2).swizzle(new Vec2([10, 0, 0, 0, 20, 0, 0, 0], 0, 4), 1, 0).buf,
            [0, 20, 0, 10, 0]
        );
    });

    it("vec3", () => {
        assert.deepEqual(
            swizzle3([], [10, 20, 30], 2, 1, 0),
            [30, 20, 10]
        );
        assert.deepEqual(
            swizzle3([], [10, 20, 30], 1, 1, 1),
            [20, 20, 20]
        );
        assert.deepEqual(
            swizzle3([0, 0, 0, 0, 0, 0], [10, 20, 30], 2, 1, 0, 1, 0, 2, 1),
            [0, 30, 0, 20, 0, 10]
        );
        assert.deepEqual(
            swizzle3([], [0, 10, 0, 0, 0, 20, 0, 0, 0, 30], 2, 1, 0, 0, 1, 1, 4),
            [30, 20, 10]
        );
        assert.deepEqual(
            new Vec3([]).swizzle(new Vec3([10, 0, 20, 0, 30, 0], 0, 2), 2, 1, 0).buf,
            [30, 20, 10]
        );
        assert.deepEqual(
            new Vec3([0, 0, 0, 0, 0, 0, 0], 1, 2).swizzle(new Vec2([10, 0, 0, 0, 20, 0, 0, 0], 0, 4), 1, 1, 0).buf,
            [0, 20, 0, 20, 0, 10, 0]
        );
    });

    it("vec4", () => {
        assert.deepEqual(
            swizzle4([], [10, 20, 30, 40], 3, 2, 1, 0),
            [40, 30, 20, 10]
        );
        assert.deepEqual(
            swizzle4([], [10, 20, 30, 40], 1, 1, 1, 1),
            [20, 20, 20, 20]
        );
        assert.deepEqual(
            swizzle4([0, 0, 0, 0, 0, 0, 0, 0], [10, 20, 30, 40], 3, 2, 1, 0, 1, 0, 2, 1),
            [0, 40, 0, 30, 0, 20, 0, 10]
        );
        assert.deepEqual(
            swizzle4([], [0, 10, 0, 0, 0, 20, 0, 0, 0, 30, 0, 0, 0, 40], 3, 2, 1, 0, 0, 1, 1, 4),
            [40, 30, 20, 10]
        );
        assert.deepEqual(
            new Vec4([]).swizzle(new Vec4([10, 0, 20, 0, 30, 0, 40, 0], 0, 2), 3, 2, 1, 0).buf,
            [40, 30, 20, 10]
        );
        assert.deepEqual(
            new Vec4([0, 0, 0, 0, 0, 0, 0, 0, 0], 1, 2).swizzle(new Vec2([10, 0, 0, 0, 20, 0, 0, 0], 0, 4), 1, 1, 0, 0).buf,
            [0, 20, 0, 20, 0, 10, 0, 10, 0]
        );
    });
});
