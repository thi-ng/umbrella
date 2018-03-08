import { IObjectOf } from "@thi.ng/api/api";
import { EventDef, EffectDef } from "@thi.ng/atom/api";
import { FX_DISPATCH_ASYNC, FX_DISPATCH_NOW, FX_STATE } from "@thi.ng/atom/api";
import { Atom } from "@thi.ng/atom/atom";
import { EventBus } from "@thi.ng/atom/event-bus";
import { setIn } from "@thi.ng/atom/path";
import { start } from "@thi.ng/hdom/start";

const events: IObjectOf<EventDef> = {
    setStatus: (state, [_, s]) => ({ [FX_STATE]: setIn(state, "status", s) }),

    // this event is the initial trigger for starting an async IO operation
    // via the FX_DISPATCH_ASYNC side effect, which takes this general definition:
    // [fx-id, fx-arg, success-event-id, error-event-id]
    //
    // FX_DISPATCH_ASYNC acts as a wrapper for the actual side effect to be executed,
    // in this case it's the "json" side effect defined below
    // the last items in the array are the event IDs for success & error outcomes
    loadJSON: (_, [__, url]) => ({
        [FX_DISPATCH_NOW]: ["setStatus", ["idle", `loading: ${url}...`]],
        [FX_DISPATCH_ASYNC]: ["json", url, "receiveJSON", "error"]
    }),

    // this event will be triggered after JSON data has been successfully loaded
    // sets status message, `json` state value and triggers another,
    // delayed invocation of "setStatus" event to reset message after 1sec
    receiveJSON: (state, [_, json]) => ({
        [FX_STATE]: setIn(state, "json", JSON.stringify(json, null, 2)),
        [FX_DISPATCH_NOW]: ["setStatus", ["success", "JSON succesfully loaded"]],
        [FX_DISPATCH_ASYNC]: ["delay", [1000, ["idle", "done."]], "setStatus", "error"],
    }),

    // error event handler
    error: (_, [__, err]) => ({
        [FX_DISPATCH_NOW]: ["setStatus", ["error", err.message]],
    }),
};

const effects: IObjectOf<EffectDef> = {
    // these are async side effects. ALWAYS MUST RETURN A PROMISE
    json: (url) => fetch(url).then((res) => res.json()),
    delay: ([x, msg]) => new Promise((res) => setTimeout(() => res(msg), x))
};

const app = () => {
    const bus = new EventBus(new Atom<any>({}), events, effects);

    // kick off JSON request
    bus.dispatch(["loadJSON", "foo.json"]);

    // root component function
    return () => {
        if (bus.processQueue()) {
            let { json, status } = bus.state.deref();
            return ["div",
                ["p#status", { class: status[0] }, `status: ${status[1]}`],
                ["pre", json]
            ];
        }
    }
};

start("app", app());