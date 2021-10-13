import { group } from "@thi.ng/testament";
import * as assert from "assert";
import * as pf from "../src/index.js"
import type { StackContext } from "../src/index.js"

const $ = pf.ctx;

group("pointfree", {
    dsp: () => {
        assert.deepStrictEqual(pf.dsp($())[0], [0]);
        assert.deepStrictEqual(pf.dsp($([10]))[0], [10, 1]);
        assert.deepStrictEqual(pf.dsp($([10, 20]))[0], [10, 20, 2]);
    },

    rsp: () => {
        assert.deepStrictEqual(pf.rsp($())[0], [0]);
        assert.deepStrictEqual(pf.rsp([[], [10], {}])[0], [1]);
        assert.deepStrictEqual(pf.rsp([[100], [10, 20], {}])[0], [100, 2]);
    },

    movdr: () => {
        assert.throws(() => pf.movdr($()));
        assert.deepStrictEqual(pf.movdr($([1])), [[], [1], {}]);
        assert.deepStrictEqual(pf.movdr([[1, 2], [10], {}]), [
            [1],
            [10, 2],
            {},
        ]);
    },

    movrd: () => {
        assert.throws(() => pf.movrd($()));
        assert.deepStrictEqual(pf.movrd([[], [1], {}]), [[1], [], {}]);
        assert.deepStrictEqual(pf.movrd([[10], [1, 2], {}]), [
            [10, 2],
            [1],
            {},
        ]);
    },

    push: () => {
        assert.deepStrictEqual(pf.defPush()($())[0], []);
        assert.deepStrictEqual(pf.defPush(1)($())[0], [1]);
        assert.deepStrictEqual(pf.defPush(2, 3)($([1]))[0], [1, 2, 3]);
    },

    dup: () => {
        assert.throws(() => pf.dup($([])));
        assert.deepStrictEqual(pf.dup($([1]))[0], [1, 1]);
        assert.deepStrictEqual(pf.dup($([1, 2]))[0], [1, 2, 2]);
    },

    dup2: () => {
        assert.throws(() => pf.dup2($([1])));
        assert.deepStrictEqual(pf.dup2($([1, 2]))[0], [1, 2, 1, 2]);
        assert.deepStrictEqual(pf.dup2($([1, 2, 3]))[0], [1, 2, 3, 2, 3]);
    },

    dupIf: () => {
        assert.throws(() => pf.dupif($([])));
        assert.deepStrictEqual(pf.dupif($([0]))[0], [0]);
        assert.deepStrictEqual(pf.dupif($([1]))[0], [1, 1]);
    },

    drop: () => {
        assert.throws(() => pf.drop($([])));
        assert.deepStrictEqual(pf.drop($([0]))[0], []);
        assert.deepStrictEqual(pf.drop($([1, 2]))[0], [1]);
    },

    drop2: () => {
        assert.throws(() => pf.drop2($([1])));
        assert.deepStrictEqual(pf.drop2($([1, 2]))[0], []);
        assert.deepStrictEqual(pf.drop2($([1, 2, 3]))[0], [1]);
    },

    dropIf: () => {
        assert.throws(() => pf.dropif($([])));
        assert.deepStrictEqual(pf.dropif($([0]))[0], [0]);
        assert.deepStrictEqual(pf.dropif($([1]))[0], []);
    },

    swap: () => {
        assert.throws(() => pf.swap($([1])));
        assert.deepStrictEqual(pf.swap($([0, 1]))[0], [1, 0]);
        assert.deepStrictEqual(pf.swap($([1, 2, 3]))[0], [1, 3, 2]);
    },

    rswap: () => {
        assert.throws(() => pf.rswap($([], [1])));
        assert.deepStrictEqual(pf.rswap([[], [0, 1], {}])[1], [1, 0]);
        assert.deepStrictEqual(pf.rswap([[], [1, 2, 3], {}])[1], [1, 3, 2]);
    },

    swap2: () => {
        assert.throws(() => pf.swap2($([1, 2, 3])));
        assert.deepStrictEqual(pf.swap2($([0, 1, 2, 3]))[0], [2, 3, 0, 1]);
        assert.deepStrictEqual(
            pf.swap2($([0, 1, 2, 3, 4]))[0],
            [0, 3, 4, 1, 2]
        );
    },

    nip: () => {
        assert.throws(() => pf.nip($([1])));
        assert.deepStrictEqual(pf.nip($([0, 1]))[0], [1]);
        assert.deepStrictEqual(pf.nip($([0, 1, 2]))[0], [0, 2]);
    },

    tuck: () => {
        assert.throws(() => pf.tuck($([1])));
        assert.deepStrictEqual(pf.tuck($([0, 1]))[0], [1, 0, 1]);
        assert.deepStrictEqual(pf.tuck($([0, 1, 2]))[0], [0, 2, 1, 2]);
    },

    over: () => {
        assert.throws(() => pf.over($([1])));
        assert.deepStrictEqual(pf.over($([0, 1]))[0], [0, 1, 0]);
        assert.deepStrictEqual(pf.over($([0, 1, 2]))[0], [0, 1, 2, 1]);
    },

    rot: () => {
        assert.throws(() => pf.rot($([1, 2])));
        assert.deepStrictEqual(pf.rot($([0, 1, 2]))[0], [1, 2, 0]);
        assert.deepStrictEqual(pf.rot($([0, 1, 2, 3]))[0], [0, 2, 3, 1]);
    },

    invrot: () => {
        assert.throws(() => pf.invrot($([1, 2])));
        assert.deepStrictEqual(pf.invrot($([0, 1, 2]))[0], [2, 0, 1]);
        assert.deepStrictEqual(pf.invrot($([0, 1, 2, 3]))[0], [0, 3, 1, 2]);
    },

    pick: () => {
        assert.throws(() => pf.pick($([])));
        assert.throws(() => pf.pick($([0])));
        assert.throws(() => pf.pick($([0, 1])));
        assert.deepStrictEqual(pf.pick($([0, 1, 0]))[0], [0, 1, 1]);
        assert.deepStrictEqual(pf.pick($([0, 1, 1]))[0], [0, 1, 0]);
    },

    add: () => {
        assert.throws(() => pf.add($([1])));
        assert.deepStrictEqual(pf.add($([1, 2]))[0], [3]);
    },

    mul: () => {
        assert.throws(() => pf.mul($([1])));
        assert.deepStrictEqual(pf.mul($([2, -3]))[0], [-6]);
    },

    sub: () => {
        assert.throws(() => pf.sub($([1])));
        assert.deepStrictEqual(pf.sub($([2, 3]))[0], [-1]);
    },

    div: () => {
        assert.throws(() => pf.div($([1])));
        assert.deepStrictEqual(pf.div($([1, -10]))[0], [-0.1]);
    },

    mod: () => {
        assert.throws(() => pf.mod($([1])));
        assert.deepStrictEqual(pf.mod($([12, 10]))[0], [2]);
    },

    inc: () => {
        assert.throws(() => pf.inc($()));
        assert.deepStrictEqual(pf.inc($([1]))[0], [2]);
        assert.deepStrictEqual(pf.inc($([1, 2]))[0], [1, 3]);
    },

    dec: () => {
        assert.throws(() => pf.dec($()));
        assert.deepStrictEqual(pf.dec($([1]))[0], [0]);
        assert.deepStrictEqual(pf.dec($([1, 2]))[0], [1, 1]);
    },

    neg: () => {
        assert.throws(() => pf.neg($()));
        assert.deepStrictEqual(pf.neg($([1]))[0], [-1]);
        assert.deepStrictEqual(pf.neg($([1, 2]))[0], [1, -2]);
    },

    pow: () => {
        assert.throws(() => pf.pow($([1])));
        assert.deepStrictEqual(pf.pow($([1, 2]))[0], [1]);
        assert.deepStrictEqual(pf.pow($([1, 2, 3]))[0], [1, 8]);
    },

    sqrt: () => {
        assert.throws(() => pf.sqrt($()));
        assert.deepStrictEqual(pf.sqrt($([1]))[0], [1]);
        assert.deepStrictEqual(pf.sqrt($([1, 9]))[0], [1, 3]);
    },

    bitAnd: () => {
        assert.throws(() => pf.bitand($([0])));
        assert.deepStrictEqual(pf.bitand($([0x1a, 0xfc]))[0], [0x18]);
    },

    bitOr: () => {
        assert.throws(() => pf.bitor($([0])));
        assert.deepStrictEqual(pf.bitor($([0xf0, 0x1]))[0], [0xf1]);
    },

    bitXor: () => {
        assert.throws(() => pf.bitxor($([0])));
        assert.deepStrictEqual(pf.bitxor($([0xff, 0xaa]))[0], [0x55]);
    },

    bitNot: () => {
        assert.throws(() => pf.bitnot($()));
        assert.deepStrictEqual(pf.bitnot($([0x7f]))[0], [-0x80]);
    },

    lsl: () => {
        assert.throws(() => pf.lsl($()));
        assert.deepStrictEqual(pf.lsl($([0xf, 16]))[0], [0xf0000]);
    },

    lsr: () => {
        assert.throws(() => pf.lsr($()));
        assert.deepStrictEqual(pf.lsr($([0xdecafbad, 16]))[0], [-8502]);
    },

    lsru: () => {
        assert.throws(() => pf.lsru($()));
        assert.deepStrictEqual(pf.lsru($([0xdecafbad, 16]))[0], [0xdeca]);
    },

    and: () => {
        assert.throws(() => pf.and($([0])));
        assert.deepStrictEqual(pf.and($([0, 0]))[0], [false]);
        assert.deepStrictEqual(pf.and($([0, 1]))[0], [false]);
        assert.deepStrictEqual(pf.and($([1, 0]))[0], [false]);
        assert.deepStrictEqual(pf.and($([1, 1]))[0], [true]);
    },

    or: () => {
        assert.throws(() => pf.or($([0])));
        assert.deepStrictEqual(pf.or($([0, 0]))[0], [false]);
        assert.deepStrictEqual(pf.or($([0, 1]))[0], [true]);
        assert.deepStrictEqual(pf.or($([1, 0]))[0], [true]);
        assert.deepStrictEqual(pf.or($([1, 1]))[0], [true]);
    },

    not: () => {
        assert.throws(() => pf.not($()));
        assert.deepStrictEqual(pf.not($([1]))[0], [false]);
        assert.deepStrictEqual(pf.not($([0]))[0], [true]);
    },

    eq: () => {
        assert.throws(() => pf.eq($([1])));
        assert.deepStrictEqual(pf.eq($([1, 1]))[0], [true]);
        assert.deepStrictEqual(pf.eq($([1, -1]))[0], [false]);
        assert.deepStrictEqual(pf.eq($([1, "1"]))[0], [false]);
        assert.deepStrictEqual(pf.eq($([[1], [1]]))[0], [false]);
    },

    neq: () => {
        assert.throws(() => pf.neq($([1])));
        assert.deepStrictEqual(pf.neq($([1, 1]))[0], [false]);
        assert.deepStrictEqual(pf.neq($([1, -1]))[0], [true]);
        assert.deepStrictEqual(pf.neq($([1, "1"]))[0], [true]);
        assert.deepStrictEqual(pf.neq($([[1], [1]]))[0], [true]);
    },

    equiv: () => {
        assert.throws(() => pf.equiv($([1])));
        assert.deepStrictEqual(pf.equiv($([1, 1]))[0], [true]);
        assert.deepStrictEqual(pf.equiv($([1, -1]))[0], [false]);
        assert.deepStrictEqual(pf.equiv($([1, "1"]))[0], [false]);
        assert.deepStrictEqual(pf.equiv($([[1], [1]]))[0], [true]);
    },

    lt: () => {
        assert.throws(() => pf.lt($([1])));
        assert.deepStrictEqual(pf.lt($([1, -1]))[0], [false]);
        assert.deepStrictEqual(pf.lt($([1, 1]))[0], [false]);
        assert.deepStrictEqual(pf.lt($([1, 2]))[0], [true]);
    },

    lteq: () => {
        assert.throws(() => pf.lteq($([1])));
        assert.deepStrictEqual(pf.lteq($([1, -1]))[0], [false]);
        assert.deepStrictEqual(pf.lteq($([1, 1]))[0], [true]);
        assert.deepStrictEqual(pf.lteq($([1, 2]))[0], [true]);
    },

    gt: () => {
        assert.throws(() => pf.gt($([1])));
        assert.deepStrictEqual(pf.gt($([1, -1]))[0], [true]);
        assert.deepStrictEqual(pf.gt($([1, 1]))[0], [false]);
        assert.deepStrictEqual(pf.gt($([1, 2]))[0], [false]);
    },

    gteq: () => {
        assert.throws(() => pf.gteq($([1])));
        assert.deepStrictEqual(pf.gteq($([1, -1]))[0], [true]);
        assert.deepStrictEqual(pf.gteq($([1, 1]))[0], [true]);
        assert.deepStrictEqual(pf.gteq($([1, 2]))[0], [false]);
    },

    isZero: () => {
        assert.throws(() => pf.iszero($()));
        assert.deepStrictEqual(pf.iszero($([0]))[0], [true]);
        assert.deepStrictEqual(pf.iszero($([0.0]))[0], [true]);
        assert.deepStrictEqual(pf.iszero($([1]))[0], [false]);
        assert.deepStrictEqual(pf.iszero($([null]))[0], [false]);
    },

    isPos: () => {
        assert.throws(() => pf.ispos($()));
        assert.deepStrictEqual(pf.ispos($([0]))[0], [false]);
        assert.deepStrictEqual(pf.ispos($([0.0]))[0], [false]);
        assert.deepStrictEqual(pf.ispos($([1]))[0], [true]);
        assert.deepStrictEqual(pf.ispos($([-1]))[0], [false]);
        assert.deepStrictEqual(pf.ispos($([null]))[0], [false]);
    },

    isNeg: () => {
        assert.throws(() => pf.isneg($()));
        assert.deepStrictEqual(pf.isneg($([0]))[0], [false]);
        assert.deepStrictEqual(pf.isneg($([0.0]))[0], [false]);
        assert.deepStrictEqual(pf.isneg($([1]))[0], [false]);
        assert.deepStrictEqual(pf.isneg($([-1]))[0], [true]);
        assert.deepStrictEqual(pf.isneg($([null]))[0], [false]);
    },

    isNull: () => {
        assert.throws(() => pf.isnull($()));
        assert.deepStrictEqual(pf.isnull($([0]))[0], [false]);
        assert.deepStrictEqual(pf.isnull($([1]))[0], [false]);
        assert.deepStrictEqual(pf.isnull($([null]))[0], [true]);
        assert.deepStrictEqual(pf.isnull($([undefined]))[0], [true]);
    },

    list: () => {
        assert.deepStrictEqual(pf.list($())[0], [[]]);
        const foo = pf.defWord([[], 1, pf.pushr]);
        const bar = pf.defWord([pf.list, 1, pf.pushr]);
        assert.deepStrictEqual(foo($())[0], [[1]]);
        assert.deepStrictEqual(foo($())[0], [[1, 1]]);
        assert.deepStrictEqual(bar($())[0], [[1]]);
        assert.deepStrictEqual(bar($())[0], [[1]]);
    },

    pushl: () => {
        assert.throws(() => pf.pushl($([[]])));
        assert.deepStrictEqual(pf.pushl($([1, []]))[0], [[1]]);
    },

    pushr: () => {
        assert.throws(() => pf.pushr($([[]])));
        assert.deepStrictEqual(pf.pushr($([[], 1]))[0], [[1]]);
    },

    popr: () => {
        assert.throws(() => pf.popr($()));
        assert.throws(() => pf.popr($([[]])));
        assert.deepStrictEqual(pf.popr($([[1]]))[0], [[], 1]);
        assert.deepStrictEqual(pf.popr($([[1, 2]]))[0], [[1], 2]);
    },

    pull: () => {
        assert.throws(() => pf.pull($()));
        assert.throws(() => pf.pull($([[]])));
        assert.deepStrictEqual(pf.pull($([[1]]))[0], [1, []]);
        assert.deepStrictEqual(pf.pull($([[1, 2]]))[0], [2, [1]]);
        assert.deepStrictEqual(pf.pull(pf.pull($([[1, 2]])))[0], [2, 1, []]);
    },

    pull2: () => {
        assert.throws(() => pf.pull2($([[1]])));
        assert.deepStrictEqual(pf.pull2($([[1, 2]]))[0], [2, 1, []]);
    },

    pull3: () => {
        assert.throws(() => pf.pull3($([[1, 2]])));
        assert.deepStrictEqual(pf.pull3($([[1, 2, 3]]))[0], [3, 2, 1, []]);
    },

    pull4: () => {
        assert.throws(() => pf.pull4($([[1, 2, 3]])));
        assert.deepStrictEqual(pf.pull4($([[1, 2, 3, 4]]))[0], [
            4,
            3,
            2,
            1,
            [],
        ]);
    },

    vadd: () => {
        assert.throws(() => pf.vadd($([[]])));
        assert.deepStrictEqual(
            pf.vadd(
                $([
                    [1, 2, 3],
                    [10, 20, 30],
                ])
            )[0],
            [[11, 22, 33]]
        );
        assert.deepStrictEqual(pf.vadd($([[1, 2, 3], 10]))[0], [[11, 12, 13]]);
        assert.deepStrictEqual(pf.vadd($([10, [1, 2, 3]]))[0], [[11, 12, 13]]);
    },

    vmul: () => {
        assert.throws(() => pf.vmul($([[]])));
        assert.deepStrictEqual(
            pf.vmul(
                $([
                    [1, 2, 3],
                    [10, 20, 30],
                ])
            )[0],
            [[10, 40, 90]]
        );
        assert.deepStrictEqual(pf.vmul($([[1, 2, 3], 10]))[0], [[10, 20, 30]]);
        assert.deepStrictEqual(pf.vmul($([10, [1, 2, 3]]))[0], [[10, 20, 30]]);
    },

    vsub: () => {
        assert.throws(() => pf.vsub($([[]])));
        assert.deepStrictEqual(
            pf.vsub(
                $([
                    [1, 2, 3],
                    [10, 20, 30],
                ])
            )[0],
            [[-9, -18, -27]]
        );
        assert.deepStrictEqual(pf.vsub($([[1, 2, 3], 10]))[0], [[-9, -8, -7]]);
        assert.deepStrictEqual(pf.vsub($([10, [1, 2, 3]]))[0], [[9, 8, 7]]);
    },

    vdiv: () => {
        assert.throws(() => pf.vdiv($([[]])));
        assert.deepStrictEqual(
            pf.vdiv(
                $([
                    [1, 2, 3],
                    [10, 20, 30],
                ])
            )[0],
            [[0.1, 0.1, 0.1]]
        );
        assert.deepStrictEqual(pf.vdiv($([[1, 2, 3], 10]))[0], [
            [0.1, 0.2, 0.3],
        ]);
        assert.deepStrictEqual(pf.vdiv($([10, [1, 2, 3]]))[0], [
            [10, 5, 10 / 3],
        ]);
    },

    vsplit: () => {
        assert.throws(() => pf.split($()));
        assert.deepStrictEqual(pf.split($([[1, 2, 3, 4], 2]))[0], [
            [1, 2],
            [3, 4],
        ]);
        assert.deepStrictEqual(pf.split($([[1, 2, 3, 4], 4]))[0], [
            [1, 2, 3, 4],
            [],
        ]);
        assert.deepStrictEqual(pf.split($([[1, 2, 3, 4], -1]))[0], [
            [1, 2, 3],
            [4],
        ]);
    },

    "mapl (reduce)": () => {
        assert.throws(() => pf.mapl($([[]])));
        assert.deepStrictEqual(pf.mapl($([0, [1, 2, 3, 4], [pf.add]]))[0], [
            10,
        ]);
    },

    collect: () => {
        assert.throws(() => pf.collect($()));
        assert.deepStrictEqual(pf.collect($([1, 2, 3, 4, 0]))[0], [
            1,
            2,
            3,
            4,
            [],
        ]);
        assert.deepStrictEqual(pf.collect($([1, 2, 3, 4, 1]))[0], [
            1,
            2,
            3,
            [4],
        ]);
        assert.deepStrictEqual(pf.collect($([1, 2, 3, 4, 3]))[0], [
            1,
            [2, 3, 4],
        ]);
        assert.throws(() => pf.collect($([1, 2, 3, 4, 5])));
    },

    tuple: () => {
        assert.throws(() => pf.defTuple(1)($()));
        assert.deepStrictEqual(pf.defTuple(1)($([1]))[0], [[1]]);
        assert.deepStrictEqual(pf.defTuple(1)($([1, 2]))[0], [1, [2]]);
        assert.deepStrictEqual(pf.defTuple(2)($([1, 2]))[0], [[1, 2]]);
    },

    length: () => {
        assert.throws(() => pf.length($()));
        assert.deepStrictEqual(pf.length($([[10]]))[0], [1]);
        assert.deepStrictEqual(pf.length($([[10, 20]]))[0], [2]);
        assert.deepStrictEqual(pf.length($(["a"]))[0], [1]);
    },

    cat: () => {
        assert.throws(() => pf.cat($()));
        assert.deepStrictEqual(pf.cat($([[1], [2]]))[0], [[1, 2]]);
    },

    join: () => {
        assert.throws(() => pf.defJoin()($()));
        assert.deepStrictEqual(pf.defJoin()($([["a", 1]]))[0], ["a1"]);
        assert.deepStrictEqual(pf.defJoin("-")($([["a", 1]]))[0], ["a-1"]);
    },

    at: () => {
        assert.throws(() => pf.at($([1])));
        assert.deepStrictEqual(pf.at($([[10, 20], 0]))[0], [10]);
        assert.deepStrictEqual(pf.at($([[10, 20], 1]))[0], [20]);
        assert.deepStrictEqual(pf.at($(["ab", 1]))[0], ["b"]);
        assert.deepStrictEqual(pf.at($([{ id: 42 }, "id"]))[0], [42]);
    },

    setat: () => {
        assert.throws(() => pf.setat($([1, 2])));
        let a: any = [10, 20];
        assert.deepStrictEqual(pf.setat($([30, a, 0]))[0], [a]);
        assert.deepStrictEqual(a, [30, 20]);
        a = [10, 20];
        assert.deepStrictEqual(pf.setat($([30, a, 3]))[0], [a]);
        assert.deepStrictEqual(a, [10, 20, , 30]);
        a = {};
        assert.deepStrictEqual(pf.setat($([30, a, "a"]))[0], [a]);
        assert.deepStrictEqual(a, { a: 30 });
    },

    load: () => {
        assert.throws(() => pf.load($()));
        assert.deepStrictEqual(pf.load([["a"], [], { a: 1 }])[0], [1]);
        assert.throws(() => pf.load([["b"], [], { a: 1 }]));
    },

    store: () => {
        assert.throws(() => pf.store($([1])));
        assert.deepStrictEqual(pf.store([[10, "a"], [], {}]), [
            [],
            [],
            { a: 10 },
        ]);
        assert.deepStrictEqual(pf.store([[10, "b"], [], { a: 1 }]), [
            [],
            [],
            { a: 1, b: 10 },
        ]);
    },

    loadkey: () => {
        assert.deepStrictEqual(
            pf.defLoadKey("a")([[0], [], { a: 1 }])[0],
            [0, 1]
        );
        assert.throws(() => pf.defLoadKey("a")(pf.ctx()));
    },

    storekey: () => {
        assert.throws(() => pf.defStoreKey("a")($()));
        assert.deepStrictEqual(pf.defStoreKey("a")([[10], [], {}]), [
            [],
            [],
            { a: 10 },
        ]);
        assert.deepStrictEqual(pf.defStoreKey("b")([[10], [], { a: 1 }]), [
            [],
            [],
            { a: 1, b: 10 },
        ]);
    },

    pushenv: () => {
        assert.deepStrictEqual(pf.pushenv([[0], [], { a: 10 }]), [
            [0, { a: 10 }],
            [],
            { a: 10 },
        ]);
    },

    unwrap: () => {
        const res: StackContext = [[1, 2, 3], [], {}];
        assert.strictEqual(pf.unwrap([[], [], {}]), undefined);
        assert.strictEqual(pf.unwrap(res), 3);
        assert.deepStrictEqual(pf.unwrap(res, 2), [2, 3]);
        assert.deepStrictEqual(pf.unwrap(res, 3), [1, 2, 3]);
        assert.deepStrictEqual(pf.unwrap(res, 4), [1, 2, 3]);
    },

    exec: () => {
        assert.throws(() => pf.exec($()));
        assert.throws(() => pf.exec($([pf.add])));
        assert.throws(() => pf.exec($([1, pf.add])));
        assert.deepStrictEqual(pf.exec($([1, 2, pf.add]))[0], [3]);
    },

    "exec (quot)": () => {
        assert.throws(() => pf.exec($()));
        assert.throws(() => pf.exec($([[pf.add]])));
        assert.throws(() => pf.exec($([[1, pf.add]])));
        assert.deepStrictEqual(pf.exec($([[1, 2, pf.add]]))[0], [3]);
    },

    cond: () => {
        assert.throws(() => pf.defCond([], [])($()));
        assert.deepStrictEqual(pf.defCond([1], [2])($([undefined]))[0], [2]);
        assert.deepStrictEqual(pf.defCond([1], [2])($([null]))[0], [2]);
        assert.deepStrictEqual(pf.defCond([1], [2])($([0]))[0], [2]);
        assert.deepStrictEqual(pf.defCond([1], [2])($([true]))[0], [1]);
        assert.deepStrictEqual(pf.defCond([1], [2])($([-1]))[0], [1]);
        assert.deepStrictEqual(
            pf.defCond([1, pf.dup], [2, pf.dup])($([-1]))[0],
            [1, 1]
        );
        assert.deepStrictEqual(
            pf.defCond([1, pf.dup], [2, pf.dup])($([0]))[0],
            [2, 2]
        );
    },

    cases: () => {
        let classify = (x: any) =>
            pf.defCases({
                0: ["zero"],
                1: ["one"],
                default: [pf.ispos, pf.defCond(["many"], ["invalid"])],
            })($([x]))[0][0];

        assert.strictEqual(classify(0), "zero");
        assert.strictEqual(classify(1), "one");
        assert.strictEqual(classify(100), "many");
        assert.strictEqual(classify(-1), "invalid");
        assert.throws(() => pf.defCases({})($([0])));
    },

    word: () => {
        assert.deepStrictEqual(pf.defWord([pf.dup, pf.mul])($([2]))[0], [4]);
        assert.deepStrictEqual(
            pf.defWord([pf.pushenv], { a: 1 }, false)([[0], [], { b: 2 }])[0],
            [0, { a: 1 }]
        );
        assert.deepStrictEqual(
            pf.defWord([pf.pushenv], { a: 1 })([[0], [], { b: 2 }])[0],
            [0, { a: 1, b: 2 }]
        );
        assert.deepStrictEqual(pf.defWord([pf.add, pf.mul])($([1, 2, 3]))[0], [
            5,
        ]);
        assert.deepStrictEqual(
            pf.defWord([pf.add, pf.mul, pf.add])($([1, 2, 3, 4]))[0],
            [15]
        );
        assert.deepStrictEqual(
            pf.defWord([pf.add, pf.mul, pf.add, pf.mul])($([1, 2, 3, 4, 5]))[0],
            [29]
        );
        assert.deepStrictEqual(
            pf.defWord([pf.add, pf.mul, pf.add, pf.mul, pf.add])(
                $([1, 2, 3, 4, 5, 6])
            )[0],
            [95]
        );
        assert.deepStrictEqual(
            pf.defWord([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul])(
                $([1, 2, 3, 4, 5, 6, 7])
            )[0],
            [209]
        );
        assert.deepStrictEqual(
            pf.defWord([
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
            ])($([1, 2, 3, 4, 5, 6, 7, 8]))[0],
            [767]
        );
        assert.deepStrictEqual(
            pf.defWord([
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
            ])($([1, 2, 3, 4, 5, 6, 7, 8, 9]))[0],
            [1889]
        );
        assert.deepStrictEqual(
            pf.defWord([
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
            ])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))[0],
            [7679]
        );
        assert.deepStrictEqual(
            pf.defWord([
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
            ])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))[0],
            [20789]
        );
        assert.deepStrictEqual(
            pf.defWord([
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
                pf.mul,
                pf.add,
            ])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))[0],
            [92159]
        );
    },

    wordu: () => {
        assert.deepStrictEqual(pf.defWordU([pf.dup, pf.mul])($([2])), 4);
        assert.deepStrictEqual(pf.defWordU([pf.pushenv], 1, { a: 1 })($()), {
            a: 1,
        });
        assert.deepStrictEqual(
            pf.defWordU([pf.pushenv], 1, { a: 1 }, true)([[], [], { b: 2 }]),
            { a: 1, b: 2 }
        );
    },

    bindkeys: () => {
        assert.throws(() => pf.run([1, ["a", "b"], {}, pf.bindkeys]));
        assert.deepStrictEqual(
            pf.run([1, 2, 3, ["a", "b", "c"], {}, pf.bindkeys]),
            [[{ a: 1, b: 2, c: 3 }], [], {}]
        );
    },

    dip: () => {
        assert.deepStrictEqual(pf.run([1, [10], pf.dip])[0], [10, 1]);
        assert.deepStrictEqual(
            pf.run([1, 2, [10, pf.add], pf.dip])[0],
            [11, 2]
        );
    },

    dip2: () => {
        assert.deepStrictEqual(pf.run([1, 2, [10], pf.dip2])[0], [10, 1, 2]);
        assert.deepStrictEqual(
            pf.run([1, 2, 3, [10, pf.add], pf.dip2])[0],
            [11, 2, 3]
        );
    },

    dip3: () => {
        assert.deepStrictEqual(
            pf.run([1, 2, 3, [10], pf.dip3])[0],
            [10, 1, 2, 3]
        );
        assert.deepStrictEqual(
            pf.run([1, 2, 3, 4, [10, pf.add], pf.dip3])[0],
            [11, 2, 3, 4]
        );
    },

    dip4: () => {
        assert.deepStrictEqual(
            pf.run([1, 2, 3, 4, [10], pf.dip4])[0],
            [10, 1, 2, 3, 4]
        );
        assert.deepStrictEqual(
            pf.run([1, 2, 3, 4, 5, [10, pf.add], pf.dip4])[0],
            [11, 2, 3, 4, 5]
        );
    },

    keep: () => {
        assert.deepStrictEqual(pf.run([1, [10, pf.add], pf.keep])[0], [11, 1]);
    },

    keep2: () => {
        assert.deepStrictEqual(
            pf.run([1, 2, [pf.add], pf.keep2])[0],
            [3, 1, 2]
        );
    },

    keep3: () => {
        assert.deepStrictEqual(
            pf.run([1, 2, 3, [pf.add, pf.add], pf.keep3])[0],
            [6, 1, 2, 3]
        );
    },

    bi: () => {
        assert.deepStrictEqual(
            pf.run([2, [10, pf.add], [10, pf.mul], pf.bi])[0],
            [12, 20]
        );
    },

    bi2: () => {
        assert.deepStrictEqual(
            pf.run([2, 10, [pf.add], [pf.mul], pf.bi2])[0],
            [12, 20]
        );
    },

    bi3: () => {
        assert.deepStrictEqual(
            pf.run([2, 10, 100, [pf.add, pf.add], [pf.mul, pf.mul], pf.bi3])[0],
            [112, 2000]
        );
    },

    tri: () => {
        assert.deepStrictEqual(
            pf.run([10, [pf.dec], [pf.dup, pf.mul], [pf.inc], pf.tri])[0],
            [9, 100, 11]
        );
    },

    tri2: () => {
        assert.deepStrictEqual(
            pf.run([10, 20, [pf.add], [pf.mul], [pf.sub], pf.tri2])[0],
            [30, 200, -10]
        );
    },

    tri3: () => {
        assert.deepStrictEqual(
            pf.run([
                10,
                20,
                30,
                [pf.add, pf.add],
                [pf.mul, pf.mul],
                [pf.sub, pf.sub],
                pf.tri3,
            ])[0],
            [60, 6000, 20]
        );
    },

    bis: () => {
        assert.deepStrictEqual(
            pf.run([10, 20, [pf.inc], [pf.dec], pf.bis])[0],
            [11, 19]
        );
    },

    bis2: () => {
        assert.deepStrictEqual(
            pf.run([10, 20, 30, 40, [pf.add], [pf.sub], pf.bis2])[0],
            [30, -10]
        );
    },

    tris: () => {
        assert.deepStrictEqual(
            pf.run([
                10,
                20,
                30,
                [pf.inc],
                [pf.dup, pf.mul],
                [pf.dec],
                pf.tris,
            ])[0],
            [11, 400, 29]
        );
    },

    tris2: () => {
        assert.deepStrictEqual(
            pf.run([
                10,
                20,
                30,
                40,
                50,
                60,
                [pf.add],
                [pf.mul],
                [pf.sub],
                pf.tris2,
            ])[0],
            [30, 1200, -10]
        );
    },

    bia: () => {
        assert.deepStrictEqual(pf.run([10, 20, [pf.inc], pf.bia])[0], [11, 21]);
    },

    bia2: () => {
        assert.deepStrictEqual(
            pf.run([10, 20, 30, 40, [pf.add], pf.bia2])[0],
            [30, 70]
        );
    },

    tria: () => {
        assert.deepStrictEqual(
            pf.run([10, 20, 30, [pf.inc], pf.tria])[0],
            [11, 21, 31]
        );
    },

    tria2: () => {
        assert.deepStrictEqual(
            pf.run([10, 20, 30, 40, 50, 60, [pf.add], pf.tria2])[0],
            [30, 70, 110]
        );
    },

    both: () => {
        assert.deepStrictEqual(pf.run([10, 20, [pf.even], pf.both])[0], [true]);
        assert.deepStrictEqual(pf.run([11, 20, [pf.even], pf.both])[0], [
            false,
        ]);
        assert.deepStrictEqual(pf.run([10, 21, [pf.even], pf.both])[0], [
            false,
        ]);
        assert.deepStrictEqual(pf.run([11, 21, [pf.even], pf.both])[0], [
            false,
        ]);
    },

    either: () => {
        assert.deepStrictEqual(pf.run([10, 20, [pf.even], pf.either])[0], [
            true,
        ]);
        assert.deepStrictEqual(pf.run([11, 20, [pf.even], pf.either])[0], [
            true,
        ]);
        assert.deepStrictEqual(pf.run([10, 21, [pf.even], pf.either])[0], [
            true,
        ]);
        assert.deepStrictEqual(pf.run([11, 21, [pf.even], pf.either])[0], [
            false,
        ]);
    },
});
