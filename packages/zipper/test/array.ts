import * as assert from "assert";
import { arrayZipper, Location } from "../src";

describe("arrayZipper", () => {
    let src: any[];
    let a: Location<number | number[] | (number | number[])[]>;
    beforeEach(() => {
        src = [1, [2, [3], 4], 5];
        a = arrayZipper(src);
    });

    it("isBranch", () => {
        assert(a.isBranch);
        assert(!a.next!.isBranch);
        assert(a.next!.next!.isBranch);
    });

    it("isFirst", () => {
        assert(a.isFirst);
        assert(a.next!.isFirst);
        assert(!a.next!.next!.isFirst);
        assert(a.next!.next!.next!.isFirst);
    });

    it("isLast", () => {
        assert(a.isLast);
        assert(a.down!.rightmost.isLast);
        assert(!a.next!.isLast);
        assert(!a.next!.next!.isLast);
        assert(a.next!.next!.next!.rightmost!.isLast);
    });

    it("down", () => {
        assert.deepStrictEqual(a.down!.node, 1);
        assert.deepStrictEqual(a.down!.down, undefined);
        assert.deepStrictEqual(a.down!.right!.down!.right!.down!.node, 3);
    });

    it("up", () => {
        assert.deepStrictEqual(a.up, undefined);
        assert.deepStrictEqual(a.down!.up, a);
        assert.deepStrictEqual(a.down!.next!.down!.up!.up, a);
        assert.deepStrictEqual(a.down!.next!.down!.up!.node, [2, [3], 4]);
    });

    it("right", () => {
        assert.deepStrictEqual(a.right!, undefined);
        assert.deepStrictEqual(a.down!.right!.node, [2, [3], 4]);
        assert.deepStrictEqual(a.down!.right!.right!.node, 5);
        assert.deepStrictEqual(a.down!.right!.right!.right, undefined);
    });

    it("left", () => {
        assert.deepStrictEqual(a.left!, undefined);
        assert.deepStrictEqual(a.down!.left!, undefined);
        assert.deepStrictEqual(a.down!.right!.left!.node, 1);
        assert.deepStrictEqual(a.down!.right!.right!.left!.node, [2, [3], 4]);
    });

    it("next", () => {
        assert.deepStrictEqual(a.next!.node, 1);
        assert.deepStrictEqual(a.next!.next!.node, [2, [3], 4]);
        assert.deepStrictEqual(a.next!.next!.next!.node, 2);
        assert.deepStrictEqual(a.next!.next!.next!.next!.node, [3]);
        assert.deepStrictEqual(a.next!.next!.next!.next!.next!.node, 3);
        assert.deepStrictEqual(a.next!.next!.next!.next!.next!.next!.node, 4);
        assert.deepStrictEqual(
            a.next!.next!.next!.next!.next!.next!.next!.node,
            5
        );
        assert.deepStrictEqual(
            a.next!.next!.next!.next!.next!.next!.next!.next,
            undefined
        );
    });

    it("prev", () => {
        assert.deepStrictEqual(a.prev, undefined);
        assert.deepStrictEqual(a.next!.prev!.node, src);
        assert.deepStrictEqual(a.next!.next!.prev!.node, 1);
        assert.deepStrictEqual(a.next!.next!.next!.prev!.node, [2, [3], 4]);
    });

    it("rightmost", () => {
        assert.deepStrictEqual(a.rightmost, a);
        assert.deepStrictEqual(a.rightmost.node, src);
        assert.deepStrictEqual(a.rightmost.next!.node, 1);
        assert.deepStrictEqual(a.next!.rightmost.node, 5);
        assert.deepStrictEqual(a.next!.rightmost.next!, undefined);
        assert.deepStrictEqual(a.next!.next!.rightmost.node, 5);
        assert.deepStrictEqual(a.next!.next!.next!.rightmost.node, 4);
        assert.deepStrictEqual(
            a.next!.next!.next!.next!.next!.rightmost.node,
            3
        );
    });

    it("leftmost", () => {
        assert.deepStrictEqual(a.leftmost, a);
        assert.deepStrictEqual(a.leftmost.node, src);
        assert.deepStrictEqual(a.leftmost.next!.node, 1);
        assert.deepStrictEqual(a.next!.rightmost.leftmost.node, 1);
        assert.deepStrictEqual(a.next!.leftmost.node, 1);
        assert.deepStrictEqual(a.next!.leftmost.next!.node, [2, [3], 4]);
        assert.deepStrictEqual(a.next!.next!.leftmost.next!.node, [2, [3], 4]);
        assert.deepStrictEqual(a.next!.next!.next!.leftmost.next!.node, [3]);
        assert.deepStrictEqual(a.next!.next!.next!.rightmost.leftmost.node, 2);
    });

    it("replace (next)", () => {
        assert.deepStrictEqual(a.replace(10).root, 10);
        assert.deepStrictEqual(a.next!.replace(10).root, [10, [2, [3], 4], 5]);
        assert.deepStrictEqual(a.next!.next!.replace(10).root, [1, 10, 5]);
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.replace(10).root,
            [1, [10, [3], 4], 5]
            );
        // prettier-ignore
        assert. deepStrictEqual(
                a.next!.next!.next!.next!.replace(10).root,
                [1, [2, 10, 4], 5]
                );
        // prettier-ignore
        assert. deepStrictEqual(
                    a.next!.next!.next!.next!.next!.replace(10).root,
                    [1, [2, [10], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.next!.next!.replace(10).root,
            [1, [2, [3], 10], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.next!.next!.next!.replace(10).root,
            [1, [2, [3], 4], 10]
        );
        // prettier-ignore
        assert.throws(
            () => a.next!.next!.next!.next!.next!.next!.next!.next!.replace(10).root
        );
    });

    it("insertLeft", () => {
        assert.throws(() => a.insertLeft(10));
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.insertLeft(10).root,
            [10, 1, [2, [3], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.insertLeft(10).root,
            [1, 10, [2, [3], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.insertLeft(10).root,
            [1, [10, 2, [3], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.insertLeft(10).root,
            [1, [2, 10, [3], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.next!.insertLeft(10).root,
            [1, [2, [10, 3], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.next!.next!.insertLeft(10).root,
            [1, [2, [3], 10, 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.next!.next!.next!.insertLeft(10).root,
            [1, [2, [3], 4], 10, 5]
        );
    });

    it("insertRight", () => {
        assert.throws(() => a.insertRight(10));
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.insertRight(10).root,
            [1, 10, [2, [3], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.insertRight(10).root,
            [1, [2, [3], 4], 10, 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.insertRight(10).root,
            [1, [2, 10, [3], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.insertRight(10).root,
            [1, [2, [3], 10, 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.next!.insertRight(10).root,
            [1, [2, [3, 10], 4], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.next!.next!.insertRight(10).root,
            [1, [2, [3], 4, 10], 5]
        );
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.next!.next!.next!.insertRight(10).root,
            [1, [2, [3], 4], 5, 10]
        );
    });

    it("insertChild", () => {
        assert.deepStrictEqual(a.insertChild(10).root, [10, 1, [2, [3], 4], 5]);
        assert.throws(() => a.next!.insertChild(10));
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.insertChild(10).root,
            [1, [10, 2, [3], 4], 5]
            );
        assert.throws(() => a.next!.next!.next!.insertChild(10));
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.insertChild(10).root,
            [1, [2, [10, 3], 4], 5]
        );
    });

    it("appendChild", () => {
        assert.deepStrictEqual(a.appendChild(10).root, [1, [2, [3], 4], 5, 10]);
        assert.throws(() => a.next!.appendChild(10));
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.appendChild(10).root,
            [1, [2, [3], 4, 10], 5]
            );
        assert.throws(() => a.next!.next!.next!.appendChild(10));
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.next!.appendChild(10).root,
            [1, [2, [3,10], 4], 5]
        );
    });

    it("update", () => {
        // prettier-ignore
        assert. deepStrictEqual(
            a.next!.next!.next!.update((x, n: number)=><number>x * n, 10).root,
            [1, [20, [3], 4], 5]
        );
    });
});
