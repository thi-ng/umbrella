import { group } from "@thi.ng/testament";
import {
    comp,
    filter,
    map,
    mapcat,
    partition,
    take,
} from "@thi.ng/transducers";
import * as assert from "assert";
import { fromIterable, ISubscriber, Stream } from "../src/index.js"

let src: Stream<number>;
let data = [10, 20, 30];

let check = (expected: any, done: Function) => {
    let buf: any[] = [];
    return <ISubscriber<any>>{
        next(x: any) {
            buf.push(x);
        },
        done() {
            assert.deepStrictEqual(buf, expected);
            done();
        },
    };
};

group(
    "transducers",
    {
        "works chained": ({ done }) => {
            src.transform(map((x) => x * 10))
                .transform(map((x) => x + 1))
                .subscribe(check([101, 201, 301], done));
        },

        "works combined": ({ done }) => {
            src.subscribe(check([101, 201, 301], done), {
                xform: comp(
                    map((x: number) => x * 10),
                    map((x: number) => x + 1)
                ),
            });
        },

        "does early termination": ({ done }) => {
            src.subscribe(check([data[0], data[1]], done), { xform: take(2) });
        },

        "emits multiple values": ({ done }) => {
            src.subscribe(check([10, 10, 20], done), {
                xform: comp(
                    mapcat((x) => [x, x]),
                    take(3)
                ),
            });
        },

        "filters values": ({ done }) => {
            src.subscribe(check([10, 30], done), {
                xform: filter((x: number) => x % 20 > 0),
            });
        },

        "emits remaining": ({ done }) => {
            src.subscribe(check([[10, 20], [30]], done), {
                xform: partition(2, true),
            });
        },
    },
    {
        beforeEach: () => {
            src = fromIterable(data);
        },
    }
);
