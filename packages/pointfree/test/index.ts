import * as assert from "assert";
import * as pf from "../src/index";
import { StackContext } from "../src/api";

describe("pointfree", () => {

    const $ = pf.ctx;

    it("dsp", () => {
        assert.deepEqual(pf.dsp($())[0], [0]);
        assert.deepEqual(pf.dsp($([10]))[0], [10, 1]);
        assert.deepEqual(pf.dsp($([10, 20]))[0], [10, 20, 2]);
    });

    it("rsp", () => {
        assert.deepEqual(pf.rsp($())[0], [0]);
        assert.deepEqual(pf.rsp([[], [10], {}])[0], [1]);
        assert.deepEqual(pf.rsp([[100], [10, 20], {}])[0], [100, 2]);
    });

    it("movdr", () => {
        assert.throws(() => pf.movdr($()));
        assert.deepEqual(pf.movdr($([1])), [[], [1], {}]);
        assert.deepEqual(pf.movdr([[1, 2], [10], {}]), [[1], [10, 2], {}]);
    });

    it("movrd", () => {
        assert.throws(() => pf.movrd($()));
        assert.deepEqual(pf.movrd([[], [1], {}]), [[1], [], {}]);
        assert.deepEqual(pf.movrd([[10], [1, 2], {}]), [[10, 2], [1], {}]);
    });

    it("push", () => {
        assert.deepEqual(pf.push()($())[0], []);
        assert.deepEqual(pf.push(1)($())[0], [1]);
        assert.deepEqual(pf.push(2, 3)($([1]))[0], [1, 2, 3]);
    });

    it("dup", () => {
        assert.throws(() => pf.dup($([])));
        assert.deepEqual(pf.dup($([1]))[0], [1, 1]);
        assert.deepEqual(pf.dup($([1, 2]))[0], [1, 2, 2]);
    });

    it("dup2", () => {
        assert.throws(() => pf.dup2($([1])));
        assert.deepEqual(pf.dup2($([1, 2]))[0], [1, 2, 1, 2]);
        assert.deepEqual(pf.dup2($([1, 2, 3]))[0], [1, 2, 3, 2, 3]);
    });

    it("dupIf", () => {
        assert.throws(() => pf.dupif($([])));
        assert.deepEqual(pf.dupif($([0]))[0], [0]);
        assert.deepEqual(pf.dupif($([1]))[0], [1, 1]);
    });

    it("drop", () => {
        assert.throws(() => pf.drop($([])));
        assert.deepEqual(pf.drop($([0]))[0], []);
        assert.deepEqual(pf.drop($([1, 2]))[0], [1]);
    });

    it("drop2", () => {
        assert.throws(() => pf.drop2($([1])));
        assert.deepEqual(pf.drop2($([1, 2]))[0], []);
        assert.deepEqual(pf.drop2($([1, 2, 3]))[0], [1]);
    });

    it("dropIf", () => {
        assert.throws(() => pf.dropif($([])));
        assert.deepEqual(pf.dropif($([0]))[0], [0]);
        assert.deepEqual(pf.dropif($([1]))[0], []);
    });

    it("swap", () => {
        assert.throws(() => pf.swap($([1])));
        assert.deepEqual(pf.swap($([0, 1]))[0], [1, 0]);
        assert.deepEqual(pf.swap($([1, 2, 3]))[0], [1, 3, 2]);
    });

    it("rswap", () => {
        assert.throws(() => pf.rswap($([], [1])));
        assert.deepEqual(pf.rswap([[], [0, 1], {}])[1], [1, 0]);
        assert.deepEqual(pf.rswap([[], [1, 2, 3], {}])[1], [1, 3, 2]);
    });

    it("swap2", () => {
        assert.throws(() => pf.swap2($([1, 2, 3])));
        assert.deepEqual(pf.swap2($([0, 1, 2, 3]))[0], [2, 3, 0, 1]);
        assert.deepEqual(pf.swap2($([0, 1, 2, 3, 4]))[0], [0, 3, 4, 1, 2]);
    });

    it("nip", () => {
        assert.throws(() => pf.nip($([1])));
        assert.deepEqual(pf.nip($([0, 1]))[0], [1]);
        assert.deepEqual(pf.nip($([0, 1, 2]))[0], [0, 2]);
    });

    it("tuck", () => {
        assert.throws(() => pf.tuck($([1])));
        assert.deepEqual(pf.tuck($([0, 1]))[0], [1, 0, 1]);
        assert.deepEqual(pf.tuck($([0, 1, 2]))[0], [0, 2, 1, 2]);
    });

    it("over", () => {
        assert.throws(() => pf.over($([1])));
        assert.deepEqual(pf.over($([0, 1]))[0], [0, 1, 0]);
        assert.deepEqual(pf.over($([0, 1, 2]))[0], [0, 1, 2, 1]);
    });

    it("rot", () => {
        assert.throws(() => pf.rot($([1, 2])));
        assert.deepEqual(pf.rot($([0, 1, 2]))[0], [1, 2, 0]);
        assert.deepEqual(pf.rot($([0, 1, 2, 3]))[0], [0, 2, 3, 1]);
    });

    it("invrot", () => {
        assert.throws(() => pf.invrot($([1, 2])));
        assert.deepEqual(pf.invrot($([0, 1, 2]))[0], [2, 0, 1]);
        assert.deepEqual(pf.invrot($([0, 1, 2, 3]))[0], [0, 3, 1, 2]);
    });

    it("pick", () => {
        assert.throws(() => pf.pick($([])));
        assert.throws(() => pf.pick($([0])));
        assert.throws(() => pf.pick($([0, 1])));
        assert.deepEqual(pf.pick($([0, 1, 0]))[0], [0, 1, 1]);
        assert.deepEqual(pf.pick($([0, 1, 1]))[0], [0, 1, 0]);
    });

    it("add", () => {
        assert.throws(() => pf.add($([1])));
        assert.deepEqual(pf.add($([1, 2]))[0], [3]);
    });

    it("mul", () => {
        assert.throws(() => pf.mul($([1])));
        assert.deepEqual(pf.mul($([2, -3]))[0], [-6]);
    });

    it("sub", () => {
        assert.throws(() => pf.sub($([1])));
        assert.deepEqual(pf.sub($([2, 3]))[0], [-1]);
    });

    it("div", () => {
        assert.throws(() => pf.div($([1])));
        assert.deepEqual(pf.div($([1, -10]))[0], [-0.1]);
    });

    it("mod", () => {
        assert.throws(() => pf.mod($([1])));
        assert.deepEqual(pf.mod($([12, 10]))[0], [2]);
    });

    it("inc", () => {
        assert.throws(() => pf.inc($()));
        assert.deepEqual(pf.inc($([1]))[0], [2]);
        assert.deepEqual(pf.inc($([1, 2]))[0], [1, 3]);
    });

    it("dec", () => {
        assert.throws(() => pf.dec($()));
        assert.deepEqual(pf.dec($([1]))[0], [0]);
        assert.deepEqual(pf.dec($([1, 2]))[0], [1, 1]);
    });

    it("neg", () => {
        assert.throws(() => pf.neg($()));
        assert.deepEqual(pf.neg($([1]))[0], [-1]);
        assert.deepEqual(pf.neg($([1, 2]))[0], [1, -2]);
    });

    it("pow", () => {
        assert.throws(() => pf.pow($([1])));
        assert.deepEqual(pf.pow($([1, 2]))[0], [1]);
        assert.deepEqual(pf.pow($([1, 2, 3]))[0], [1, 8]);
    });

    it("sqrt", () => {
        assert.throws(() => pf.sqrt($()));
        assert.deepEqual(pf.sqrt($([1]))[0], [1]);
        assert.deepEqual(pf.sqrt($([1, 9]))[0], [1, 3]);
    });

    it("bitAnd", () => {
        assert.throws(() => pf.bitand($([0])));
        assert.deepEqual(pf.bitand($([0x1a, 0xfc]))[0], [0x18]);
    });

    it("bitOr", () => {
        assert.throws(() => pf.bitor($([0])));
        assert.deepEqual(pf.bitor($([0xf0, 0x1]))[0], [0xf1]);
    });

    it("bitXor", () => {
        assert.throws(() => pf.bitxor($([0])));
        assert.deepEqual(pf.bitxor($([0xff, 0xaa]))[0], [0x55]);
    });

    it("bitNot", () => {
        assert.throws(() => pf.bitnot($()));
        assert.deepEqual(pf.bitnot($([0x7f]))[0], [-0x80]);
    });

    it("lsl", () => {
        assert.throws(() => pf.lsl($()));
        assert.deepEqual(pf.lsl($([0xf, 16]))[0], [0xf0000]);
    });

    it("lsr", () => {
        assert.throws(() => pf.lsr($()));
        assert.deepEqual(pf.lsr($([0xdecafbad, 16]))[0], [-8502]);
    });

    it("lsru", () => {
        assert.throws(() => pf.lsru($()));
        assert.deepEqual(pf.lsru($([0xdecafbad, 16]))[0], [0xdeca]);
    });

    it("and", () => {
        assert.throws(() => pf.and($([0])));
        assert.deepEqual(pf.and($([0, 0]))[0], [false]);
        assert.deepEqual(pf.and($([0, 1]))[0], [false]);
        assert.deepEqual(pf.and($([1, 0]))[0], [false]);
        assert.deepEqual(pf.and($([1, 1]))[0], [true]);
    });

    it("or", () => {
        assert.throws(() => pf.or($([0])));
        assert.deepEqual(pf.or($([0, 0]))[0], [false]);
        assert.deepEqual(pf.or($([0, 1]))[0], [true]);
        assert.deepEqual(pf.or($([1, 0]))[0], [true]);
        assert.deepEqual(pf.or($([1, 1]))[0], [true]);
    });

    it("not", () => {
        assert.throws(() => pf.not($()));
        assert.deepEqual(pf.not($([1]))[0], [false]);
        assert.deepEqual(pf.not($([0]))[0], [true]);
    });

    it("eq", () => {
        assert.throws(() => pf.eq($([1])));
        assert.deepEqual(pf.eq($([1, 1]))[0], [true]);
        assert.deepEqual(pf.eq($([1, -1]))[0], [false]);
        assert.deepEqual(pf.eq($([1, "1"]))[0], [false]);
        assert.deepEqual(pf.eq($([[1], [1]]))[0], [false]);
    });

    it("neq", () => {
        assert.throws(() => pf.neq($([1])));
        assert.deepEqual(pf.neq($([1, 1]))[0], [false]);
        assert.deepEqual(pf.neq($([1, -1]))[0], [true]);
        assert.deepEqual(pf.neq($([1, "1"]))[0], [true]);
        assert.deepEqual(pf.neq($([[1], [1]]))[0], [true]);
    });

    it("equiv", () => {
        assert.throws(() => pf.equiv($([1])));
        assert.deepEqual(pf.equiv($([1, 1]))[0], [true]);
        assert.deepEqual(pf.equiv($([1, -1]))[0], [false]);
        assert.deepEqual(pf.equiv($([1, "1"]))[0], [false]);
        assert.deepEqual(pf.equiv($([[1], [1]]))[0], [true]);
    });

    it("lt", () => {
        assert.throws(() => pf.lt($([1])));
        assert.deepEqual(pf.lt($([1, -1]))[0], [false]);
        assert.deepEqual(pf.lt($([1, 1]))[0], [false]);
        assert.deepEqual(pf.lt($([1, 2]))[0], [true]);
    });

    it("lteq", () => {
        assert.throws(() => pf.lteq($([1])));
        assert.deepEqual(pf.lteq($([1, -1]))[0], [false]);
        assert.deepEqual(pf.lteq($([1, 1]))[0], [true]);
        assert.deepEqual(pf.lteq($([1, 2]))[0], [true]);
    });

    it("gt", () => {
        assert.throws(() => pf.gt($([1])));
        assert.deepEqual(pf.gt($([1, -1]))[0], [true]);
        assert.deepEqual(pf.gt($([1, 1]))[0], [false]);
        assert.deepEqual(pf.gt($([1, 2]))[0], [false]);
    });

    it("gteq", () => {
        assert.throws(() => pf.gteq($([1])));
        assert.deepEqual(pf.gteq($([1, -1]))[0], [true]);
        assert.deepEqual(pf.gteq($([1, 1]))[0], [true]);
        assert.deepEqual(pf.gteq($([1, 2]))[0], [false]);
    });

    it("isZero", () => {
        assert.throws(() => pf.iszero($()));
        assert.deepEqual(pf.iszero($([0]))[0], [true]);
        assert.deepEqual(pf.iszero($([0.0]))[0], [true]);
        assert.deepEqual(pf.iszero($([1]))[0], [false]);
        assert.deepEqual(pf.iszero($([null]))[0], [false]);
    });

    it("isPos", () => {
        assert.throws(() => pf.ispos($()));
        assert.deepEqual(pf.ispos($([0]))[0], [false]);
        assert.deepEqual(pf.ispos($([0.0]))[0], [false]);
        assert.deepEqual(pf.ispos($([1]))[0], [true]);
        assert.deepEqual(pf.ispos($([-1]))[0], [false]);
        assert.deepEqual(pf.ispos($([null]))[0], [false]);
    });

    it("isNeg", () => {
        assert.throws(() => pf.isneg($()));
        assert.deepEqual(pf.isneg($([0]))[0], [false]);
        assert.deepEqual(pf.isneg($([0.0]))[0], [false]);
        assert.deepEqual(pf.isneg($([1]))[0], [false]);
        assert.deepEqual(pf.isneg($([-1]))[0], [true]);
        assert.deepEqual(pf.isneg($([null]))[0], [false]);
    });

    it("isNull", () => {
        assert.throws(() => pf.isnull($()));
        assert.deepEqual(pf.isnull($([0]))[0], [false]);
        assert.deepEqual(pf.isnull($([1]))[0], [false]);
        assert.deepEqual(pf.isnull($([null]))[0], [true]);
        assert.deepEqual(pf.isnull($([undefined]))[0], [true]);
    });

    it("list", () => {
        assert.deepEqual(pf.list($())[0], [[]]);
        const foo = pf.word([[], 1, pf.pushr]);
        const bar = pf.word([pf.list, 1, pf.pushr]);
        assert.deepEqual(foo($())[0], [[1]]);
        assert.deepEqual(foo($())[0], [[1, 1]]);
        assert.deepEqual(bar($())[0], [[1]]);
        assert.deepEqual(bar($())[0], [[1]]);
    });

    it("pushl", () => {
        assert.throws(() => pf.pushl($([[]])));
        assert.deepEqual(pf.pushl($([1, []]))[0], [[1]]);
    });

    it("pushr", () => {
        assert.throws(() => pf.pushr($([[]])));
        assert.deepEqual(pf.pushr($([[], 1]))[0], [[1]]);
    });

    it("popr", () => {
        assert.throws(() => pf.popr($()));
        assert.throws(() => pf.popr($([[]])));
        assert.deepEqual(pf.popr($([[1]]))[0], [[], 1]);
        assert.deepEqual(pf.popr($([[1, 2]]))[0], [[1], 2]);
    });

    it("pull", () => {
        assert.throws(() => pf.pull($()));
        assert.throws(() => pf.pull($([[]])));
        assert.deepEqual(pf.pull($([[1]]))[0], [1, []]);
        assert.deepEqual(pf.pull($([[1, 2]]))[0], [2, [1]]);
        assert.deepEqual(pf.pull(pf.pull($([[1, 2]])))[0], [2, 1, []]);
    });

    it("pull2", () => {
        assert.throws(() => pf.pull2($([[1]])));
        assert.deepEqual(pf.pull2($([[1, 2]]))[0], [2, 1, []]);
    });

    it("pull3", () => {
        assert.throws(() => pf.pull3($([[1, 2]])));
        assert.deepEqual(pf.pull3($([[1, 2, 3]]))[0], [3, 2, 1, []]);
    });

    it("pull4", () => {
        assert.throws(() => pf.pull4($([[1, 2, 3]])));
        assert.deepEqual(pf.pull4($([[1, 2, 3, 4]]))[0], [4, 3, 2, 1, []]);
    });

    it("vadd", () => {
        assert.throws(() => pf.vadd($([[]])));
        assert.deepEqual(pf.vadd($([[1, 2, 3], [10, 20, 30]]))[0], [[11, 22, 33]]);
        assert.deepEqual(pf.vadd($([[1, 2, 3], 10]))[0], [[11, 12, 13]]);
        assert.deepEqual(pf.vadd($([10, [1, 2, 3]]))[0], [[11, 12, 13]]);
    });

    it("vmul", () => {
        assert.throws(() => pf.vmul($([[]])));
        assert.deepEqual(pf.vmul($([[1, 2, 3], [10, 20, 30]]))[0], [[10, 40, 90]]);
        assert.deepEqual(pf.vmul($([[1, 2, 3], 10]))[0], [[10, 20, 30]]);
        assert.deepEqual(pf.vmul($([10, [1, 2, 3]]))[0], [[10, 20, 30]]);
    });

    it("vsub", () => {
        assert.throws(() => pf.vsub($([[]])));
        assert.deepEqual(pf.vsub($([[1, 2, 3], [10, 20, 30]]))[0], [[-9, -18, -27]]);
        assert.deepEqual(pf.vsub($([[1, 2, 3], 10]))[0], [[-9, -8, -7]]);
        assert.deepEqual(pf.vsub($([10, [1, 2, 3]]))[0], [[9, 8, 7]]);
    });

    it("vdiv", () => {
        assert.throws(() => pf.vdiv($([[]])));
        assert.deepEqual(pf.vdiv($([[1, 2, 3], [10, 20, 30]]))[0], [[0.1, 0.1, 0.1]]);
        assert.deepEqual(pf.vdiv($([[1, 2, 3], 10]))[0], [[0.1, 0.2, 0.3]]);
        assert.deepEqual(pf.vdiv($([10, [1, 2, 3]]))[0], [[10, 5, 10 / 3]]);
    });

    it("vsplit", () => {
        assert.throws(() => pf.split($()));
        assert.deepEqual(pf.split($([[1, 2, 3, 4], 2]))[0], [[1, 2], [3, 4]]);
        assert.deepEqual(pf.split($([[1, 2, 3, 4], 4]))[0], [[1, 2, 3, 4], []]);
        assert.deepEqual(pf.split($([[1, 2, 3, 4], -1]))[0], [[1, 2, 3], [4]]);
    });

    it("mapl (reduce)", () => {
        assert.throws(() => pf.mapl($([[]])));
        assert.deepEqual(pf.mapl($([0, [1, 2, 3, 4], [pf.add]]))[0], [10]);
    });

    it("collect", () => {
        assert.throws(() => pf.collect($()));
        assert.deepEqual(pf.collect($([1, 2, 3, 4, 0]))[0], [1, 2, 3, 4, []]);
        assert.deepEqual(pf.collect($([1, 2, 3, 4, 1]))[0], [1, 2, 3, [4]]);
        assert.deepEqual(pf.collect($([1, 2, 3, 4, 3]))[0], [1, [2, 3, 4]]);
        assert.throws(() => pf.collect($([1, 2, 3, 4, 5])));
    });

    it("tuple", () => {
        assert.throws(() => pf.tuple(1)($()));
        assert.deepEqual(pf.tuple(1)($([1]))[0], [[1]]);
        assert.deepEqual(pf.tuple(1)($([1, 2]))[0], [1, [2]]);
        assert.deepEqual(pf.tuple(2)($([1, 2]))[0], [[1, 2]]);
    });

    it("length", () => {
        assert.throws(() => pf.length($()));
        assert.deepEqual(pf.length($([[10]]))[0], [1]);
        assert.deepEqual(pf.length($([[10, 20]]))[0], [2]);
        assert.deepEqual(pf.length($(["a"]))[0], [1]);
    });

    it("cat", () => {
        assert.throws(() => pf.cat($()));
        assert.deepEqual(pf.cat($([[1], [2]]))[0], [[1, 2]]);
    });

    it("join", () => {
        assert.throws(() => pf.join()($()));
        assert.deepEqual(pf.join()($([["a", 1]]))[0], ["a1"]);
        assert.deepEqual(pf.join("-")($([["a", 1]]))[0], ["a-1"]);
    });

    it("at", () => {
        assert.throws(() => pf.at($([1])));
        assert.deepEqual(pf.at($([[10, 20], 0]))[0], [10]);
        assert.deepEqual(pf.at($([[10, 20], 1]))[0], [20]);
        assert.deepEqual(pf.at($(["ab", 1]))[0], ["b"]);
        assert.deepEqual(pf.at($([{ id: 42 }, "id"]))[0], [42]);
    });

    it("setat", () => {
        assert.throws(() => pf.setat($([1, 2])));
        let a: any = [10, 20];
        assert.deepEqual(pf.setat($([30, a, 0]))[0], [a]);
        assert.deepEqual(a, [30, 20]);
        a = [10, 20];
        assert.deepEqual(pf.setat($([30, a, 3]))[0], [a]);
        assert.deepEqual(a, [10, 20, , 30]);
        a = {};
        assert.deepEqual(pf.setat($([30, a, "a"]))[0], [a]);
        assert.deepEqual(a, { a: 30 });
    });

    it("load", () => {
        assert.throws(() => pf.load($()));
        assert.deepEqual(pf.load([["a"], [], { a: 1 }])[0], [1]);
        assert.throws(() => pf.load([["b"], [], { a: 1 }]));
    });

    it("store", () => {
        assert.throws(() => pf.store($([1])));
        assert.deepEqual(pf.store([[10, "a"], [], {}]), [[], [], { a: 10 }]);
        assert.deepEqual(pf.store([[10, "b"], [], { a: 1 }]), [[], [], { a: 1, b: 10 }]);
    });

    it("loadkey", () => {
        assert.deepEqual(pf.loadkey("a")([[0], [], { a: 1 }])[0], [0, 1]);
        assert.throws(() => pf.loadkey("a")(pf.ctx()));
    });

    it("storekey", () => {
        assert.throws(() => pf.storekey("a")($()));
        assert.deepEqual(pf.storekey("a")([[10], [], {}]), [[], [], { a: 10 }]);
        assert.deepEqual(pf.storekey("b")([[10], [], { a: 1 }]), [[], [], { a: 1, b: 10 }]);
    });

    it("pushenv", () => {
        assert.deepEqual(pf.pushenv([[0], [], { a: 10 }]), [[0, { a: 10 }], [], { a: 10 }]);
    });

    it("unwrap", () => {
        const res: StackContext = [[1, 2, 3], [], {}];
        assert.equal(pf.unwrap([[], [], {}]), undefined);
        assert.equal(pf.unwrap(res), 3);
        assert.deepEqual(pf.unwrap(res, 2), [2, 3]);
        assert.deepEqual(pf.unwrap(res, 3), [1, 2, 3]);
        assert.deepEqual(pf.unwrap(res, 4), [1, 2, 3]);
    });

    it("exec", () => {
        assert.throws(() => pf.exec($()));
        assert.throws(() => pf.exec($([pf.add])));
        assert.throws(() => pf.exec($([1, pf.add])));
        assert.deepEqual(pf.exec($([1, 2, pf.add]))[0], [3]);
    });

    it("exec (quot)", () => {
        assert.throws(() => pf.exec($()));
        assert.throws(() => pf.exec($([[pf.add]])));
        assert.throws(() => pf.exec($([[1, pf.add]])));
        assert.deepEqual(pf.exec($([[1, 2, pf.add]]))[0], [3]);
    });

    it("cond", () => {
        assert.throws(() => pf.cond([], [])($()));
        assert.deepEqual(pf.cond([1], [2])($([undefined]))[0], [2]);
        assert.deepEqual(pf.cond([1], [2])($([null]))[0], [2]);
        assert.deepEqual(pf.cond([1], [2])($([0]))[0], [2]);
        assert.deepEqual(pf.cond([1], [2])($([true]))[0], [1]);
        assert.deepEqual(pf.cond([1], [2])($([-1]))[0], [1]);
        assert.deepEqual(pf.cond([1, pf.dup], [2, pf.dup])($([-1]))[0], [1, 1]);
        assert.deepEqual(pf.cond([1, pf.dup], [2, pf.dup])($([0]))[0], [2, 2]);
    });

    it("cases", () => {
        let classify = (x) =>
            pf.cases({
                0: ["zero"],
                1: ["one"],
                default: [
                    pf.ispos,
                    pf.cond(["many"], ["invalid"])
                ]
            })($([x]))[0];

        assert.equal(classify(0), "zero");
        assert.equal(classify(1), "one");
        assert.equal(classify(100), "many");
        assert.equal(classify(-1), "invalid");
        assert.throws(() => pf.cases({})($([0])));
    });

    it("word", () => {
        assert.deepEqual(pf.word([pf.dup, pf.mul])($([2]))[0], [4]);
        assert.deepEqual(pf.word([pf.pushenv], { a: 1 }, false)([[0], [], { b: 2 }])[0], [0, { a: 1 }]);
        assert.deepEqual(pf.word([pf.pushenv], { a: 1 })([[0], [], { b: 2 }])[0], [0, { a: 1, b: 2 }]);
        assert.deepEqual(pf.word([pf.add, pf.mul])($([1, 2, 3]))[0], [5]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add])($([1, 2, 3, 4]))[0], [15]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul])($([1, 2, 3, 4, 5]))[0], [29]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add])($([1, 2, 3, 4, 5, 6]))[0], [95]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul])($([1, 2, 3, 4, 5, 6, 7]))[0], [209]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add])($([1, 2, 3, 4, 5, 6, 7, 8]))[0], [767]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul])($([1, 2, 3, 4, 5, 6, 7, 8, 9]))[0], [1889]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))[0], [7679]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))[0], [20789]);
        assert.deepEqual(pf.word([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))[0], [92159]);
    });

    it("wordu", () => {
        assert.deepEqual(pf.wordU([pf.dup, pf.mul])($([2])), 4);
        assert.deepEqual(pf.wordU([pf.pushenv], 1, { a: 1 })($()), { a: 1 });
        assert.deepEqual(pf.wordU([pf.pushenv], 1, { a: 1 }, true)([[], [], { b: 2 }]), { a: 1, b: 2 });
    });

    it("bindkeys", () => {
        assert.throws(() => pf.run([1, ["a", "b"], {}, pf.bindkeys]));
        assert.deepEqual(pf.run([1, 2, 3, ["a", "b", "c"], {}, pf.bindkeys]), [[{ a: 1, b: 2, c: 3 }], [], {}]);
    });

    it("dip", () => {
        assert.deepEqual(pf.run([1, [10], pf.dip])[0], [10, 1]);
        assert.deepEqual(pf.run([1, 2, [10, pf.add], pf.dip])[0], [11, 2]);
    });

    it("dip2", () => {
        assert.deepEqual(pf.run([1, 2, [10], pf.dip2])[0], [10, 1, 2]);
        assert.deepEqual(pf.run([1, 2, 3, [10, pf.add], pf.dip2])[0], [11, 2, 3]);
    });

    it("dip3", () => {
        assert.deepEqual(pf.run([1, 2, 3, [10], pf.dip3])[0], [10, 1, 2, 3]);
        assert.deepEqual(pf.run([1, 2, 3, 4, [10, pf.add], pf.dip3])[0], [11, 2, 3, 4]);
    });

    it("dip4", () => {
        assert.deepEqual(pf.run([1, 2, 3, 4, [10], pf.dip4])[0], [10, 1, 2, 3, 4]);
        assert.deepEqual(pf.run([1, 2, 3, 4, 5, [10, pf.add], pf.dip4])[0], [11, 2, 3, 4, 5]);
    });

    it("keep", () => {
        assert.deepEqual(pf.run([1, [10, pf.add], pf.keep])[0], [11, 1]);
    });

    it("keep2", () => {
        assert.deepEqual(pf.run([1, 2, [pf.add], pf.keep2])[0], [3, 1, 2]);
    });

    it("keep3", () => {
        assert.deepEqual(pf.run([1, 2, 3, [pf.add, pf.add], pf.keep3])[0], [6, 1, 2, 3]);
    });

    it("bi", () => {
        assert.deepEqual(pf.run([2, [10, pf.add], [10, pf.mul], pf.bi])[0], [12, 20]);
    });

    it("bi2", () => {
        assert.deepEqual(pf.run([2, 10, [pf.add], [pf.mul], pf.bi2])[0], [12, 20]);
    });

    it("bi3", () => {
        assert.deepEqual(pf.run([2, 10, 100, [pf.add, pf.add], [pf.mul, pf.mul], pf.bi3])[0], [112, 2000]);
    });

    it("tri", () => {
        assert.deepEqual(pf.run([10, [pf.dec], [pf.dup, pf.mul], [pf.inc], pf.tri])[0], [9, 100, 11]);
    });

    it("tri2", () => {
        assert.deepEqual(pf.run([10, 20, [pf.add], [pf.mul], [pf.sub], pf.tri2])[0], [30, 200, -10]);
    });

    it("tri3", () => {
        assert.deepEqual(pf.run([10, 20, 30, [pf.add, pf.add], [pf.mul, pf.mul], [pf.sub, pf.sub], pf.tri3])[0], [60, 6000, 20]);
    });

    it("bis", () => {
        assert.deepEqual(pf.run([10, 20, [pf.inc], [pf.dec], pf.bis])[0], [11, 19]);
    });

    it("bis2", () => {
        assert.deepEqual(pf.run([10, 20, 30, 40, [pf.add], [pf.sub], pf.bis2])[0], [30, -10]);
    });

    it("tris", () => {
        assert.deepEqual(pf.run([10, 20, 30, [pf.inc], [pf.dup, pf.mul], [pf.dec], pf.tris])[0], [11, 400, 29]);
    });

    it("tris2", () => {
        assert.deepEqual(pf.run([10, 20, 30, 40, 50, 60, [pf.add], [pf.mul], [pf.sub], pf.tris2])[0], [30, 1200, -10]);
    });

    it("bia", () => {
        assert.deepEqual(pf.run([10, 20, [pf.inc], pf.bia])[0], [11, 21]);
    });

    it("bia2", () => {
        assert.deepEqual(pf.run([10, 20, 30, 40, [pf.add], pf.bia2])[0], [30, 70]);
    });

    it("tria", () => {
        assert.deepEqual(pf.run([10, 20, 30, [pf.inc], pf.tria])[0], [11, 21, 31]);
    });

    it("tria2", () => {
        assert.deepEqual(pf.run([10, 20, 30, 40, 50, 60, [pf.add], pf.tria2])[0], [30, 70, 110]);
    });

    it("both", () => {
        assert.deepEqual(pf.run([10, 20, [pf.even], pf.both])[0], [true]);
        assert.deepEqual(pf.run([11, 20, [pf.even], pf.both])[0], [false]);
        assert.deepEqual(pf.run([10, 21, [pf.even], pf.both])[0], [false]);
        assert.deepEqual(pf.run([11, 21, [pf.even], pf.both])[0], [false]);
    });

    it("either", () => {
        assert.deepEqual(pf.run([10, 20, [pf.even], pf.either])[0], [true]);
        assert.deepEqual(pf.run([11, 20, [pf.even], pf.either])[0], [true]);
        assert.deepEqual(pf.run([10, 21, [pf.even], pf.either])[0], [true]);
        assert.deepEqual(pf.run([11, 21, [pf.even], pf.either])[0], [false]);
    });


});
