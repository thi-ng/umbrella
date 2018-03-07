import { Atom, EventBus, setIn, FX_DISPACH_NOW, FX_STATE } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom/start";

const FX_ASYNC = "async";

const events = {
    setStatus: (state, [_, s]) => ({ [FX_STATE]: setIn(state, "status", s) }),

    // this event is the initial trigger for starting an async IO operation
    // via the FX_ASYNC side effect, which takes this general definition:
    // [[fxid, fx-arg], success-event-id, error-event-id]
    //
    // FX_ASYNC acts as a wrapper for the actual side effect to be executed,
    // in this case it's the "json" side effect defined below
    // the last items in the array are the event IDs for success & error outcomes
    loadJSON: (_, [__, url]) => ({
        [FX_DISPACH_NOW]: ["setStatus", ["idle", `loading: ${url}...`]],
        [FX_ASYNC]: [["json", url], "receiveJSON", "error"]
    }),

    // this event will be triggered after JSON data has been successfully loaded
    receiveJSON: (state, [_, json]) => ({
        [FX_DISPACH_NOW]: ["setStatus", ["success", "JSON succesfully loaded"]],
        [FX_STATE]: setIn(state, "json", JSON.stringify(json, null, 2))
    }),

    error: (_, [__, err]) => ({
        [FX_DISPACH_NOW]: ["setStatus", ["error", err.message]],
    })
};

const effects = {
    // an async side effect ALWAYS MUST RETURN A PROMISE
    json: (url) => fetch(url).then((res) => res.json())
};

const app = () => {
    const db = new Atom<any>({});
    const bus = new EventBus(db, events, effects);

    // this is the above mentioned async effect wrapper
    // its definition should/will be moved inside the EventBus class...
    // assumes the specified async effect function returns a Promise
    bus.addEffect(FX_ASYNC, ([[id, arg], success, err]) =>
        (<any>bus.effects[id](arg))
            .then((body) => bus.dispatch([success, body]))
            .catch((e) => bus.dispatch([err, e]))
    );

    // kick off IO
    bus.dispatch(["loadJSON", "foo.json"]);

    // root component function
    return () => {
        if (bus.processQueue()) {
            let status = db.deref().status;
            return ["div",
                ["p#status", { class: status[0] }, `status: ${status[1]}`],
                ["pre",]
            ];
        }
    }
};

start("app", app());