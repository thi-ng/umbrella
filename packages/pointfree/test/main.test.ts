import { expect, test } from "bun:test";
import type { StackContext } from "../src/index.js";
import * as pf from "../src/index.js";

const $ = pf.ctx;

test("dsp", () => {
	expect(pf.dsp($())[0]).toEqual([0]);
	expect(pf.dsp($([10]))[0]).toEqual([10, 1]);
	expect(pf.dsp($([10, 20]))[0]).toEqual([10, 20, 2]);
});

test("rsp", () => {
	expect(pf.rsp($())[0]).toEqual([0]);
	expect(pf.rsp([[], [10], {}])[0]).toEqual([1]);
	expect(pf.rsp([[100], [10, 20], {}])[0]).toEqual([100, 2]);
});

test("movdr", () => {
	expect(() => pf.movdr($())).toThrow();
	expect(pf.movdr($([1]))).toEqual([[], [1], {}]);
	expect(pf.movdr([[1, 2], [10], {}])).toEqual([[1], [10, 2], {}]);
});

test("movrd", () => {
	expect(() => pf.movrd($())).toThrow();
	expect(pf.movrd([[], [1], {}])).toEqual([[1], [], {}]);
	expect(pf.movrd([[10], [1, 2], {}])).toEqual([[10, 2], [1], {}]);
});

test("push", () => {
	expect(pf.defPush()($())[0]).toEqual([]);
	expect(pf.defPush(1)($())[0]).toEqual([1]);
	expect(pf.defPush(2, 3)($([1]))[0]).toEqual([1, 2, 3]);
});

test("dup", () => {
	expect(() => pf.dup($([]))).toThrow();
	expect(pf.dup($([1]))[0]).toEqual([1, 1]);
	expect(pf.dup($([1, 2]))[0]).toEqual([1, 2, 2]);
});

test("dup2", () => {
	expect(() => pf.dup2($([1]))).toThrow();
	expect(pf.dup2($([1, 2]))[0]).toEqual([1, 2, 1, 2]);
	expect(pf.dup2($([1, 2, 3]))[0]).toEqual([1, 2, 3, 2, 3]);
});

test("dupIf", () => {
	expect(() => pf.dupif($([]))).toThrow();
	expect(pf.dupif($([0]))[0]).toEqual([0]);
	expect(pf.dupif($([1]))[0]).toEqual([1, 1]);
});

test("drop", () => {
	expect(() => pf.drop($([]))).toThrow();
	expect(pf.drop($([0]))[0]).toEqual([]);
	expect(pf.drop($([1, 2]))[0]).toEqual([1]);
});

test("drop2", () => {
	expect(() => pf.drop2($([1]))).toThrow();
	expect(pf.drop2($([1, 2]))[0]).toEqual([]);
	expect(pf.drop2($([1, 2, 3]))[0]).toEqual([1]);
});

test("dropIf", () => {
	expect(() => pf.dropif($([]))).toThrow();
	expect(pf.dropif($([0]))[0]).toEqual([0]);
	expect(pf.dropif($([1]))[0]).toEqual([]);
});

test("swap", () => {
	expect(() => pf.swap($([1]))).toThrow();
	expect(pf.swap($([0, 1]))[0]).toEqual([1, 0]);
	expect(pf.swap($([1, 2, 3]))[0]).toEqual([1, 3, 2]);
});

test("rswap", () => {
	expect(() => pf.rswap($([], [1]))).toThrow();
	expect(pf.rswap([[], [0, 1], {}])[1]).toEqual([1, 0]);
	expect(pf.rswap([[], [1, 2, 3], {}])[1]).toEqual([1, 3, 2]);
});

test("swap2", () => {
	expect(() => pf.swap2($([1, 2, 3]))).toThrow();
	expect(pf.swap2($([0, 1, 2, 3]))[0]).toEqual([2, 3, 0, 1]);
	expect(pf.swap2($([0, 1, 2, 3, 4]))[0]).toEqual([0, 3, 4, 1, 2]);
});

test("nip", () => {
	expect(() => pf.nip($([1]))).toThrow();
	expect(pf.nip($([0, 1]))[0]).toEqual([1]);
	expect(pf.nip($([0, 1, 2]))[0]).toEqual([0, 2]);
});

