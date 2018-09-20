import { Atom } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";
import { choices } from "@thi.ng/transducers";
import * as icep from "@thi.ng/interceptors";

// infinite iterator of random color choices
const colors = choices(["cyan", "yellow", "magenta", "chartreuse"]);

// central app state (initially empty)
const db = new Atom({});

// event bus w/ handlers
// see @thi.ng/interceptors for more details
const bus = new icep.EventBus(db, {
    "init": () => ({
        [icep.FX_STATE]: { clicks: 0, color: "grey" }
    }),
    "inc-counter": [
        icep.valueUpdater("clicks", (x: number) => x + 1),
        icep.dispatchNow(["randomize-color"])
    ],
    "randomize-color": icep.valueUpdater(
        "color", () => colors.next().value
    )
});

start(
    // this root component function will be executed via RAF.
    // it first processes events and then only returns an updated
    // component if there was a state update...
    (ctx) => ctx.bus.processQueue() ?
        ["button",
            {
                style: {
                    padding: "1rem",
                    background: ctx.db.value.color
                },
                onclick: () => ctx.bus.dispatch(["inc-counter"])
            },
            `clicks: ${ctx.db.value.clicks}`] :
        null,
    // hdom options incl.
    // arbitrary user context object passed to all components
    { ctx: { db, bus } }
);

// kick off
bus.dispatch(["init"]);
