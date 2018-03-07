import { IObjectOf } from "@thi.ng/api/api";
import { Path } from "@thi.ng/atom/api";
import { Atom } from "@thi.ng/atom/atom";
import { updateIn, setIn } from "@thi.ng/atom/path";
import { start } from "@thi.ng/hdom/start";

import { EffectDef, EventDef, FX_DISPACH_NOW, FX_STATE } from "@thi.ng/atom/api";
import { EventBus } from "@thi.ng/atom/event-bus";
import { ensureLessThan, ensureGreaterThan, trace } from "@thi.ng/atom/interceptors";

///////////////////////////////////////////////////////////////////////
// event handler definitions

const events: IObjectOf<EventDef> = {
    // generic handler to set state value at given path
    init: (state, [_, [path, val]]) => ({ [FX_STATE]: setIn(state, path, val) }),

    // these event handlers delegate to "updateVal" in same processing frame (using FX_DISPATCH_NOW)
    // note how we also inject the predicate interceptors here to ensure
    // counter values will be always be in the range between 0 .. 100
    inc: [
        ensureLessThan(100, () => console.warn("eek, reached max")),
        (_, [__, path]) => ({ [FX_DISPACH_NOW]: ["updateVal", [path, 1]] })
    ],
    dec: [
        ensureGreaterThan(0, () => console.warn("eek, reached min")),
        (_, [__, path]) => ({ [FX_DISPACH_NOW]: ["updateVal", [path, -1]] })
    ],

    // this event handler injects the trace interceptor from above
    // to log the event each time it's triggered
    updateVal: [
        trace,
        (state, [_, [path, y]]) => ({ [FX_STATE]: updateIn(state, path, (x) => x + y) })
    ],

    // this handler increments the `nextID` state value and
    // triggers "addCounter" side effect with config options for the new counter
    addCounter: (state) => ({
        [FX_DISPACH_NOW]: ["updateVal", ["nextID", 1]],
        "addCounter": {
            id: state.nextID,
            start: ~~(Math.random() * 100),
            color: ["gold", "orange", "springgreen", "yellow", "cyan"][~~(Math.random() * 5)]
        }
    }),
};

///////////////////////////////////////////////////////////////////////
// skeleton for other side effects, ignore for now

const effects: IObjectOf<EffectDef> = {

};

///////////////////////////////////////////////////////////////////////
// components

// counter component function
// calls to this function will be triggered via "addCounter" event and its side effect
// (see further below)
const counter = (bus: EventBus, path: Path, start = 0, color: string) => {
    const view = bus.state.addView(path);
    bus.dispatch(["init", [path, start]]);
    return () =>
        ["div.counter",
            { style: { background: color } },
            view.deref() || 0,
            ["div",
                ["button", { onclick: () => bus.dispatch(["dec", view.path]) }, "-"],
                ["button", { onclick: () => bus.dispatch(["inc", view.path]) }, "+"]]];
}

// our main app
const app = () => {
    // setup central state atom
    const db = new Atom({});
    // connect event bus to state and configure with above handlers/effects
    const bus = new EventBus(db, events, effects);

    // an array to store counter component instances
    const counters = [];

    // in addition to externally defined event handlers & side effects
    // each type can also be added & remove dynamically
    // here we define the "addCounter" side effect, responsible for
    // creating a new `counter()` component
    bus.addEffect("addCounter",
        ({ id, color, start }) =>
            counters.push(counter(bus, `counters.${id}`, start, color)));

    // this not just initializes the given state value
    // the changed state will also trigger re-rendering (see returned function below)
    bus.dispatch(["init", ["nextID", 0]]);

    // our actual root component function passed to hdom
    const root = () =>
        ["div",
            ["button#addcounter", { onclick: () => bus.dispatch(["addCounter"]) }, "add counter"],
            ["div.buttons", ...counters],
            ["pre", JSON.stringify(db.deref(), null, 2)]];

    return () => {
        // here we do an optional fail fast check, a useful & energy saving
        // approach for apps, which purely rely on the central app state.
        // this example app is such a case and we can check if there were
        // any events processed which caused a state change and only
        // return the root component then (i.e. `processQueue()` returned `true`)

        // if there were no changes, we simply return nothing.
        // hdom interprets this as a skipped frame (and does nothing until this
        // function is called again during the next frame update cycle...)
        if (bus.processQueue()) {
            return root;
        }
    }
};

// kick off hdom render loop
start("app", app());