test("tuck", () => {
	expect(() => pf.tuck($([1]))).toThrow();
	expect(pf.tuck($([0, 1]))[0]).toEqual([1, 0, 1]);
	expect(pf.tuck($([0, 1, 2]))[0]).toEqual([0, 2, 1, 2]);
});

test("over", () => {
	expect(() => pf.over($([1]))).toThrow();
	expect(pf.over($([0, 1]))[0]).toEqual([0, 1, 0]);
	expect(pf.over($([0, 1, 2]))[0]).toEqual([0, 1, 2, 1]);
});

test("rot", () => {
	expect(() => pf.rot($([1, 2]))).toThrow();
	expect(pf.rot($([0, 1, 2]))[0]).toEqual([1, 2, 0]);
	expect(pf.rot($([0, 1, 2, 3]))[0]).toEqual([0, 2, 3, 1]);
});

test("invrot", () => {
	expect(() => pf.invrot($([1, 2]))).toThrow();
	expect(pf.invrot($([0, 1, 2]))[0]).toEqual([2, 0, 1]);
	expect(pf.invrot($([0, 1, 2, 3]))[0]).toEqual([0, 3, 1, 2]);
});

test("pick", () => {
	expect(() => pf.pick($([]))).toThrow();
	expect(() => pf.pick($([0]))).toThrow();
	expect(() => pf.pick($([0, 1]))).toThrow();
	expect(pf.pick($([0, 1, 0]))[0]).toEqual([0, 1, 1]);
	expect(pf.pick($([0, 1, 1]))[0]).toEqual([0, 1, 0]);
});

test("add", () => {
	expect(() => pf.add($([1]))).toThrow();
	expect(pf.add($([1, 2]))[0]).toEqual([3]);
});

test("mul", () => {
	expect(() => pf.mul($([1]))).toThrow();
	expect(pf.mul($([2, -3]))[0]).toEqual([-6]);
});

test("sub", () => {
	expect(() => pf.sub($([1]))).toThrow();
	expect(pf.sub($([2, 3]))[0]).toEqual([-1]);
});

test("div", () => {
	expect(() => pf.div($([1]))).toThrow();
	expect(pf.div($([1, -10]))[0]).toEqual([-0.1]);
});

test("mod", () => {
	expect(() => pf.mod($([1]))).toThrow();
	expect(pf.mod($([12, 10]))[0]).toEqual([2]);
});

test("inc", () => {
	expect(() => pf.inc($())).toThrow();
	expect(pf.inc($([1]))[0]).toEqual([2]);
	expect(pf.inc($([1, 2]))[0]).toEqual([1, 3]);
});

test("dec", () => {
	expect(() => pf.dec($())).toThrow();
	expect(pf.dec($([1]))[0]).toEqual([0]);
	expect(pf.dec($([1, 2]))[0]).toEqual([1, 1]);
});

test("neg", () => {
	expect(() => pf.neg($())).toThrow();
	expect(pf.neg($([1]))[0]).toEqual([-1]);
	expect(pf.neg($([1, 2]))[0]).toEqual([1, -2]);
});

test("pow", () => {
	expect(() => pf.pow($([1]))).toThrow();
	expect(pf.pow($([1, 2]))[0]).toEqual([1]);
	expect(pf.pow($([1, 2, 3]))[0]).toEqual([1, 8]);
});

test("sqrt", () => {
	expect(() => pf.sqrt($())).toThrow();
	expect(pf.sqrt($([1]))[0]).toEqual([1]);
	expect(pf.sqrt($([1, 9]))[0]).toEqual([1, 3]);
});

test("bitAnd", () => {
	expect(() => pf.bitand($([0]))).toThrow();
	expect(pf.bitand($([0x1a, 0xfc]))[0]).toEqual([0x18]);
});

test("bitOr", () => {
	expect(() => pf.bitor($([0]))).toThrow();
	expect(pf.bitor($([0xf0, 0x1]))[0]).toEqual([0xf1]);
});

