import { isString } from "@thi.ng/checks";
import { delayed } from "@thi.ng/compose";
import { $compile, $list, $refresh } from "@thi.ng/rdom";
import {
    CloseMode,
    fromDOMEvent,
    fromInterval,
    fromIterable,
    metaStream,
    reactive,
    stream,
    sync,
} from "@thi.ng/rstream";
import { choices, map, take } from "@thi.ng/transducers";

const blur = reactive(false);
const body = stream<string>();
const date = fromInterval(1000).transform(map(() => new Date()));
const items = stream<any[]>();

const typewriter = (min: number, max: number) => (src: string) =>
    stream<string>((s) => {
        let active = true;
        (async () => {
            for (let i = 1; active && i <= src.length; i++) {
                s.next(src.substr(0, i));
                await delayed(0, Math.random() * (max - min) + min);
            }
            s.closeIn !== CloseMode.NEVER && s.done();
        })();
        return () => (active = false);
    });

const names = ["TypeScript", "@thi.ng/rdom", "toxi", "Discord"];

const typing = fromIterable(choices(names), { delay: 2000 }).subscribe(
    metaStream(typewriter(16, 100), { closeOut: CloseMode.NEVER })
);

const itemChoices = [
    date.transform(map((d) => d.toISOString())),
    body,
    typing,
    ...names,
];

const randomizeBody = () => body.next(names[~~(Math.random() * names.length)]);

const randomizeList = () =>
    items.next([...take(Math.random() * 400 + 100, choices(itemChoices))]);

const button = (onclick: EventListener, label: string) => [
    "button.mr2",
    { onclick },
    label,
];

const mpos = fromDOMEvent(window, "mousemove").transform(
    map((e) => [e.pageX, e.pageY])
);

randomizeBody();
randomizeList();

const root = $compile([
    "div.ma3.bg-dark-gray.white",
    {},
    [
        "h1.absolute.white.z1",
        {
            class: { blur },
            style: mpos.transform(
                map(([x, y]) => ({ left: x + "px", top: y + "px" }))
            ),
        },
        $refresh(
            sync<any, any>({
                src: { body, mpos },
            }),
            async (x: any) => [
                "span",
                {},
                x.body,
                ["span.ml2.light-green", {}, `[${x.mpos}]`],
            ]
        ),
    ],
    [
        "div.mv3",
        {},
        button(() => blur.next(!blur.deref()), "toggle blur"),
        button(randomizeBody, "randomize title"),
        button(randomizeList, "randomize list"),
    ],
    ["div.hot-pink", {}, date],
    ["div.pink", {}, items.transform(map((x) => `${x.length} items`))],
    $list(items, "ul.f7", { style: { "column-count": 2 } }, (x) => [
        "li",
        {
            class: isString(x) ? "light-blue" : x === typing ? "red" : "yellow",
        },
        x,
    ]),
]);

root.mount(document.getElementById("app")!);
