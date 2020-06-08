import {
    comp,
    filter,
    map,
    mapcat,
    partition,
    take,
} from "@thi.ng/transducers";
import * as assert from "assert";
import { fromIterable, Stream } from "../src/index";

describe("transducers", () => {
    let src: Stream<number>;
    let data = [10, 20, 30];

    let check = (expected: any, done: Function) => {
        let buf: any[] = [];
        return {
            next(x: any) {
                buf.push(x);
            },
            done() {
                assert.deepEqual(buf, expected);
                done();
            },
        };
    };

    beforeEach(() => {
        src = fromIterable(data);
    });

    it("works chained", (done) => {
        src.subscribe(map((x: number) => x * 10))
            .subscribe(map((x: number) => x + 1))
            .subscribe(check([101, 201, 301], done));
    });

    it("works combined", (done) => {
        src.subscribe(
            check([101, 201, 301], done),
            comp(
                map((x: number) => x * 10),
                map((x: number) => x + 1)
            )
        );
    });

    it("does early termination", (done) => {
        src.subscribe(check([data[0], data[1]], done), take(2));
    });

    it("emits multiple values", (done) => {
        src.subscribe(
            check([10, 10, 20], done),
            comp(
                mapcat((x) => [x, x]),
                take(3)
            )
        );
    });

    it("filters values", (done) => {
        src.subscribe(
            check([10, 30], done),
            filter((x: number) => x % 20 > 0)
        );
    });

    it("emits remaining", (done) => {
        src.subscribe(check([[10, 20], [30]], done), partition(2, true));
    });
});
