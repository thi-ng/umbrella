import type { IObjectOf } from "@thi.ng/api";
import { start } from "@thi.ng/hdom";
import {
    EffectDef,
    EventBus,
    EventDef,
    FX_DISPATCH_ASYNC,
    FX_DISPATCH_NOW,
    valueSetter,
} from "@thi.ng/interceptors";

// best practice tip:
// define event & effect names as consts or enums and
// avoid hardcoded strings
// additionally/alternatively define dispatch functions

const EV_SET_STATUS = "set-status";
const EV_LOAD_JSON = "load-json";
const EV_RECEIVE_JSON = "receive-json";
const EV_ERROR = "error";

const FX_JSON = "load-json";
const FX_DELAY = "delay";

// event handler definitions

const events: IObjectOf<EventDef> = {
    // valueSetter() produces an interceptor to set value at given path
    [EV_SET_STATUS]: valueSetter("status"),

    // this event is the initial trigger for starting an async IO operation
    // via the FX_DISPATCH_ASYNC side effect, which takes this general definition:
    // [fx-id, fx-arg, success-event-id, error-event-id]
    //
    // FX_DISPATCH_ASYNC acts as a wrapper for the actual side effect to be executed,
    // in this case it's the "json" side effect defined below
    // the last items in the array are the event IDs for success & error outcomes
    [EV_LOAD_JSON]: (_, [__, url]) => ({
        [FX_DISPATCH_NOW]: [EV_SET_STATUS, ["idle", `loading: ${url}...`]],
        [FX_DISPATCH_ASYNC]: [FX_JSON, url, EV_RECEIVE_JSON, EV_ERROR],
    }),

    // this event will be triggered after JSON data has been successfully loaded
    // sets `json` state value, status and triggers another, delayed invocation
    // of EV_SET_STATUS event to reset message after 1sec

    // as with the EV_SET_STATUS event, we're using the higher-order valueSetter()
    // to produce an interceptor, here with additional value transformer to
    // create a formatted JSON string
    [EV_RECEIVE_JSON]: [
        valueSetter("json", (json) => JSON.stringify(json, null, 2)),
        () => ({
            [FX_DISPATCH_NOW]: [
                EV_SET_STATUS,
                ["success", "JSON successfully loaded"],
            ],
            [FX_DISPATCH_ASYNC]: [
                FX_DELAY,
                [1000, ["idle", "done."]],
                EV_SET_STATUS,
                EV_ERROR,
            ],
        }),
    ],

    // error event handler
    [EV_ERROR]: (_, [__, err]) => ({
        [FX_DISPATCH_NOW]: [EV_SET_STATUS, ["error", err.message]],
    }),
};

const effects: IObjectOf<EffectDef> = {
    // these are async side effects. ALWAYS MUST RETURN A PROMISE
    [FX_JSON]: (url) => fetch(url).then((res) => res.json()),
    [FX_DELAY]: ([x, msg]) =>
        new Promise((res) => setTimeout(() => res(msg), x)),
};

// main app component
const app = () => {
    // create event bus with empty state (null arg)
    const bus = new EventBus(null, events, effects);

    // kick off JSON request
    bus.dispatch([EV_LOAD_JSON, "foo.json"]);

    // root component function
    return () => {
        if (bus.processQueue()) {
            // the event bus' state can be obtained via `deref()`
            const { json, status } = bus.deref();
            return [
                "div",
                ["p#status", { class: status[0] }, `status: ${status[1]}`],
                ["pre", json],
            ];
        }
    };
};

start(app());
