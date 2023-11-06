import { EquivMap } from "@thi.ng/associative";
import { group } from "@thi.ng/testament";
import { map, mapIndexed } from "@thi.ng/transducers";
import * as assert from "assert";
import {
	fromIterable,
	fromIterableSync,
	PubSub,
	pubsub,
} from "../src/index.js";
import { TIMEOUT } from "./config.js";
import { assertUnsub } from "./utils.js";

let pub: PubSub<any, any>;

group(
	"PubSub",
	{
		simple: () => {
			const acc: any = { a: [], b: [] };
			const collect = { next: (x: any) => acc[x].push(x) };
			pub = pubsub({ topic: (x) => x });
			const a = pub.subscribeTopic("a", collect);
			const b = pub.subscribeTopic("b", collect);
			fromIterableSync("abcbd").subscribe(pub);
			assert.deepStrictEqual(acc, { a: ["a"], b: ["b", "b"] });
			assertUnsub(pub);
			assertUnsub(a);
			assertUnsub(b);
		},

		"complex keys": () => {
			const acc = new EquivMap<[string, number], [string, number][]>();
			const collect = {
				next: (x: any) => {
					let v = acc.get(x);
					v ? v.push(x) : acc.set(x, [x]);
				},
			};
			pub = pubsub({ topic: (x) => x });
			pub.subscribeTopic(["a", 0], collect);
			pub.subscribeTopic(["a", 1], collect);
			pub.subscribeTopic(["b", 2], collect);
			fromIterableSync([
				["a", 0],
				["a", 1],
				["b", 2],
				["a", 0],
				["c", 3],
			]).subscribe(pub);
			assert.deepStrictEqual(
				[...acc],
				[
					[
						["a", 0],
						[
							["a", 0],
							["a", 0],
						],
					],
					[["a", 1], [["a", 1]]],
					[["b", 2], [["b", 2]]],
				]
			);
			assertUnsub(pub);
		},

		transducer: () => {
			const acc: any = { a: [], b: [], c: [], d: [] };
			const collect = { next: (x: any) => acc[x[0]].push(x) };
			pub = pubsub({
				topic: (x) => x[0],
				xform: mapIndexed<string, [string, number]>((i, x) => [x, i]),
			});
			pub.subscribeTopic("a", collect);
			pub.subscribeTopic("b", collect);
			pub.subscribeTopic("c", collect, {
				xform: map((x) => [x[0], x[1] * 10]),
			});
			pub.transformTopic(
				"d",
				map((x) => [x[0], x[1] * 11])
			).subscribe(collect);
			fromIterableSync("abcbde").subscribe(pub);
			assert.deepStrictEqual(acc, {
				a: [["a", 0]],
				b: [
					["b", 1],
					["b", 3],
				],
				c: [["c", 20]],
				d: [["d", 44]],
			});
			assertUnsub(pub);
		},

		unsubTopic: ({ done, setTimeout }) => {
			const acc: any = { a: [], b: [] };
			const collect = {
				next: (x: any) => {
					acc[x].push(x);
				},
			};
			pub = pubsub({ topic: (x) => x });
			pub.subscribeTopic("a", collect);
			const b = pub.subscribeTopic("b", collect);
			fromIterable("abcbd", { delay: TIMEOUT }).subscribe(pub);
			setTimeout(() => {
				pub.unsubscribeTopic("b", b);
			}, TIMEOUT * 2.5);
			setTimeout(() => {
				assert.deepStrictEqual(acc, { a: ["a"], b: ["b"] });
				assertUnsub(pub);
				done();
			}, TIMEOUT * 7.5);
		},

		transformTopic: () => {
			const acc: any = [];
			const collect = {
				next(x: any) {
					acc.push(x);
				},
			};
			pub = pubsub({ topic: (x) => x });
			pub.transformTopic(
				"a",
				map((x) => x.toUpperCase())
			).subscribe(collect);
			pub.next("a");
			assert.deepStrictEqual(acc, ["A"]);
		},

		"subTopic only": () => {
			const acc: any[] = [];
			pub = pubsub({ topic: (x) => x });
			const topic = pub.subscribeTopic("a");
			topic.subscribe({
				next(x) {
					acc.push(x);
				},
			});
			pub.next("a");
			assert.deepStrictEqual(acc, ["a"]);
		},
	},
	{
		maxTrials: 3,
		timeOut: TIMEOUT * 8,
	}
);
