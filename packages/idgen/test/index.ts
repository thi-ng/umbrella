import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { EVENT_ADDED, EVENT_REMOVED, IDGen } from "../src";

group("idgen", {
    "re-use (versioned)": () => {
        const g = new IDGen(8);
        assert.strictEqual(g.next(), 0);
        assert.strictEqual(g.next(), 1);
        assert.strictEqual(g.next(), 2);
        assert.ok(g.free(1));
        assert.ok(g.free(2));
        assert.strictEqual(g.next(), 0x102);
        assert.strictEqual(g.next(), 0x101);
        assert.strictEqual(g.next(), 3);
        assert.ok(g.free(0));
        assert.ok(!g.free(0));
        assert.strictEqual(g.next(), 0x100);
        assert.ok(g.free(0x100));
        assert.ok(g.free(3));
        assert.strictEqual((<any>g).freeID, 0x103);
        assert.ok(g.free(0x101));
        assert.ok(g.free(0x102));
        assert.strictEqual((<any>g).freeID, 0x202);
        assert.deepStrictEqual((<any>g).ids, [-1, 0x103, 0x201, 0x200]);
    },

    "has (unversioned)": () => {
        const check = (expected: boolean[]) => {
            for (let i = 0; i < 4; i++) {
                i > 0 && assert.ok(!g.has(-i), String(-i));
                assert.strictEqual(g.has(i), expected[i], String(i));
                assert.ok(!g.has(i + 4), String(i + 4));
            }
        };

        const g = new IDGen(2, 0);
        assert.strictEqual(g.available, 4);
        g.next();
        g.next();
        g.next();
        g.next();
        assert.strictEqual(g.available, 0);
        assert.throws(() => g.next(), "max cap");
        check([true, true, true, true]);
        g.free(2);
        assert.strictEqual(g.available, 1);
        check([true, true, false, true]);
        g.free(1);
        assert.strictEqual(g.available, 2);
        check([true, false, false, true]);
        g.free(0);
        assert.strictEqual(g.available, 3);
        check([false, false, false, true]);
        g.next();
        check([true, false, false, true]);
        g.next();
        check([true, true, false, true]);
        g.free(3);
        check([true, true, false, false]);
        g.next();
        check([true, true, false, true]);
        g.next();
        check([true, true, true, true]);
        assert.throws(() => g.next(), "max cap 2");
    },

    "has (versioned)": () => {
        const check = (ids: number[], expected: boolean[]) => {
            for (let i = 0; i < 4; i++) {
                assert.strictEqual(g.has(ids[i]), expected[i], String(i));
                assert.strictEqual(g.has(ids[i]), expected[i], String(ids[i]));
            }
        };

        const g = new IDGen(2, 1);
        g.next();
        g.next();
        g.next();
        g.next();
        assert.throws(() => g.next(), "max cap");
        check([0, 1, 2, 3], [true, true, true, true]);
        check([0 + 4, 1 + 4, 2 + 4, 3 + 4], [false, false, false, false]);
        g.free(2);
        check([0, 1, 2, 3], [true, true, false, true]);
        check([0, 1, 2 + 4, 3], [true, true, false, true]);
        g.free(1);
        check([0, 1, 2, 3], [true, false, false, true]);
        check([0, 1 + 4, 2 + 4, 3], [true, false, false, true]);
        g.free(0);
        check([0, 1, 2, 3], [false, false, false, true]);
        check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
        g.next();
        check([0, 1 + 4, 2 + 4, 3], [false, false, false, true]);
        check([0 + 4, 1 + 4, 2 + 4, 3], [true, false, false, true]);
        g.free(0 + 4);
        check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
        // 0 version wraparound
        g.next();
        check([0, 1 + 4, 2 + 4, 3], [true, false, false, true]);
        check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
        g.next();
        check([0, 1 + 4, 2 + 4, 3], [true, true, false, true]);
        g.next();
        check([0, 1 + 4, 2 + 4, 3], [true, true, true, true]);
        g.free(0);
        g.free(1 + 4);
        g.free(2 + 4);
        g.free(3);
        check([0, 1, 2, 3], [false, false, false, false]);
        check([0 + 4, 1 + 4, 2 + 4, 3 + 4], [false, false, false, false]);
        assert.strictEqual((<any>g).freeID, 3 + 4);
    },

    notify: () => {
        const added: number[] = [];
        const removed: number[] = [];
        const g = new IDGen(8);
        g.addListener(EVENT_ADDED, ({ value }) => added.push(value));
        g.addListener(EVENT_REMOVED, ({ value }) => removed.push(value));
        g.next();
        g.next();
        g.free(0);
        g.free(1);
        g.next();
        g.next();
        g.free(0x100);
        g.free(0x101);
        assert.deepStrictEqual(added, [0, 1, 0x101, 0x100]);
        assert.deepStrictEqual(removed, [0, 1, 0x100, 0x101]);
    },

    "grow capacity": () => {
        const g = new IDGen(1, 0);
        g.next();
        g.next();
        assert.throws(() => g.next());
        g.capacity = 4;
        g.next();
        g.next();
        assert.throws(() => g.next());
        assert.strictEqual(g.capacity, 4);
        assert.strictEqual((<any>g).mask, 3);
        assert.strictEqual((<any>g).shift, 2);
        const g2 = new IDGen(1);
        assert.throws(() => (g2.capacity = 4));
    },

    clear: () => {
        const g = new IDGen(8, 0, 256, 128);
        assert.strictEqual(g.available, 128);
        assert.strictEqual(g.next(), 128);
        assert.strictEqual(g.next(), 129);
        assert.strictEqual(g.available, 126);
        g.clear();
        assert.strictEqual(g.available, 128);
        assert.strictEqual(g.used, 0);
        assert.strictEqual(g.next(), 128);
    },
});
