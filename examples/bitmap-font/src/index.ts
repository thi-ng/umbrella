import type { IObjectOf } from "@thi.ng/api";
import { dropdown } from "@thi.ng/hdom-components";
import { clamp } from "@thi.ng/math";
import { reactive, Stream, Subscription, sync } from "@thi.ng/rstream";
import {
    comp,
    map,
    multiplex,
    partition,
    pluck,
    range,
    str,
    transduce,
    zip,
} from "@thi.ng/transducers";
import { bits } from "@thi.ng/transducers-binary";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { FONT } from "./font";

const emitOnStream = (stream: Subscription<any, any>) => (e: Event) =>
    stream.next((<HTMLSelectElement>e.target).value);

// retrieve font bytes for given char
const lookupChar = (c: string) =>
    FONT[clamp(c.charCodeAt(0) - 32, 0, FONT.length - 1)];

// re-usable transducer
const xfJoin = map((x: string[]) => x.join(""));

// higher order transducer to transform single char from string
const xfChar = (i: number, on: string, off: string) =>
    comp(
        // use byte `i` lane from current row
        pluck<number[], number>(i),
        // split into bits
        bits(8),
        // transform each bit
        map((x) => (x ? on : off)),
        // re-group
        partition(8),
        // build string
        xfJoin
    );

// transform entire string
const banner = ({ input, on, off }: IObjectOf<string>) =>
    transduce(
        comp(
            // dynamically create `xfChar` transducers for each char
            // and run them in parallel via `multiplex()`
            multiplex.apply(null, [
                ...map((i) => xfChar(i, on, off), range(input.length)),
            ]),
            // then join the results for each line
            xfJoin
        ),
        // use `str()` reducer to build string result
        str("\n"),
        // convert input string into stream of row-major bitmap font tuples
        zip.apply(null, [...map(lookupChar, input || " ")])
    );

// dropdown menu for on/off bits
const charSelector = (stream: Stream<string>) => [
    dropdown,
    {
        class: "ml3",
        onchange: emitOnStream(stream),
    },
    [
        ["#", "#"],
        ["@", "@"],
        ["*", "*"],
        ["X", "X"],
        ["/", "/"],
        ["=", "="],
        ["-", "-"],
        ["^", "^"],
        [".", "."],
        [" ", "space"],
    ],
    stream.deref(),
];

// main UI root component
const app = ({ raw, result }: any) => [
    "div",
    [
        "div",
        [
            "input",
            {
                oninput: emitOnStream(input),
                value: raw,
            },
        ],
        charSelector(on),
        charSelector(off),
    ],
    ["pre.code.w-100.pa2.overflow-x-auto.bg-washed-yellow", result],
];

// reactive stream setup
const input = reactive("8BIT POWER!");
const on = reactive("/");
const off = reactive(" ");

// transforming stream combinator
const xformer = sync({ src: { input, on, off } }).transform(map(banner));

const main = sync({ src: { raw: input, result: xformer } });
main.transform(map(app), updateDOM());

// input.next(transduce(map((x: number) => String.fromCharCode(x)), str(), range(32, 127)));

// HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => main.done());
}
