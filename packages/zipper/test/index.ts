import * as assert from "assert";
import { arrayZipper, Location } from "../src";

describe("zipper", () => {
    let src: any[];
    let a: Location<number | number[] | (number | number[])[]>;
    beforeEach(() => {
        src = [1, [2, [3], 4], 5];
        a = arrayZipper(src);
    });

    it("down", () => {
        assert.deepEqual(a.down!.node, 1);
        assert.deepEqual(a.down!.down, undefined);
        assert.deepEqual(a.down!.right!.down!.right!.down!.node, 3);
    });

    it("up", () => {
        assert.deepEqual(a.up, undefined);
        assert.deepEqual(a.down!.up, a);
        assert.deepEqual(a.down!.next!.down!.up!.up, a);
        assert.deepEqual(a.down!.next!.down!.up!.node, [2, [3], 4]);
    });

    it("right", () => {
        assert.deepEqual(a.right!, undefined);
        assert.deepEqual(a.down!.right!.node, [2, [3], 4]);
        assert.deepEqual(a.down!.right!.right!.node, 5);
        assert.deepEqual(a.down!.right!.right!.right, undefined);
    });

    it("left", () => {
        assert.deepEqual(a.left!, undefined);
        assert.deepEqual(a.down!.left!, undefined);
        assert.deepEqual(a.down!.right!.left!.node, 1);
        assert.deepEqual(a.down!.right!.right!.left!.node, [2, [3], 4]);
    });

    it("next", () => {
        assert.deepEqual(a.next!.node, 1);
        assert.deepEqual(a.next!.next!.node, [2, [3], 4]);
        assert.deepEqual(a.next!.next!.next!.node, 2);
        assert.deepEqual(a.next!.next!.next!.next!.node, [3]);
        assert.deepEqual(a.next!.next!.next!.next!.next!.node, 3);
        assert.deepEqual(a.next!.next!.next!.next!.next!.next!.node, 4);
        assert.deepEqual(a.next!.next!.next!.next!.next!.next!.next!.node, 5);
        assert.deepEqual(
            a.next!.next!.next!.next!.next!.next!.next!.next,
            undefined
        );
    });

    it("prev", () => {
        assert.deepEqual(a.prev, undefined);
        assert.deepEqual(a.next!.prev!.node, src);
        assert.deepEqual(a.next!.next!.prev!.node, 1);
        assert.deepEqual(a.next!.next!.next!.prev!.node, [2, [3], 4]);
    });

    it("rightmost", () => {
        assert.deepEqual(a.rightmost, a);
        assert.deepEqual(a.rightmost.node, src);
        assert.deepEqual(a.rightmost.next!.node, 1);
        assert.deepEqual(a.next!.rightmost.node, 5);
        assert.deepEqual(a.next!.rightmost.next!, undefined);
        assert.deepEqual(a.next!.next!.rightmost.node, 5);
        assert.deepEqual(a.next!.next!.next!.rightmost.node, 4);
        assert.deepEqual(a.next!.next!.next!.next!.next!.rightmost.node, 3);
    });

    it("leftmost", () => {
        assert.deepEqual(a.leftmost, a);
        assert.deepEqual(a.leftmost.node, src);
        assert.deepEqual(a.leftmost.next!.node, 1);
        assert.deepEqual(a.next!.rightmost.leftmost.node, 1);
        assert.deepEqual(a.next!.leftmost.node, 1);
        assert.deepEqual(a.next!.leftmost.next!.node, [2, [3], 4]);
        assert.deepEqual(a.next!.next!.leftmost.next!.node, [2, [3], 4]);
        assert.deepEqual(a.next!.next!.next!.leftmost.next!.node, [3]);
        assert.deepEqual(a.next!.next!.next!.rightmost.leftmost.node, 2);
    });

    it("depth", ()=> {
        assert.equal(a.depth, 0);
        assert.equal(a.next!.depth, 1);
        assert.equal(a.next!.next!.depth, 1);
        assert.equal(a.next!.next!.next!.depth, 2);
        assert.equal(a.next!.next!.next!.next!.depth, 2);
        assert.equal(a.next!.next!.next!.next!.next!.depth, 3);
    });

    it("replace (next)", () => {
        assert.deepEqual(a.replace(10).root, 10);
        assert.deepEqual(a.next!.replace(10).root, [10, [2, [3], 4], 5]);
        assert.deepEqual(a.next!.next!.replace(10).root, [1, 10, 5]);
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.replace(10).root,
            [1, [10, [3], 4], 5]
            );
        // prettier-ignore
        assert.deepEqual(
                a.next!.next!.next!.next!.replace(10).root,
                [1, [2, 10, 4], 5]
                );
        // prettier-ignore
        assert.deepEqual(
                    a.next!.next!.next!.next!.next!.replace(10).root,
                    [1, [2, [10], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.next!.next!.replace(10).root,
            [1, [2, [3], 10], 5]
        );
        // prettier-ignore
        assert.deepEqual(
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
        assert.deepEqual(
            a.next!.insertLeft(10).root,
            [10, 1, [2, [3], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.insertLeft(10).root,
            [1, 10, [2, [3], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.insertLeft(10).root,
            [1, [10, 2, [3], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.insertLeft(10).root,
            [1, [2, 10, [3], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.next!.insertLeft(10).root,
            [1, [2, [10, 3], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.next!.next!.insertLeft(10).root,
            [1, [2, [3], 10, 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.next!.next!.next!.insertLeft(10).root,
            [1, [2, [3], 4], 10, 5]
        );
    });

    it("insertRight", () => {
        assert.throws(() => a.insertRight(10));
        // prettier-ignore
        assert.deepEqual(
            a.next!.insertRight(10).root,
            [1, 10, [2, [3], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.insertRight(10).root,
            [1, [2, [3], 4], 10, 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.insertRight(10).root,
            [1, [2, 10, [3], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.insertRight(10).root,
            [1, [2, [3], 10, 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.next!.insertRight(10).root,
            [1, [2, [3, 10], 4], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.next!.next!.insertRight(10).root,
            [1, [2, [3], 4, 10], 5]
        );
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.next!.next!.next!.insertRight(10).root,
            [1, [2, [3], 4], 5, 10]
        );
    });

    it("insertChild", () => {
        assert.deepEqual(a.insertChild(10).root, [10, 1, [2, [3], 4], 5]);
        assert.throws(() => a.next!.insertChild(10));
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.insertChild(10).root,
            [1, [10, 2, [3], 4], 5]
            );
        assert.throws(() => a.next!.next!.next!.insertChild(10));
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.insertChild(10).root,
            [1, [2, [10, 3], 4], 5]
        );
    });

    it("appendChild", () => {
        assert.deepEqual(a.appendChild(10).root, [1, [2, [3], 4], 5, 10]);
        assert.throws(() => a.next!.appendChild(10));
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.appendChild(10).root,
            [1, [2, [3], 4, 10], 5]
            );
        assert.throws(() => a.next!.next!.next!.appendChild(10));
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.next!.appendChild(10).root,
            [1, [2, [3,10], 4], 5]
        );
    });

    it("update", () => {
        // prettier-ignore
        assert.deepEqual(
            a.next!.next!.next!.update((x, n: number)=><number>x * n, 10).root,
            [1, [20, [3], 4], 5]
        );
    });
});