test("bitXor", () => {
	expect(() => pf.bitxor($([0]))).toThrow();
	expect(pf.bitxor($([0xff, 0xaa]))[0]).toEqual([0x55]);
});

test("bitNot", () => {
	expect(() => pf.bitnot($())).toThrow();
	expect(pf.bitnot($([0x7f]))[0]).toEqual([-0x80]);
});

test("lsl", () => {
	expect(() => pf.lsl($())).toThrow();
	expect(pf.lsl($([0xf, 16]))[0]).toEqual([0xf0000]);
});

test("lsr", () => {
	expect(() => pf.lsr($())).toThrow();
	expect(pf.lsr($([0xdecafbad, 16]))[0]).toEqual([-8502]);
});

test("lsru", () => {
	expect(() => pf.lsru($())).toThrow();
	expect(pf.lsru($([0xdecafbad, 16]))[0]).toEqual([0xdeca]);
});

test("and", () => {
	expect(() => pf.and($([0]))).toThrow();
	expect(pf.and($([0, 0]))[0]).toEqual([false]);
	expect(pf.and($([0, 1]))[0]).toEqual([false]);
	expect(pf.and($([1, 0]))[0]).toEqual([false]);
	expect(pf.and($([1, 1]))[0]).toEqual([true]);
});

test("or", () => {
	expect(() => pf.or($([0]))).toThrow();
	expect(pf.or($([0, 0]))[0]).toEqual([false]);
	expect(pf.or($([0, 1]))[0]).toEqual([true]);
	expect(pf.or($([1, 0]))[0]).toEqual([true]);
	expect(pf.or($([1, 1]))[0]).toEqual([true]);
});

test("not", () => {
	expect(() => pf.not($())).toThrow();
	expect(pf.not($([1]))[0]).toEqual([false]);
	expect(pf.not($([0]))[0]).toEqual([true]);
});

test("eq", () => {
	expect(() => pf.eq($([1]))).toThrow();
	expect(pf.eq($([1, 1]))[0]).toEqual([true]);
	expect(pf.eq($([1, -1]))[0]).toEqual([false]);
	expect(pf.eq($([1, "1"]))[0]).toEqual([false]);
	expect(pf.eq($([[1], [1]]))[0]).toEqual([false]);
});

test("neq", () => {
	expect(() => pf.neq($([1]))).toThrow();
	expect(pf.neq($([1, 1]))[0]).toEqual([false]);
	expect(pf.neq($([1, -1]))[0]).toEqual([true]);
	expect(pf.neq($([1, "1"]))[0]).toEqual([true]);
	expect(pf.neq($([[1], [1]]))[0]).toEqual([true]);
});

test("equiv", () => {
	expect(() => pf.equiv($([1]))).toThrow();
	expect(pf.equiv($([1, 1]))[0]).toEqual([true]);
	expect(pf.equiv($([1, -1]))[0]).toEqual([false]);
	expect(pf.equiv($([1, "1"]))[0]).toEqual([false]);
	expect(pf.equiv($([[1], [1]]))[0]).toEqual([true]);
});

test("lt", () => {
	expect(() => pf.lt($([1]))).toThrow();
	expect(pf.lt($([1, -1]))[0]).toEqual([false]);
	expect(pf.lt($([1, 1]))[0]).toEqual([false]);
	expect(pf.lt($([1, 2]))[0]).toEqual([true]);
});

test("lteq", () => {
	expect(() => pf.lteq($([1]))).toThrow();
	expect(pf.lteq($([1, -1]))[0]).toEqual([false]);
	expect(pf.lteq($([1, 1]))[0]).toEqual([true]);
	expect(pf.lteq($([1, 2]))[0]).toEqual([true]);
});

test("gt", () => {
	expect(() => pf.gt($([1]))).toThrow();
	expect(pf.gt($([1, -1]))[0]).toEqual([true]);
	expect(pf.gt($([1, 1]))[0]).toEqual([false]);
	expect(pf.gt($([1, 2]))[0]).toEqual([false]);
});

test("gteq", () => {
	expect(() => pf.gteq($([1]))).toThrow();
	expect(pf.gteq($([1, -1]))[0]).toEqual([true]);
	expect(pf.gteq($([1, 1]))[0]).toEqual([true]);
	expect(pf.gteq($([1, 2]))[0]).toEqual([false]);
});

