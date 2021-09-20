import { downloadWithMime } from "@thi.ng/dl-asset/raw";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { fromIterable } from "@thi.ng/rstream/iterable";
import { metaStream } from "@thi.ng/rstream/metastream";
import { fromRAF } from "@thi.ng/rstream/raf";
import { sidechainToggle } from "@thi.ng/rstream/sidechain-toggle";
import { reactive } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/sync";
import { bits } from "@thi.ng/transducers-binary/bits";
import { randomBits } from "@thi.ng/transducers-binary/random-bits";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { comp } from "@thi.ng/transducers/comp";
import { buildKernel1d, convolve1d } from "@thi.ng/transducers/convolve";
import { filter } from "@thi.ng/transducers/filter";
import { flatten } from "@thi.ng/transducers/flatten";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { lookup1d } from "@thi.ng/transducers/lookup";
import { map } from "@thi.ng/transducers/map";
import { range } from "@thi.ng/transducers/range";
import { range2d } from "@thi.ng/transducers/range2d";
import { reducer } from "@thi.ng/transducers/reduce";
import { scan } from "@thi.ng/transducers/scan";
import { slidingWindow } from "@thi.ng/transducers/sliding-window";
import { str } from "@thi.ng/transducers/str";
import { transduce } from "@thi.ng/transducers/transduce";
import { zip } from "@thi.ng/transducers/zip";

const WIDTH = 160;
const HEIGHT = 32;

const resetCA = () => [...randomBits(0.25, WIDTH)];

const evolveCA = (src: number[], { kernel, rule, reset }: any) =>
    reset
        ? resetCA()
        : [
              ...iterator1(
                  comp(
                      convolve1d({
                          src,
                          kernel,
                          width: src.length,
                          wrap: true,
                      }),
                      map(lookup1d(<number[]>rule))
                  ),
                  range(src.length)
              ),
          ];

const triggerReset = () =>
    wolfram.add(fromIterable([true, false], { delay: 16 }), "reset");

const triggerOBJExport = () => objExport.next(1);

const setRule = (e: Event) => {
    rule.next(parseInt((<HTMLInputElement>e.target).value));
    triggerReset();
};

const setKernel = (e: Event) =>
    kernel.next(parseInt((<HTMLInputElement>e.target).value));

const app = ({ id, ksize, sim }: any) => [
    "div.sans-serif.ma3",
    [
        "div",
        "Rule:",
        [
            "input.w4.h2.mh3.pa2",
            {
                type: "number",
                value: id,
                oninput: setRule,
            },
        ],
        "Kernel:",
        [
            dropdown,
            { class: "h2 pa2 mh3", onchange: setKernel },
            [
                [3, "3"],
                [5, "5"],
            ],
            ksize,
        ],
        [
            "button.mr3.pa2",
            {
                onclick: triggerReset,
            },
            "Reset",
        ],
        [
            "button.mr3.pa2",
            {
                onclick: triggerOBJExport,
            },
            "Export OBJ",
        ],
        [
            "a.link.blue",
            {
                href: "https://en.wikipedia.org/wiki/Elementary_cellular_automaton#Random_initial_state",
            },
            "Wikipedia",
        ],
    ],
    ["pre.f7.code", sim],
];

const rule = reactive(105);
const kernel = reactive(3);
const objExport = metaStream<any, boolean>(() =>
    fromIterable([true, false], { delay: 17 })
);

const wolfram = sync<any, any>({
    src: {
        rule: rule.transform(map((x) => [...bits(32, false, [x])])),
        kernel: kernel.transform(
            map((x) => buildKernel1d([1, 2, 4, 8, 16], x))
        ),
        _: fromRAF(),
    },
    xform: scan(reducer<number[], any>(resetCA, evolveCA)),
});

sync({
    src: {
        id: rule,
        ksize: kernel,
        sim: wolfram.transform(
            map((gen) => gen.map((x: number) => " █"[x]).join("")),
            slidingWindow(HEIGHT),
            map((win: string[]) => win.join("\n"))
        ),
    },
}).transform(map(app), updateDOM());

// Wavefront OBJ 3D pointcloud export
// attached as second subscription to wolfram stream
// uses `objExport` metastream as toggle switch to produce OBJ file
// and trigger download
wolfram
    // always collect new generations
    // history length same as WIDTH to export square area
    .transform(slidingWindow(WIDTH))
    // sidechainToggle is only letting new values through if enabled by
    // objExport stream
    .subscribe(sidechainToggle<any, boolean>(objExport, { initial: false }))
    // actual OBJ conversion & export
    .transform(
        map((grid) =>
            transduce(
                comp(
                    filter((t) => !!t[1]),
                    map(([[x, y]]) => `v ${x} ${y} 0`)
                ),
                str("\n"),
                zip(range2d(WIDTH, WIDTH), flatten<number[]>(grid))
            )
        ),
        map((obj: string) =>
            downloadWithMime(`ca-${rule.deref()}.obj`, obj, {
                mime: "model/obj",
            })
        )
    );
