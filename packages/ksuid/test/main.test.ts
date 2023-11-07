import { XsAdd } from "@thi.ng/random";
import { expect, test } from "bun:test";
import { defKSUID32, defKSUID64, defULID, type IKSUID } from "../src/index.js";

const check = ({
	idgen,
	eps,
	epoch,
	epochId,
	id1,
	id2,
}: {
	idgen: IKSUID;
	eps: number;
	epoch: number;
	epochId: string;
	id1: Uint8Array;
	id2: Uint8Array;
}) => {
	const t = Date.now();
	let a = idgen.timeOnly(t);
	expect(a.length).toBe(idgen.encodedSize);
	let res = idgen.parse(a);
	expect(Math.abs(res.epoch - t) < eps).toBeTrue();
	expect(res.id).toEqual(new Uint8Array(idgen.size - idgen.epochSize));
	const b = idgen.nextBinary();
	expect(b.slice(idgen.epochSize)).toEqual(id1);
	res = idgen.parse(idgen.format(b));
	expect(Math.abs(res.epoch - t) < eps).toBeTrue();
	expect(res.id).toEqual(id1);

	a = idgen.fromEpoch(epoch);
	expect(a).toBe(epochId);
	res = idgen.parse(a);
	expect(Math.abs(res.epoch - epoch) < 1000).toBeTrue();
	expect(res.id).toEqual(id2);
};

test("ksuid32", () => {
	check({
		idgen: defKSUID32({ rnd: new XsAdd(0xdecafbad) }),
		eps: 1000 * 2,
		epoch: 1673827200987,
		epochId: "0cvXkjDAOaQwnLEfa0quXiN152g",
		id1: new Uint8Array([
			238, 112, 17, 61, 231, 80, 187, 91, 143, 161, 122, 189, 63, 122,
			213, 170,
		]),
		id2: new Uint8Array([
			28, 104, 25, 98, 112, 22, 2, 59, 20, 112, 71, 222, 179, 28, 90, 226,
		]),
	});
});

test("ksuid64", () => {
	check({
		idgen: defKSUID64({ rnd: new XsAdd(0xdecafbad) }),
		eps: 1 * 2,
		epoch: 1673827200987,
		epochId: "000029vWC12CchKHzJqil6mla0Z",
		id1: new Uint8Array([
			238, 112, 17, 61, 231, 80, 187, 91, 143, 161, 122, 189,
		]),
		id2: new Uint8Array([
			63, 122, 213, 170, 28, 104, 25, 98, 112, 22, 2, 59,
		]),
	});
});

test("ulid", () => {
	check({
		idgen: defULID({ rnd: new XsAdd(0xdecafbad) }),
		eps: 1 * 2,
		epoch: 1673827200987,
		epochId: "01GPVY0BYVFAYKYYPNN8E6G6B2",
		id1: new Uint8Array([238, 112, 17, 61, 231, 80, 187, 91, 143, 161]),
		id2: new Uint8Array([122, 189, 63, 122, 213, 170, 28, 104, 25, 98]),
	});
});

test("epoch bounds", () => {
	expect(
		defKSUID32().timeOnly(new Date("2156-10-20T18:54:55Z").getTime())
	).toBe("aWgEPLxxrZOFaOlDVFHTB3ZiQOO");
	expect(() =>
		defKSUID32().timeOnly(new Date("2156-10-20T18:54:56Z").getTime())
	).toThrow();
	// default epoch offset is approx. 2020-09-13,
	// so earlier dates are unsupported in this case...
	expect(() =>
		defKSUID32().timeOnly(new Date("1999-01-01").getTime())
	).toThrow();
});