test("isZero", () => {
	expect(() => pf.iszero($())).toThrow();
	expect(pf.iszero($([0]))[0]).toEqual([true]);
	expect(pf.iszero($([0.0]))[0]).toEqual([true]);
	expect(pf.iszero($([1]))[0]).toEqual([false]);
	expect(pf.iszero($([null]))[0]).toEqual([false]);
});

test("isPos", () => {
	expect(() => pf.ispos($())).toThrow();
	expect(pf.ispos($([0]))[0]).toEqual([false]);
	expect(pf.ispos($([0.0]))[0]).toEqual([false]);
	expect(pf.ispos($([1]))[0]).toEqual([true]);
	expect(pf.ispos($([-1]))[0]).toEqual([false]);
	expect(pf.ispos($([null]))[0]).toEqual([false]);
});

test("isNeg", () => {
	expect(() => pf.isneg($())).toThrow();
	expect(pf.isneg($([0]))[0]).toEqual([false]);
	expect(pf.isneg($([0.0]))[0]).toEqual([false]);
	expect(pf.isneg($([1]))[0]).toEqual([false]);
	expect(pf.isneg($([-1]))[0]).toEqual([true]);
	expect(pf.isneg($([null]))[0]).toEqual([false]);
});

test("isNull", () => {
	expect(() => pf.isnull($())).toThrow();
	expect(pf.isnull($([0]))[0]).toEqual([false]);
	expect(pf.isnull($([1]))[0]).toEqual([false]);
	expect(pf.isnull($([null]))[0]).toEqual([true]);
	expect(pf.isnull($([undefined]))[0]).toEqual([true]);
});

test("list", () => {
	expect(pf.list($())[0]).toEqual([[]]);
	const foo = pf.defWord([[], 1, pf.pushr]);
	const bar = pf.defWord([pf.list, 1, pf.pushr]);
	expect(foo($())[0]).toEqual([[1]]);
	expect(foo($())[0]).toEqual([[1, 1]]);
	expect(bar($())[0]).toEqual([[1]]);
	expect(bar($())[0]).toEqual([[1]]);
});

test("pushl", () => {
	expect(() => pf.pushl($([[]]))).toThrow();
	expect(pf.pushl($([1, []]))[0]).toEqual([[1]]);
});

test("pushr", () => {
	expect(() => pf.pushr($([[]]))).toThrow();
	expect(pf.pushr($([[], 1]))[0]).toEqual([[1]]);
});

test("popr", () => {
	expect(() => pf.popr($())).toThrow();
	expect(() => pf.popr($([[]]))).toThrow();
	expect(pf.popr($([[1]]))[0]).toEqual([[], 1]);
	expect(pf.popr($([[1, 2]]))[0]).toEqual([[1], 2]);
});

test("pull", () => {
	expect(() => pf.pull($())).toThrow();
	expect(() => pf.pull($([[]]))).toThrow();
	expect(pf.pull($([[1]]))[0]).toEqual([1, []]);
	expect(pf.pull($([[1, 2]]))[0]).toEqual([2, [1]]);
	expect(pf.pull(pf.pull($([[1, 2]])))[0]).toEqual([2, 1, []]);
});

test("pull2", () => {
	expect(() => pf.pull2($([[1]]))).toThrow();
	expect(pf.pull2($([[1, 2]]))[0]).toEqual([2, 1, []]);
});

test("pull3", () => {
	expect(() => pf.pull3($([[1, 2]]))).toThrow();
	expect(pf.pull3($([[1, 2, 3]]))[0]).toEqual([3, 2, 1, []]);
});

test("pull4", () => {
	expect(() => pf.pull4($([[1, 2, 3]]))).toThrow();
	expect(pf.pull4($([[1, 2, 3, 4]]))[0]).toEqual([4, 3, 2, 1, []]);
});

