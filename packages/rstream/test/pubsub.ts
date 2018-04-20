import * as tx from "@thi.ng/transducers";
import * as assert from "assert";

import * as rs from "../src/index";

describe("PubSub", () => {
    let pub: rs.PubSub<any, any>;

    it("simple", () => {
        const acc = { a: [], b: [] };
        const collect = { next: (x) => acc[x].push(x) };
        pub = rs.pubsub({ topic: (x) => x });
        pub.subscribeTopic("a", collect);
        pub.subscribeTopic("b", collect);
        rs.fromIterableSync("abcbd").subscribe(pub);
        assert.deepEqual(acc, { a: ["a"], b: ["b", "b"] });
        assert.equal(pub.getState(), rs.State.DONE);
    });

    it("transducer", () => {
        const acc = { a: [], b: [], c: [], d: [] };
        const collect = { next: (x) => acc[x[0]].push(x) };
        pub = rs.pubsub({
            topic: (x) => x[0],
            xform: tx.mapIndexed<string, [string, number]>((i, x) => [x, i])
        });
        pub.subscribeTopic("a", collect);
        pub.subscribeTopic("b", collect);
        rs.fromIterableSync("abcbd").subscribe(pub);
        assert.deepEqual(acc, { a: [["a", 0]], b: [["b", 1], ["b", 3]], c: [], d: [] });
        assert.equal(pub.getState(), rs.State.DONE);
    });

    it("unsubTopic", (done) => {
        const acc = { a: [], b: [] };
        const collect = { next: (x) => acc[x].push(x) };
        pub = rs.pubsub({ topic: (x) => x });
        pub.subscribeTopic("a", collect);
        const b = pub.subscribeTopic("b", collect);
        rs.fromIterable("abcbd", 5).subscribe(pub);
        setTimeout(() => pub.unsubscribeTopic("b", b), 15);
        setTimeout(() => {
            assert.deepEqual(acc, { a: ["a"], b: ["b"] });
            assert.equal(pub.getState(), rs.State.DONE);
            done();
        }, 40);
    });
});