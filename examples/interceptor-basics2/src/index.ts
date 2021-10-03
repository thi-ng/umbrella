import type { IObjectOf, Path } from "@thi.ng/api";
import { defView, defViewUnsafe } from "@thi.ng/atom/view";
import { start } from "@thi.ng/hdom/start";
import {
    EffectDef,
    ensureStateGreaterThan,
    ensureStateLessThan,
    Event,
    EventBus,
    EventDef,
    EV_SET_VALUE,
    EV_UPDATE_VALUE,
    FX_DISPATCH_NOW,
    IDispatch,
    trace,
} from "@thi.ng/interceptors";

///////////////////////////////////////////////////////////////////////
// event name and handler definitions

// best practice tip:
// define event & effect names as consts or enums and
// avoid hardcoded strings for easier refactoring
// additionally/alternatively define dispatch functions
const EV_INC = "inc-counter";
const EV_DEC = "dec-counter";
const EV_ADD_COUNTER = "add-counter";
const EV_ADD_VALUE = "add-value";

const FX_ADD_COUNTER = "add-counter";

const events: IObjectOf<EventDef> = {
    // these event handlers delegate to "updateVal" in same
    // processing frame (using FX_DISPATCH_NOW)
    // note how we also inject the predicate interceptors here to ensure
    // counter values will be always be in the range between 0 .. 100
    [EV_INC]: [
        ensureStateLessThan(100, undefined, () =>
            console.warn("eek, reached max")
        ),
        (_, [__, path]) => ({ [FX_DISPATCH_NOW]: [EV_ADD_VALUE, [path, 1]] }),
    ],
    [EV_DEC]: [
        ensureStateGreaterThan(0, undefined, () =>
            console.warn("eek, reached min")
        ),
        (_, [__, path]) => ({ [FX_DISPATCH_NOW]: [EV_ADD_VALUE, [path, -1]] }),
    ],

    // similar to the EV_INIT handler above, here we just delegate to the
    // the built-in EV_UPDATE_VALUE handler to update a given path value.
    // Additionally, we inject the `trace` interceptor to log the event
    // each time it's triggered
    [EV_ADD_VALUE]: [
        trace,
        (_, [__, [path, y]]) => ({
            [FX_DISPATCH_NOW]: [EV_UPDATE_VALUE, [path, (x: number) => x + y]],
        }),
    ],

    // this handler increments the `nextID` state value and
    // triggers FX_ADD_COUNTER side effect with config options for the new counter
    [EV_ADD_COUNTER]: (state) => ({
        [FX_DISPATCH_NOW]: [EV_ADD_VALUE, ["nextID", 1]],
        // the FX_ADD_COUNTER side effect is defined further below
        // here we simply prepare some configuration data for the new counter
        [FX_ADD_COUNTER]: {
            id: state.nextID,
            start: ~~(Math.random() * 100),
            color: ["gold", "orange", "springgreen", "yellow", "cyan"][
                ~~(Math.random() * 5)
            ],
        },
    }),
};

///////////////////////////////////////////////////////////////////////
// skeleton for other side effects, ignore for now

const effects: IObjectOf<EffectDef> = {};

///////////////////////////////////////////////////////////////////////
// components

const button = (bus: IDispatch, event: Event, label: string, id?: string) => [
    "button",
    { id, onclick: () => bus.dispatch(event) },
    label,
];

// counter component function
// calls to this function will be triggered via the "addCounter" event and its side effect
// (see further below)
const counter = (bus: IDispatch, path: Path, start = 0, color: string) => {
    const view = defViewUnsafe(bus.state, path);
    bus.dispatch([EV_SET_VALUE, [path, start]]);
    return [
        "div.counter",
        { style: { background: color } },
        () => view.deref() || 0,
        [
            "div",
            button(bus, [EV_DEC, view.path], "-"),
            button(bus, [EV_INC, view.path], "+"),
        ],
    ];
};

// main app
const app = () => {
    // an array to store counter component instances
    // (only using component local state for KISS reasons)
    const counters: any[] = [];

    // create event bus with app state atom and configure with above handlers/effects
    const bus = new EventBus(null, events, effects);

    // in addition to externally defined event handlers & side effects
    // each type can also be added & remove dynamically
    // here we define the FX_ADD_COUNTER side effect, responsible for
    // creating a new `counter()` component
    bus.addEffect(FX_ADD_COUNTER, ({ id, color, start }, bus) =>
        counters.push(counter(bus, ["counters", id], start, color))
    );

    // add derived view subscription for updating JSON state trace
    // (only executed when state changes)
    const json = defView(bus.state, [], (state) =>
        JSON.stringify(state, null, 2)
    );

    // this not just initializes the given state value
    // the changed state will also trigger the 1st DOM rendering (see returned function below)
    bus.dispatch([EV_SET_VALUE, ["nextID", 0]]);

    // our actual root component function passed to hdom
    const root = () => [
        "div",
        button(bus, [EV_ADD_COUNTER], "add counter", "addcounter"),
        ["div", ...counters],
        ["pre", json],
    ];

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
    };
};

// kick off hdom render loop
start(app());