test("vadd", () => {
	expect(() => pf.vadd($([[]]))).toThrow();
	expect(
		pf.vadd(
			$([
				[1, 2, 3],
				[10, 20, 30],
			])
		)[0]
	).toEqual([[11, 22, 33]]);
	expect(pf.vadd($([[1, 2, 3], 10]))[0]).toEqual([[11, 12, 13]]);
	expect(pf.vadd($([10, [1, 2, 3]]))[0]).toEqual([[11, 12, 13]]);
});

test("vmul", () => {
	expect(() => pf.vmul($([[]]))).toThrow();
	expect(
		pf.vmul(
			$([
				[1, 2, 3],
				[10, 20, 30],
			])
		)[0]
	).toEqual([[10, 40, 90]]);
	expect(pf.vmul($([[1, 2, 3], 10]))[0]).toEqual([[10, 20, 30]]);
	expect(pf.vmul($([10, [1, 2, 3]]))[0]).toEqual([[10, 20, 30]]);
});

test("vsub", () => {
	expect(() => pf.vsub($([[]]))).toThrow();
	expect(
		pf.vsub(
			$([
				[1, 2, 3],
				[10, 20, 30],
			])
		)[0]
	).toEqual([[-9, -18, -27]]);
	expect(pf.vsub($([[1, 2, 3], 10]))[0]).toEqual([[-9, -8, -7]]);
	expect(pf.vsub($([10, [1, 2, 3]]))[0]).toEqual([[9, 8, 7]]);
});

test("vdiv", () => {
	expect(() => pf.vdiv($([[]]))).toThrow();
	expect(
		pf.vdiv(
			$([
				[1, 2, 3],
				[10, 20, 30],
			])
		)[0]
	).toEqual([[0.1, 0.1, 0.1]]);
	expect(pf.vdiv($([[1, 2, 3], 10]))[0]).toEqual([[0.1, 0.2, 0.3]]);
	expect(pf.vdiv($([10, [1, 2, 3]]))[0]).toEqual([[10, 5, 10 / 3]]);
});

test("vsplit", () => {
	expect(() => pf.split($())).toThrow();
	expect(pf.split($([[1, 2, 3, 4], 2]))[0]).toEqual([
		[1, 2],
		[3, 4],
	]);
	expect(pf.split($([[1, 2, 3, 4], 4]))[0]).toEqual([[1, 2, 3, 4], []]);
	expect(pf.split($([[1, 2, 3, 4], -1]))[0]).toEqual([[1, 2, 3], [4]]);
});

test("mapl (reduce)", () => {
	expect(() => pf.mapl($([[]]))).toThrow();
	expect(pf.mapl($([0, [1, 2, 3, 4], [pf.add]]))[0]).toEqual([10]);
});

test("collect", () => {
	expect(() => pf.collect($())).toThrow();
	expect(pf.collect($([1, 2, 3, 4, 0]))[0]).toEqual([1, 2, 3, 4, []]);
	expect(pf.collect($([1, 2, 3, 4, 1]))[0]).toEqual([1, 2, 3, [4]]);
	expect(pf.collect($([1, 2, 3, 4, 3]))[0]).toEqual([1, [2, 3, 4]]);
	expect(() => pf.collect($([1, 2, 3, 4, 5]))).toThrow();
});

test("tuple", () => {
	expect(() => pf.defTuple(1)($())).toThrow();
	expect(pf.defTuple(1)($([1]))[0]).toEqual([[1]]);
	expect(pf.defTuple(1)($([1, 2]))[0]).toEqual([1, [2]]);
	expect(pf.defTuple(2)($([1, 2]))[0]).toEqual([[1, 2]]);
});

test("length", () => {
	expect(() => pf.length($())).toThrow();
	expect(pf.length($([[10]]))[0]).toEqual([1]);
	expect(pf.length($([[10, 20]]))[0]).toEqual([2]);
	expect(pf.length($(["a"]))[0]).toEqual([1]);
});

test("cat", () => {
	expect(() => pf.cat($())).toThrow();
	expect(pf.cat($([[1], [2]]))[0]).toEqual([[1, 2]]);
});

test("join", () => {
	expect(() => pf.defJoin()($())).toThrow();
	expect(pf.defJoin()($([["a", 1]]))[0]).toEqual(["a1"]);
	expect(pf.defJoin("-")($([["a", 1]]))[0]).toEqual(["a-1"]);
});

