import { XsAdd } from "@thi.ng/random";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defKSUID32, defKSUID64, defULID, IKSUID } from "../src/index.js";

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
	assert.strictEqual(a.length, idgen.encodedSize);
	let res = idgen.parse(a);
	assert.ok(Math.abs(res.epoch - t) < eps);
	assert.deepStrictEqual(
		res.id,
		new Uint8Array(idgen.size - idgen.epochSize)
	);
	const b = idgen.nextBinary();
	assert.deepStrictEqual(b.slice(idgen.epochSize), id1);
	res = idgen.parse(idgen.format(b));
	assert.ok(Math.abs(res.epoch - t) < eps);
	assert.deepStrictEqual(res.id, id1);

	a = idgen.fromEpoch(epoch);
	assert.strictEqual(a, epochId);
	res = idgen.parse(a);
	assert.ok(Math.abs(res.epoch - epoch) < 1000);
	assert.deepStrictEqual(res.id, id2);
};

group("ksuid", {
	ksuid32: () => {
		check({
			idgen: defKSUID32({ rnd: new XsAdd(0xdecafbad) }),
			eps: 1000 * 2,
			epoch: 1673827200987,
			epochId: "0cvXkpEgU5CRFeBfpf2KrwummtA",
			id1: new Uint8Array([
				170, 213, 122, 63, 189, 122, 161, 143, 91, 187, 80, 231, 61, 17,
				112, 238,
			]),
			id2: new Uint8Array([
				226, 90, 28, 179, 222, 71, 112, 20, 59, 2, 22, 112, 98, 25, 104,
				28,
			]),
		});
	},

	ksuid64: () => {
		check({
			idgen: defKSUID64({ rnd: new XsAdd(0xdecafbad) }),
			eps: 1 * 2,
			epoch: 1673827200987,
			epochId: "000029vWC12Ap6k6ZH00XfKuZGp",
			id1: new Uint8Array([
				189, 122, 161, 143, 91, 187, 80, 231, 61, 17, 112, 238,
			]),
			id2: new Uint8Array([
				59, 2, 22, 112, 98, 25, 104, 28, 170, 213, 122, 63,
			]),
		});
	},

	ulid: () => {
		check({
			idgen: defULID({ rnd: new XsAdd(0xdecafbad) }),
			eps: 1 * 2,
			epoch: 1673827200987,
			epochId: "01GPVY0BYVC8CPG75ATNX3ZFBT",
			id1: new Uint8Array([161, 143, 91, 187, 80, 231, 61, 17, 112, 238]),
			id2: new Uint8Array([98, 25, 104, 28, 170, 213, 122, 63, 189, 122]),
		});
	},
});
