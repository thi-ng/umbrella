import { fromInterval } from "@thi.ng/rstream/from/interval";
import { stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/stream-sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { count } from "@thi.ng/transducers/rfn/count";
import { map } from "@thi.ng/transducers/xform/map";
import { scan } from "@thi.ng/transducers/xform/scan";

// root component function
// (using Tachyons CSS classes for styling)
const app = ({ ticks, clicks }) =>
    ["div.vh-100.dt.w-100.bg-dark-pink.sans-serif",
        ["div.dtc.v-mid.tc.white.ph3.ph4-l",
            ["h1.f6.f2-m.f-subheadline-l.fw1.tc",
                `${ticks} ticks & `,
                ["a.link.white.bb.bw1",
                    { href: "#", onclick: () => clickStream.next(0) },
                    `${clicks} clicks`]],
            ["div",
                ["a.link.white",
                    { href: "https://github.com/thi-ng/umbrella/tree/master/examples/transducers-hdom/" },
                    "Source code"]]
        ]
    ];

// click stream (click counter)
const clickStream = stream().transform(scan(count(-1)));

// stream combinator
// waits until all inputs have produced at least one value,
// then updates whenever any input has changed
sync({
    // streams to synchronize
    src: {
        ticks: fromInterval(1000),
        clicks: clickStream,
    },
    // only synchronize at first (default)
    reset: false,
}).transform(
    // transform into hdom component
    map(app),
    // apply hdom tree to real DOM
    updateDOM()
);

// kick off
clickStream.next(0);