test("at", () => {
	expect(() => pf.at($([1]))).toThrow();
	expect(pf.at($([[10, 20], 0]))[0]).toEqual([10]);
	expect(pf.at($([[10, 20], 1]))[0]).toEqual([20]);
	expect(pf.at($(["ab", 1]))[0]).toEqual(["b"]);
	expect(pf.at($([{ id: 42 }, "id"]))[0]).toEqual([42]);
});

test("setat", () => {
	expect(() => pf.setat($([1, 2]))).toThrow();
	let a: any = [10, 20];
	expect(pf.setat($([30, a, 0]))[0]).toEqual([a]);
	expect(a).toEqual([30, 20]);
	a = [10, 20];
	expect(pf.setat($([30, a, 3]))[0]).toEqual([a]);
	expect(a).toEqual([10, 20, , 30]);
	a = {};
	expect(pf.setat($([30, a, "a"]))[0]).toEqual([a]);
	expect(a).toEqual({ a: 30 });
});

test("load", () => {
	expect(() => pf.load($())).toThrow();
	expect(pf.load([["a"], [], { a: 1 }])[0]).toEqual([1]);
	expect(() => pf.load([["b"], [], { a: 1 }])).toThrow();
});

test("store", () => {
	expect(() => pf.store($([1]))).toThrow();
	expect(pf.store([[10, "a"], [], {}])).toEqual([[], [], { a: 10 }]);
	expect(pf.store([[10, "b"], [], { a: 1 }])).toEqual([
		[],
		[],
		{ a: 1, b: 10 },
	]);
});

test("loadkey", () => {
	expect(pf.defLoadKey("a")([[0], [], { a: 1 }])[0]).toEqual([0, 1]);
	expect(() => pf.defLoadKey("a")(pf.ctx())).toThrow();
});

test("storekey", () => {
	expect(() => pf.defStoreKey("a")($())).toThrow();
	expect(pf.defStoreKey("a")([[10], [], {}])).toEqual([[], [], { a: 10 }]);
	expect(pf.defStoreKey("b")([[10], [], { a: 1 }])).toEqual([
		[],
		[],
		{ a: 1, b: 10 },
	]);
});

test("pushenv", () => {
	expect(pf.pushenv([[0], [], { a: 10 }])).toEqual([
		[0, { a: 10 }],
		[],
		{ a: 10 },
	]);
});

test("unwrap", () => {
	const res: StackContext = [[1, 2, 3], [], {}];
	expect(pf.unwrap([[], [], {}])).toBe(undefined);
	expect(pf.unwrap(res)).toBe(3);
	expect(pf.unwrap(res, 2)).toEqual([2, 3]);
	expect(pf.unwrap(res, 3)).toEqual([1, 2, 3]);
	expect(pf.unwrap(res, 4)).toEqual([1, 2, 3]);
});

test("exec", () => {
	expect(() => pf.exec($())).toThrow();
	expect(() => pf.exec($([pf.add]))).toThrow();
	expect(() => pf.exec($([1, pf.add]))).toThrow();
	expect(pf.exec($([1, 2, pf.add]))[0]).toEqual([3]);
});

test("exec (quot)", () => {
	expect(() => pf.exec($())).toThrow();
	expect(() => pf.exec($([[pf.add]]))).toThrow();
	expect(() => pf.exec($([[1, pf.add]]))).toThrow();
	expect(pf.exec($([[1, 2, pf.add]]))[0]).toEqual([3]);
});

test("cond", () => {
	expect(() => pf.defCond([], [])($())).toThrow();
	expect(pf.defCond([1], [2])($([undefined]))[0]).toEqual([2]);
	expect(pf.defCond([1], [2])($([null]))[0]).toEqual([2]);
	expect(pf.defCond([1], [2])($([0]))[0]).toEqual([2]);
	expect(pf.defCond([1], [2])($([true]))[0]).toEqual([1]);
	expect(pf.defCond([1], [2])($([-1]))[0]).toEqual([1]);
	expect(pf.defCond([1, pf.dup], [2, pf.dup])($([-1]))[0]).toEqual([1, 1]);
	expect(pf.defCond([1, pf.dup], [2, pf.dup])($([0]))[0]).toEqual([2, 2]);
});

