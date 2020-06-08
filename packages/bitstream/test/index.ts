import * as assert from "assert";
import * as bits from "../src/index";

describe("BitInputStream", function () {
    let src = new Uint8Array([
        0xbe,
        0xef,
        0xde,
        0xca,
        0xfb,
        0xad,
        0xf0,
        0x0b,
        0xaa,
    ]);
    it("iterator", () => {
        assert.equal(
            [...new bits.BitInputStream(src)].join(""),
            "101111101110111111011110110010101111101110101101111100000000101110101010",
            "all"
        );
        assert.equal(
            [...new bits.BitInputStream(src, 0, 18)].join(""),
            "101111101110111111",
            "0-18"
        );
        assert.equal(
            [...new bits.BitInputStream(src, 49)].join(""),
            "11100000000101110101010",
            "49-..."
        );
        assert.equal(
            [...new bits.BitInputStream(src, 49, 49 + 12)].join(""),
            "111000000001",
            "49+12"
        );
        assert.throws(
            () => new bits.BitInputStream(new Uint8Array(0)),
            "empty input"
        );
    });
    it("read", () => {
        let i = new bits.BitInputStream(src);
        assert.equal(i.read(4), 0xb, "b");
        assert.equal(i.read(8), 0xee, "ee");
        assert.equal(i.read(1), 0x1, "1");
        assert.equal(i.read(3), 0x7, "7");
        assert.equal(i.read(44), 15310211702528, "0xdecafbadf00");
        assert.equal(i.read(5), 0x17, "0x17");
        assert.equal(i.read(7), 0x2a, "0x2a");
        assert.throws(() => i.read(1), "EOF");
    });
    it("readBit", () => {
        let i = new bits.BitInputStream(new Uint8Array([0xaa, 0xf0]), 4, 12);
        assert.equal(i.readBit(), 1, "4");
        assert.equal(i.readBit(), 0, "5");
        assert.equal(i.readBit(), 1, "6");
        assert.equal(i.readBit(), 0, "7");
        assert.equal(i.readBit(), 1, "8");
        assert.equal(i.readBit(), 1, "9");
        assert.equal(i.readBit(), 1, "10");
        assert.equal(i.readBit(), 1, "11");
        assert.throws(() => i.readBit(), "EOF");
    });
    it("mapBitfields", () => {
        assert.deepStrictEqual(
            new bits.BitInputStream(src)
                .readFields([4, 8, 1, 3, 44, 5, 7])
                .map((x) => x.toString(16)),
            ["b", "ee", "1", "7", "decafbadf00", "17", "2a"],
            "map hex"
        );
    });
    it("position", () => {
        let src = new Uint8Array(2);
        let i = new bits.BitInputStream(src);
        assert.equal((i.read(15), i.position), 15, "15");
        assert.doesNotThrow(() => i.read(1), "not EOF");
        assert.equal(i.position, 16, "16");
        assert.throws(() => i.read(1), "EOF");
        assert.equal(i.position, 16, "16 (2)");
        assert.throws(() => new bits.BitInputStream(src, 16), "seek EOF");
        assert.throws(() => i.read(1), "EOF2");
    });
});

// prettier-ignore
describe("BitOutputStream", function () {
    it("write", () => {
        let o = new bits.BitOutputStream(8);
        assert.deepEqual([...o.write(0xff, 1).buffer], [0x80, 0, 0, 0, 0, 0, 0, 0], "1");
        assert.deepEqual([...o.write(0xff, 2).buffer], [0xe0, 0, 0, 0, 0, 0, 0, 0], "2");
        assert.deepEqual([...o.write(0xff, 4).buffer], [0xfe, 0, 0, 0, 0, 0, 0, 0], "4");
        assert.deepEqual([...o.write(0xff, 8).buffer], [0xff, 0xfe, 0, 0, 0, 0, 0, 0], "8");
        assert.deepEqual([...o.write(0, 1).buffer], [0xff, 0xfe, 0, 0, 0, 0, 0, 0], "1 zero");
        assert.deepEqual([...o.write(0xdecafbad, 16).buffer], [0xff, 0xfe, 0xfb, 0xad, 0, 0, 0, 0], "16");
        assert.deepEqual([...o.write(0xdecafbad, 32).buffer.slice(0, 8)], [0xff, 0xfe, 0xfb, 0xad, 0xde, 0xca, 0xfb, 0xad], "32");
        o = new bits.BitOutputStream(8, 4);
        assert.deepEqual([...o.write(0xf00baaf00b, 40).buffer], [0x0f, 0x0, 0xba, 0xaf, 0x00, 0xb0, 0, 0], "40");
    });
    it("writeBit", () => {
        let o = new bits.BitOutputStream(1);
        assert.deepEqual([...o.writeBit(1).buffer], [0x80], "1");
        assert.deepEqual([...o.writeBit(1).buffer], [0xc0], "2");
        assert.deepEqual([...o.writeBit(1).buffer], [0xe0], "3");
        assert.deepEqual([...o.writeBit(0).buffer], [0xe0], "4");
        assert.deepEqual([...o.writeBit(1).buffer], [0xe8], "5");
        assert.deepEqual([...o.writeBit(1).buffer], [0xec], "6");
        assert.deepEqual([...o.writeBit(1).buffer], [0xee], "7");
        assert.deepEqual([...o.writeBit(1).buffer], [0xef, 0x00], "8");
        assert.equal(o.buffer.length, 2, "len");
        assert.deepEqual([...o.writeBit(1).buffer], [0xef, 0x80], "9");
        assert.deepEqual([...o.seek(0).writeBit(0).buffer], [0x6f, 0x80], "seek 0");
        assert.deepEqual([...o.seek(0).writeBit(1).buffer], [0xef, 0x80], "seek 0 1");
        assert.deepEqual([...o.write(0, 4).buffer], [0x87, 0x80], "write 4");
    });
    it("bytes", () => {
        assert.deepEqual([...new bits.BitOutputStream().bytes()], [], "empty");
        assert.deepEqual([...new bits.BitOutputStream(1, 7).bytes()], [0], "7");
        assert.deepEqual([...new bits.BitOutputStream(2, 8).bytes()], [0], "8");
        assert.deepEqual([...new bits.BitOutputStream(2, 9).bytes()], [0, 0], "9");
    });
});
