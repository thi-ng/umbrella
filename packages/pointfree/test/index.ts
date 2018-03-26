import * as assert from "assert";
import * as pf from "../src/index";
import { StackContext } from "../src/api";

describe("pointfree", () => {

    it("depth", () => {
        assert.deepEqual(pf.depth([[]])[0], [0]);
        assert.deepEqual(pf.depth([[10]])[0], [10, 1]);
        assert.deepEqual(pf.depth([[10, 20]])[0], [10, 20, 2]);
    });

    it("push", () => {
        assert.deepEqual(pf.push()([[]])[0], []);
        assert.deepEqual(pf.push(1)([[]])[0], [1]);
        assert.deepEqual(pf.push(2, 3)([[1]])[0], [1, 2, 3]);
    });

    it("dup", () => {
        assert.throws(() => pf.dup([[]]));
        assert.deepEqual(pf.dup([[1]])[0], [1, 1]);
        assert.deepEqual(pf.dup([[1, 2]])[0], [1, 2, 2]);
    });

    it("dup2", () => {
        assert.throws(() => pf.dup2([[1]]));
        assert.deepEqual(pf.dup2([[1, 2]])[0], [1, 2, 1, 2]);
        assert.deepEqual(pf.dup2([[1, 2, 3]])[0], [1, 2, 3, 2, 3]);
    });

    it("dupIf", () => {
        assert.throws(() => pf.dupIf([[]]));
        assert.deepEqual(pf.dupIf([[0]])[0], [0]);
        assert.deepEqual(pf.dupIf([[1]])[0], [1, 1]);
    });

    it("drop", () => {
        assert.throws(() => pf.drop([[]]));
        assert.deepEqual(pf.drop([[0]])[0], []);
        assert.deepEqual(pf.drop([[1, 2]])[0], [1]);
    });

    it("drop2", () => {
        assert.throws(() => pf.drop2([[1]]));
        assert.deepEqual(pf.drop2([[1, 2]])[0], []);
        assert.deepEqual(pf.drop2([[1, 2, 3]])[0], [1]);
    });

    it("dropIf", () => {
        assert.throws(() => pf.dropIf([[]]));
        assert.deepEqual(pf.dropIf([[0]])[0], [0]);
        assert.deepEqual(pf.dropIf([[1]])[0], []);
    });

    it("swap", () => {
        assert.throws(() => pf.swap([[1]]));
        assert.deepEqual(pf.swap([[0, 1]])[0], [1, 0]);
        assert.deepEqual(pf.swap([[1, 2, 3]])[0], [1, 3, 2]);
    });

    it("swap2", () => {
        assert.throws(() => pf.swap2([[1, 2, 3]]));
        assert.deepEqual(pf.swap2([[0, 1, 2, 3]])[0], [2, 3, 0, 1]);
        assert.deepEqual(pf.swap2([[0, 1, 2, 3, 4]])[0], [0, 3, 4, 1, 2]);
    });

    it("nip", () => {
        assert.throws(() => pf.nip([[1]]));
        assert.deepEqual(pf.nip([[0, 1]])[0], [1]);
        assert.deepEqual(pf.nip([[0, 1, 2]])[0], [0, 2]);
    });

    it("tuck", () => {
        assert.throws(() => pf.tuck([[1]]));
        assert.deepEqual(pf.tuck([[0, 1]])[0], [1, 0, 1]);
        assert.deepEqual(pf.tuck([[0, 1, 2]])[0], [0, 2, 1, 2]);
    });

    it("over", () => {
        assert.throws(() => pf.over([[1]]));
        assert.deepEqual(pf.over([[0, 1]])[0], [0, 1, 0]);
        assert.deepEqual(pf.over([[0, 1, 2]])[0], [0, 1, 2, 1]);
    });

    it("rot", () => {
        assert.throws(() => pf.rot([[1, 2]]));
        assert.deepEqual(pf.rot([[0, 1, 2]])[0], [1, 2, 0]);
        assert.deepEqual(pf.rot([[0, 1, 2, 3]])[0], [0, 2, 3, 1]);
    });

    it("invrot", () => {
        assert.throws(() => pf.invrot([[1, 2]]));
        assert.deepEqual(pf.invrot([[0, 1, 2]])[0], [2, 0, 1]);
        assert.deepEqual(pf.invrot([[0, 1, 2, 3]])[0], [0, 3, 1, 2]);
    });

    it("pick", () => {
        assert.throws(() => pf.pick([[]]));
        assert.throws(() => pf.pick([[0]]));
        assert.throws(() => pf.pick([[0, 1]]));
        assert.deepEqual(pf.pick([[0, 1, 0]])[0], [0, 1, 1]);
        assert.deepEqual(pf.pick([[0, 1, 1]])[0], [0, 1, 0]);
    });

    it("mapN", () => {
        let f = x => x + 10;
        assert.throws(() => pf.mapN(f)([[]]));
        assert.throws(() => pf.mapN(f)([[0]]));
        assert.throws(() => pf.mapN(f)([[0, 1]]));
        assert.deepEqual(pf.mapN(f)([[0, 1, 0]])[0], [0, 11]);
        assert.deepEqual(pf.mapN(f)([[0, 1, 1]])[0], [10, 1]);
    });

    it("add", () => {
        assert.throws(() => pf.add([[1]]));
        assert.deepEqual(pf.add([[1, 2]])[0], [3]);
    });

    it("mul", () => {
        assert.throws(() => pf.mul([[1]]));
        assert.deepEqual(pf.mul([[2, -3]])[0], [-6]);
    });

    it("sub", () => {
        assert.throws(() => pf.sub([[1]]));
        assert.deepEqual(pf.sub([[2, 3]])[0], [-1]);
    });

    it("div", () => {
        assert.throws(() => pf.div([[1]]));
        assert.deepEqual(pf.div([[1, -10]])[0], [-0.1]);
    });

    it("mod", () => {
        assert.throws(() => pf.mod([[1]]));
        assert.deepEqual(pf.mod([[12, 10]])[0], [2]);
    });

    it("inc", () => {
        assert.throws(() => pf.inc([[]]));
        assert.deepEqual(pf.inc([[1]])[0], [2]);
        assert.deepEqual(pf.inc([[1, 2]])[0], [1, 3]);
    });

    it("dec", () => {
        assert.throws(() => pf.dec([[]]));
        assert.deepEqual(pf.dec([[1]])[0], [0]);
        assert.deepEqual(pf.dec([[1, 2]])[0], [1, 1]);
    });

    it("neg", () => {
        assert.throws(() => pf.neg([[]]));
        assert.deepEqual(pf.neg([[1]])[0], [-1]);
        assert.deepEqual(pf.neg([[1, 2]])[0], [1, -2]);
    });

    it("pow", () => {
        assert.throws(() => pf.pow([[1]]));
        assert.deepEqual(pf.pow([[1, 2]])[0], [1]);
        assert.deepEqual(pf.pow([[1, 2, 3]])[0], [1, 8]);
    });

    it("sqrt", () => {
        assert.throws(() => pf.sqrt([[]]));
        assert.deepEqual(pf.sqrt([[1]])[0], [1]);
        assert.deepEqual(pf.sqrt([[1, 9]])[0], [1, 3]);
    });

    it("bitAnd", () => {
        assert.throws(() => pf.bitAnd([[0]]));
        assert.deepEqual(pf.bitAnd([[0x1a, 0xfc]])[0], [0x18]);
    });

    it("bitOr", () => {
        assert.throws(() => pf.bitOr([[0]]));
        assert.deepEqual(pf.bitOr([[0xf0, 0x1]])[0], [0xf1]);
    });

    it("bitXor", () => {
        assert.throws(() => pf.bitXor([[0]]));
        assert.deepEqual(pf.bitXor([[0xff, 0xaa]])[0], [0x55]);
    });

    it("bitNot", () => {
        assert.throws(() => pf.bitNot([[]]));
        assert.deepEqual(pf.bitNot([[0x7f]])[0], [-0x80]);
    });

    it("lsl", () => {
        assert.throws(() => pf.lsl([[]]));
        assert.deepEqual(pf.lsl([[0xf, 16]])[0], [0xf0000]);
    });

    it("lsr", () => {
        assert.throws(() => pf.lsr([[]]));
        assert.deepEqual(pf.lsr([[0xdecafbad, 16]])[0], [-8502]);
    });

    it("lsru", () => {
        assert.throws(() => pf.lsru([[]]));
        assert.deepEqual(pf.lsru([[0xdecafbad, 16]])[0], [0xdeca]);
    });

    it("and", () => {
        assert.throws(() => pf.and([[0]]));
        assert.deepEqual(pf.and([[0, 0]])[0], [false]);
        assert.deepEqual(pf.and([[0, 1]])[0], [false]);
        assert.deepEqual(pf.and([[1, 0]])[0], [false]);
        assert.deepEqual(pf.and([[1, 1]])[0], [true]);
    });

    it("or", () => {
        assert.throws(() => pf.or([[0]]));
        assert.deepEqual(pf.or([[0, 0]])[0], [false]);
        assert.deepEqual(pf.or([[0, 1]])[0], [true]);
        assert.deepEqual(pf.or([[1, 0]])[0], [true]);
        assert.deepEqual(pf.or([[1, 1]])[0], [true]);
    });

    it("not", () => {
        assert.throws(() => pf.not([[]]));
        assert.deepEqual(pf.not([[1]])[0], [false]);
        assert.deepEqual(pf.not([[0]])[0], [true]);
    });

    it("eq", () => {
        assert.throws(() => pf.eq([[1]]));
        assert.deepEqual(pf.eq([[1, 1]])[0], [true]);
        assert.deepEqual(pf.eq([[1, -1]])[0], [false]);
        assert.deepEqual(pf.eq([[1, "1"]])[0], [false]);
        assert.deepEqual(pf.eq([[[1], [1]]])[0], [false]);
    });

    it("neq", () => {
        assert.throws(() => pf.neq([[1]]));
        assert.deepEqual(pf.neq([[1, 1]])[0], [false]);
        assert.deepEqual(pf.neq([[1, -1]])[0], [true]);
        assert.deepEqual(pf.neq([[1, "1"]])[0], [true]);
        assert.deepEqual(pf.neq([[[1], [1]]])[0], [true]);
    });

    it("equiv", () => {
        assert.throws(() => pf.equiv([[1]]));
        assert.deepEqual(pf.equiv([[1, 1]])[0], [true]);
        assert.deepEqual(pf.equiv([[1, -1]])[0], [false]);
        assert.deepEqual(pf.equiv([[1, "1"]])[0], [false]);
        assert.deepEqual(pf.equiv([[[1], [1]]])[0], [true]);
    });

    it("lt", () => {
        assert.throws(() => pf.lt([[1]]));
        assert.deepEqual(pf.lt([[1, -1]])[0], [false]);
        assert.deepEqual(pf.lt([[1, 1]])[0], [false]);
        assert.deepEqual(pf.lt([[1, 2]])[0], [true]);
    });

    it("lteq", () => {
        assert.throws(() => pf.lteq([[1]]));
        assert.deepEqual(pf.lteq([[1, -1]])[0], [false]);
        assert.deepEqual(pf.lteq([[1, 1]])[0], [true]);
        assert.deepEqual(pf.lteq([[1, 2]])[0], [true]);
    });

    it("gt", () => {
        assert.throws(() => pf.gt([[1]]));
        assert.deepEqual(pf.gt([[1, -1]])[0], [true]);
        assert.deepEqual(pf.gt([[1, 1]])[0], [false]);
        assert.deepEqual(pf.gt([[1, 2]])[0], [false]);
    });

    it("gteq", () => {
        assert.throws(() => pf.gteq([[1]]));
        assert.deepEqual(pf.gteq([[1, -1]])[0], [true]);
        assert.deepEqual(pf.gteq([[1, 1]])[0], [true]);
        assert.deepEqual(pf.gteq([[1, 2]])[0], [false]);
    });

    it("isZero", () => {
        assert.throws(() => pf.isZero([[]]));
        assert.deepEqual(pf.isZero([[0]])[0], [true]);
        assert.deepEqual(pf.isZero([[0.0]])[0], [true]);
        assert.deepEqual(pf.isZero([[1]])[0], [false]);
        assert.deepEqual(pf.isZero([[null]])[0], [false]);
    });

    it("isPos", () => {
        assert.throws(() => pf.isPos([[]]));
        assert.deepEqual(pf.isPos([[0]])[0], [false]);
        assert.deepEqual(pf.isPos([[0.0]])[0], [false]);
        assert.deepEqual(pf.isPos([[1]])[0], [true]);
        assert.deepEqual(pf.isPos([[-1]])[0], [false]);
        assert.deepEqual(pf.isPos([[null]])[0], [false]);
    });

    it("isNeg", () => {
        assert.throws(() => pf.isNeg([[]]));
        assert.deepEqual(pf.isNeg([[0]])[0], [false]);
        assert.deepEqual(pf.isNeg([[0.0]])[0], [false]);
        assert.deepEqual(pf.isNeg([[1]])[0], [false]);
        assert.deepEqual(pf.isNeg([[-1]])[0], [true]);
        assert.deepEqual(pf.isNeg([[null]])[0], [false]);
    });

    it("isNull", () => {
        assert.throws(() => pf.isNull([[]]));
        assert.deepEqual(pf.isNull([[0]])[0], [false]);
        assert.deepEqual(pf.isNull([[1]])[0], [false]);
        assert.deepEqual(pf.isNull([[null]])[0], [true]);
        assert.deepEqual(pf.isNull([[undefined]])[0], [true]);
    });

    it("list", () => {
        assert.deepEqual(pf.list([[]])[0], [[]]);
        const foo = pf.word([[], 1, pf.pushr]);
        const bar = pf.word([pf.list, 1, pf.pushr]);
        assert.deepEqual(foo([[]])[0], [[1]]);
        assert.deepEqual(foo([[]])[0], [[1, 1]]);
        assert.deepEqual(bar([[]])[0], [[1]]);
        assert.deepEqual(bar([[]])[0], [[1]]);
    });

    it("pushl", () => {
        assert.throws(() => pf.pushl([[[]]]));
        assert.deepEqual(pf.pushl([[1, []]])[0], [[1]]);
    });

    it("pushr", () => {
        assert.throws(() => pf.pushr([[[]]]));
        assert.deepEqual(pf.pushr([[[], 1]])[0], [[1]]);
    });

    it("popr", () => {
        assert.throws(() => pf.popr([[]]));
        assert.throws(() => pf.popr([[[]]]));
        assert.deepEqual(pf.popr([[[1]]])[0], [[], 1]);
        assert.deepEqual(pf.popr([[[1, 2]]])[0], [[1], 2]);
    });

    it("pull", () => {
        assert.throws(() => pf.pull([[]]));
        assert.throws(() => pf.pull([[[]]]));
        assert.deepEqual(pf.pull([[[1]]])[0], [1, []]);
        assert.deepEqual(pf.pull([[[1, 2]]])[0], [2, [1]]);
        assert.deepEqual(pf.pull(pf.pull([[[1, 2]]]))[0], [2, 1, []]);
    });

    it("pull2", () => {
        assert.throws(() => pf.pull2([[[1]]]));
        assert.deepEqual(pf.pull2([[[1, 2]]])[0], [2, 1, []]);
    });

    it("pull3", () => {
        assert.throws(() => pf.pull3([[[1, 2]]]));
        assert.deepEqual(pf.pull3([[[1, 2, 3]]])[0], [3, 2, 1, []]);
    });

    it("pull4", () => {
        assert.throws(() => pf.pull4([[[1, 2, 3]]]));
        assert.deepEqual(pf.pull4([[[1, 2, 3, 4]]])[0], [4, 3, 2, 1, []]);
    });

    it("ladd", () => {
        assert.throws(() => pf.ladd([[[]]]));
        assert.deepEqual(pf.ladd([[[1, 2, 3], [10, 20, 30]]])[0], [[11, 22, 33]]);
        assert.deepEqual(pf.ladd([[[1, 2, 3], 10]])[0], [[11, 12, 13]]);
        assert.deepEqual(pf.ladd([[10, [1, 2, 3]]])[0], [[11, 12, 13]]);
    });

    it("lmul", () => {
        assert.throws(() => pf.lmul([[[]]]));
        assert.deepEqual(pf.lmul([[[1, 2, 3], [10, 20, 30]]])[0], [[10, 40, 90]]);
        assert.deepEqual(pf.lmul([[[1, 2, 3], 10]])[0], [[10, 20, 30]]);
        assert.deepEqual(pf.lmul([[10, [1, 2, 3]]])[0], [[10, 20, 30]]);
    });

    it("lsub", () => {
        assert.throws(() => pf.lsub([[[]]]));
        assert.deepEqual(pf.lsub([[[1, 2, 3], [10, 20, 30]]])[0], [[-9, -18, -27]]);
        assert.deepEqual(pf.lsub([[[1, 2, 3], 10]])[0], [[-9, -8, -7]]);
        assert.deepEqual(pf.lsub([[10, [1, 2, 3]]])[0], [[9, 8, 7]]);
    });

    it("ldiv", () => {
        assert.throws(() => pf.ldiv([[[]]]));
        assert.deepEqual(pf.ldiv([[[1, 2, 3], [10, 20, 30]]])[0], [[0.1, 0.1, 0.1]]);
        assert.deepEqual(pf.ldiv([[[1, 2, 3], 10]])[0], [[0.1, 0.2, 0.3]]);
        assert.deepEqual(pf.ldiv([[10, [1, 2, 3]]])[0], [[10, 5, 10 / 3]]);
    });

    it("lsplit", () => {
        assert.throws(() => pf.lsplit([[]]));
        assert.deepEqual(pf.lsplit([[[1, 2, 3, 4], 2]])[0], [[1, 2], [3, 4]]);
        assert.deepEqual(pf.lsplit([[[1, 2, 3, 4], 4]])[0], [[1, 2, 3, 4], []]);
        assert.deepEqual(pf.lsplit([[[1, 2, 3, 4], -1]])[0], [[1, 2, 3], [4]]);
    });

    it("foldl", () => {
        assert.throws(() => pf.foldl([[], 0]));
        assert.deepEqual(pf.foldl([[[1, 2, 3, 4], 0, [pf.add]]])[0], [10]);
    });

    it("collect", () => {
        assert.throws(() => pf.collect([[]]));
        assert.deepEqual(pf.collect([[1, 2, 3, 4, 0]])[0], [1, 2, 3, 4, []]);
        assert.deepEqual(pf.collect([[1, 2, 3, 4, 1]])[0], [1, 2, 3, [4]]);
        assert.deepEqual(pf.collect([[1, 2, 3, 4, 3]])[0], [1, [2, 3, 4]]);
        assert.throws(() => pf.collect([[1, 2, 3, 4, 5]]));
    });

    it("tuple", () => {
        assert.throws(() => pf.tuple(1)([[]]));
        assert.deepEqual(pf.tuple(1)([[1]])[0], [[1]]);
        assert.deepEqual(pf.tuple(1)([[1, 2]])[0], [1, [2]]);
        assert.deepEqual(pf.tuple(2)([[1, 2]])[0], [[1, 2]]);
    });

    it("length", () => {
        assert.throws(() => pf.length([[]]));
        assert.deepEqual(pf.length([[[10]]])[0], [1]);
        assert.deepEqual(pf.length([[[10, 20]]])[0], [2]);
        assert.deepEqual(pf.length([["a"]])[0], [1]);
    });

    it("join", () => {
        assert.throws(() => pf.join()([[]]));
        assert.deepEqual(pf.join()([[["a", 1]]])[0], ["a1"]);
        assert.deepEqual(pf.join("-")([[["a", 1]]])[0], ["a-1"]);
    });

    it("at", () => {
        assert.throws(() => pf.at([[1]]));
        assert.deepEqual(pf.at([[[10, 20], 0]])[0], [10]);
        assert.deepEqual(pf.at([[[10, 20], 1]])[0], [20]);
        assert.deepEqual(pf.at([["ab", 1]])[0], ["b"]);
        assert.deepEqual(pf.at([[{ id: 42 }, "id"]])[0], [42]);
    });

    it("storeAt", () => {
        assert.throws(() => pf.storeAt([[1, 2]]));
        let a: any = [10, 20];
        assert.deepEqual(pf.storeAt([[30, a, 0]])[0], []);
        assert.deepEqual(a, [30, 20]);
        a = [10, 20];
        assert.deepEqual(pf.storeAt([[30, a, 3]])[0], []);
        assert.deepEqual(a, [10, 20, , 30]);
        a = {};
        assert.deepEqual(pf.storeAt([[30, a, "a"]])[0], []);
        assert.deepEqual(a, { a: 30 });
    });

    it("load", () => {
        assert.throws(() => pf.load([[]]));
        assert.deepEqual(pf.load([["a"], { a: 1 }])[0], [1]);
        assert.deepEqual(pf.load([["b"], { a: 1 }])[0], [undefined]);
    });

    it("store", () => {
        assert.throws(() => pf.store([[1]]));
        assert.deepEqual(pf.store([[10, "a"], {}]), [[], { a: 10 }]);
        assert.deepEqual(pf.store([[10, "b"], { a: 1 }]), [[], { a: 1, b: 10 }]);
    });

    it("loadKey", () => {
        assert.deepEqual(pf.loadKey("a")([[0], { a: 1 }])[0], [0, 1]);
        assert.deepEqual(pf.loadKey("b")([[0], { a: 1 }])[0], [0, undefined]);
    });

    it("storeKey", () => {
        assert.throws(() => pf.storeKey("a")([[]]));
        assert.deepEqual(pf.storeKey("a")([[10], {}]), [[], { a: 10 }]);
        assert.deepEqual(pf.storeKey("b")([[10], { a: 1 }]), [[], { a: 1, b: 10 }]);
    });

    it("pushEnv", () => {
        assert.deepEqual(pf.pushEnv([[0], { a: 10 }]), [[0, { a: 10 }], { a: 10 }]);
    });

    it("unwrap", () => {
        const res: StackContext = [[1, 2, 3], {}];
        assert.equal(pf.unwrap([[], {}]), undefined);
        assert.equal(pf.unwrap(res), 3);
        assert.deepEqual(pf.unwrap(res, 2), [2, 3]);
        assert.deepEqual(pf.unwrap(res, 3), [1, 2, 3]);
        assert.deepEqual(pf.unwrap(res, 4), [1, 2, 3]);
    });

    it("exec", () => {
        assert.throws(() => pf.exec([[]]));
        assert.throws(() => pf.exec([[pf.add]]));
        assert.throws(() => pf.exec([[1, pf.add]]));
        assert.deepEqual(pf.exec([[1, 2, pf.add]])[0], [3]);
    });

    it("execQ", () => {
        assert.throws(() => pf.execQ([[]]));
        assert.throws(() => pf.execQ([[[pf.add]]]));
        assert.throws(() => pf.execQ([[[1, pf.add]]]));
        assert.deepEqual(pf.execQ([[[1, 2, pf.add]]])[0], [3]);
    });

    it("cond", () => {
        assert.throws(() => pf.cond([], [])([[]]));
        assert.deepEqual(pf.cond([1], [2])([[undefined]])[0], [2]);
        assert.deepEqual(pf.cond([1], [2])([[null]])[0], [2]);
        assert.deepEqual(pf.cond([1], [2])([[0]])[0], [2]);
        assert.deepEqual(pf.cond([1], [2])([[true]])[0], [1]);
        assert.deepEqual(pf.cond([1], [2])([[-1]])[0], [1]);
        assert.deepEqual(pf.cond([1, pf.dup], [2, pf.dup])([[-1]])[0], [1, 1]);
        assert.deepEqual(pf.cond([1, pf.dup], [2, pf.dup])([[0]])[0], [2, 2]);
    });

    it("condM", () => {
        let classify = (x) =>
            pf.condM({
                0: ["zero"],
                1: ["one"],
                default: [
                    pf.isPos,
                    pf.cond(["many"], ["invalid"])
                ]
            })([[x]])[0];

        assert.equal(classify(0), "zero");
        assert.equal(classify(1), "one");
        assert.equal(classify(100), "many");
        assert.equal(classify(-1), "invalid");
        assert.throws(() => pf.condM({})([[0]]));
    });

    it("word", () => {
        assert.deepEqual(pf.word([pf.dup, pf.mul])([[2]])[0], [4]);
        assert.deepEqual(pf.word([pf.pushEnv], { a: 1 })([[0]])[0], [0, { a: 1 }]);
        assert.deepEqual(pf.word([pf.pushEnv], { a: 1 }, true)([[0], { b: 2 }])[0], [0, { a: 1, b: 2 }]);
        assert.deepEqual(pf.word([pf.add, pf.mul])([[1, 2, 3]])[0], [5]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add])([[1, 2, 3, 4]])[0], [15]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul])([[1, 2, 3, 4, 5]])[0], [29]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add])([[1, 2, 3, 4, 5, 6]])[0], [95]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul])([[1, 2, 3, 4, 5, 6, 7]])[0], [209]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add])([[1, 2, 3, 4, 5, 6, 7, 8]])[0], [767]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul])([[1, 2, 3, 4, 5, 6, 7, 8, 9]])[0], [1889]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add])([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]])[0], [7679]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul])([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]])[0], [20789]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add])([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]])[0], [92159]);
    });

    it("wordU", () => {
        assert.deepEqual(pf.wordU([pf.dup, pf.mul])([[2]]), 4);
        assert.deepEqual(pf.wordU([pf.pushEnv], 1, { a: 1 })([[]]), { a: 1 });
        assert.deepEqual(pf.wordU([pf.pushEnv], 1, { a: 1 }, true)([[], { b: 2 }]), { a: 1, b: 2 });
    });
});