test("cases", () => {
	let classify = (x: any) =>
		pf.defCases({
			0: ["zero"],
			1: ["one"],
			default: [pf.ispos, pf.defCond(["many"], ["invalid"])],
		})($([x]))[0][0];

	expect(classify(0)).toBe("zero");
	expect(classify(1)).toBe("one");
	expect(classify(100)).toBe("many");
	expect(classify(-1)).toBe("invalid");
	expect(() => pf.defCases({})($([0]))).toThrow();
});

test("word", () => {
	expect(pf.defWord([pf.dup, pf.mul])($([2]))[0]).toEqual([4]);
	expect(
		pf.defWord([pf.pushenv], { a: 1 }, false)([[0], [], { b: 2 }])[0]
	).toEqual([0, { a: 1 }]);
	expect(pf.defWord([pf.pushenv], { a: 1 })([[0], [], { b: 2 }])[0]).toEqual([
		0,
		{ a: 1, b: 2 },
	]);
	expect(pf.defWord([pf.add, pf.mul])($([1, 2, 3]))[0]).toEqual([5]);
	expect(pf.defWord([pf.add, pf.mul, pf.add])($([1, 2, 3, 4]))[0]).toEqual([
		15,
	]);
	expect(
		pf.defWord([pf.add, pf.mul, pf.add, pf.mul])($([1, 2, 3, 4, 5]))[0]
	).toEqual([29]);
	expect(
		pf.defWord([pf.add, pf.mul, pf.add, pf.mul, pf.add])(
			$([1, 2, 3, 4, 5, 6])
		)[0]
	).toEqual([95]);
	expect(
		pf.defWord([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul])(
			$([1, 2, 3, 4, 5, 6, 7])
		)[0]
	).toEqual([209]);
	expect(
		pf.defWord([pf.add, pf.mul, pf.add, pf.mul, pf.add, pf.mul, pf.add])(
			$([1, 2, 3, 4, 5, 6, 7, 8])
		)[0]
	).toEqual([767]);
	expect(
		pf.defWord([
			pf.add,
			pf.mul,
			pf.add,
			pf.mul,
			pf.add,
			pf.mul,
			pf.add,
			pf.mul,
		])($([1, 2, 3, 4, 5, 6, 7, 8, 9]))[0]
	).toEqual([1889]);
	expect(
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
		])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))[0]
	).toEqual([7679]);
	expect(
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
		])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))[0]
	).toEqual([20789]);
	expect(
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
		])($([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))[0]
	).toEqual([92159]);
});

test("wordu", () => {
	expect(pf.defWordU([pf.dup, pf.mul])($([2]))).toEqual(4);
	expect(pf.defWordU([pf.pushenv], 1, { a: 1 })($())).toEqual({
		a: 1,
	});
	expect(
		pf.defWordU([pf.pushenv], 1, { a: 1 }, true)([[], [], { b: 2 }])
	).toEqual({
		a: 1,
		b: 2,
	});
});

test("bindkeys", () => {
	expect(() => pf.run([1, ["a", "b"], {}, pf.bindkeys])).toThrow();
	expect(pf.run([1, 2, 3, ["a", "b", "c"], {}, pf.bindkeys])).toEqual([
		[{ a: 1, b: 2, c: 3 }],
		[],
		{},
	]);
});

test("dip", () => {
	expect(pf.run([1, [10], pf.dip])[0]).toEqual([10, 1]);
	expect(pf.run([1, 2, [10, pf.add], pf.dip])[0]).toEqual([11, 2]);
});

test("dip2", () => {
	expect(pf.run([1, 2, [10], pf.dip2])[0]).toEqual([10, 1, 2]);
	expect(pf.run([1, 2, 3, [10, pf.add], pf.dip2])[0]).toEqual([11, 2, 3]);
});

test("dip3", () => {
	expect(pf.run([1, 2, 3, [10], pf.dip3])[0]).toEqual([10, 1, 2, 3]);
	expect(pf.run([1, 2, 3, 4, [10, pf.add], pf.dip3])[0]).toEqual([
		11, 2, 3, 4,
	]);
});

test("dip4", () => {
	expect(pf.run([1, 2, 3, 4, [10], pf.dip4])[0]).toEqual([10, 1, 2, 3, 4]);
	expect(pf.run([1, 2, 3, 4, 5, [10, pf.add], pf.dip4])[0]).toEqual([
		11, 2, 3, 4, 5,
	]);
});

test("keep", () => {
	expect(pf.run([1, [10, pf.add], pf.keep])[0]).toEqual([11, 1]);
});

test("keep2", () => {
	expect(pf.run([1, 2, [pf.add], pf.keep2])[0]).toEqual([3, 1, 2]);
});

test("keep3", () => {
	expect(pf.run([1, 2, 3, [pf.add, pf.add], pf.keep3])[0]).toEqual([
		6, 1, 2, 3,
	]);
});

test("bi", () => {
	expect(pf.run([2, [10, pf.add], [10, pf.mul], pf.bi])[0]).toEqual([12, 20]);
});

test("bi2", () => {
	expect(pf.run([2, 10, [pf.add], [pf.mul], pf.bi2])[0]).toEqual([12, 20]);
});

test("bi3", () => {
	expect(
		pf.run([2, 10, 100, [pf.add, pf.add], [pf.mul, pf.mul], pf.bi3])[0]
	).toEqual([112, 2000]);
});

test("tri", () => {
	expect(
		pf.run([10, [pf.dec], [pf.dup, pf.mul], [pf.inc], pf.tri])[0]
	).toEqual([9, 100, 11]);
});

test("tri2", () => {
	expect(pf.run([10, 20, [pf.add], [pf.mul], [pf.sub], pf.tri2])[0]).toEqual([
		30, 200, -10,
	]);
});

test("tri3", () => {
	expect(
		pf.run([
			10,
			20,
			30,
			[pf.add, pf.add],
			[pf.mul, pf.mul],
			[pf.sub, pf.sub],
			pf.tri3,
		])[0]
	).toEqual([60, 6000, 20]);
});

test("bis", () => {
	expect(pf.run([10, 20, [pf.inc], [pf.dec], pf.bis])[0]).toEqual([11, 19]);
});

test("bis2", () => {
	expect(pf.run([10, 20, 30, 40, [pf.add], [pf.sub], pf.bis2])[0]).toEqual([
		30, -10,
	]);
});

test("tris", () => {
	expect(
		pf.run([10, 20, 30, [pf.inc], [pf.dup, pf.mul], [pf.dec], pf.tris])[0]
	).toEqual([11, 400, 29]);
});

test("tris2", () => {
	expect(
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
		])[0]
	).toEqual([30, 1200, -10]);
});

test("bia", () => {
	expect(pf.run([10, 20, [pf.inc], pf.bia])[0]).toEqual([11, 21]);
});

test("bia2", () => {
	expect(pf.run([10, 20, 30, 40, [pf.add], pf.bia2])[0]).toEqual([30, 70]);
});

test("tria", () => {
	expect(pf.run([10, 20, 30, [pf.inc], pf.tria])[0]).toEqual([11, 21, 31]);
});

test("tria2", () => {
	expect(pf.run([10, 20, 30, 40, 50, 60, [pf.add], pf.tria2])[0]).toEqual([
		30, 70, 110,
	]);
});

test("both", () => {
	expect(pf.run([10, 20, [pf.even], pf.both])[0]).toEqual([true]);
	expect(pf.run([11, 20, [pf.even], pf.both])[0]).toEqual([false]);
	expect(pf.run([10, 21, [pf.even], pf.both])[0]).toEqual([false]);
	expect(pf.run([11, 21, [pf.even], pf.both])[0]).toEqual([false]);
});

test("either", () => {
	expect(pf.run([10, 20, [pf.even], pf.either])[0]).toEqual([true]);
	expect(pf.run([11, 20, [pf.even], pf.either])[0]).toEqual([true]);
	expect(pf.run([10, 21, [pf.even], pf.either])[0]).toEqual([true]);
	expect(pf.run([11, 21, [pf.even], pf.either])[0]).toEqual([false]);
});
