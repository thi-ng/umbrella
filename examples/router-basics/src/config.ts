import { FX_STATE, FX_DISPATCH_ASYNC, FX_DISPATCH_NOW } from "@thi.ng/atom/api";
import { valueSetter } from "@thi.ng/atom/interceptors";
import { setIn } from "@thi.ng/atom/path";
import { Route, EVENT_ROUTE_CHANGED } from "@thi.ng/router/api";

import { AppConfig } from "./api";

import { home } from "./components/home";
import { userList } from "./components/user-list";
import { userProfile } from "./components/user-profile";

// route definitions:
// the `match` arrays specify the individual route elements

export const ROUTE_HOME: Route = {
    id: "home",
    match: ["home"]
};

// this is a parametric route w/ parameter coercion & validation
// if validation fails, the route will not be matched

export const ROUTE_USER_PROFILE: Route = {
    id: "user-profile",
    match: ["users", "?id"],
    validate: {
        id: {
            coerce: (x) => parseInt(x),
            check: (x) => x > 0 && x < 100
        }
    }
};

export const ROUTE_USER_LIST: Route = {
    id: "user-list",
    match: ["users"],
};

// best practice tip: define event & effect names as consts or enums
// and avoid hardcoded strings

export const EV_DONE = "done";
export const EV_ERROR = "error";
export const EV_LOAD_USER = "load-user";
export const EV_RECEIVE_USER = "receive-user";
export const EV_SET_STATUS = "set-status";

const FX_JSON = "load-json";
const FX_DELAY = "delay";

// main App configuration

export const CONFIG: AppConfig = {
    // router configuration
    router: {
        // use URI hash for routes (KISS)
        useFragment: true,
        // route ID if no other matches (MUST be non-parametric!)
        defaultRouteID: ROUTE_HOME.id,
        // IMPORTANT: rules with common prefixes MUST be specified in
        // order of highest precision / longest path
        routes: [
            ROUTE_HOME,
            ROUTE_USER_PROFILE,
            ROUTE_USER_LIST,
        ]
    },

    // event handlers
    events: {
        [EV_DONE]: () => ({
            [FX_DISPATCH_NOW]: [EV_SET_STATUS, ["idle", "done."]]
        }),

        [EV_ERROR]: (_, [__, err]) => ({
            [FX_DISPATCH_NOW]: [EV_SET_STATUS, ["error", err.message]],
            [FX_DISPATCH_ASYNC]: [FX_DELAY, [1000], EV_DONE, EV_ERROR],
        }),

        [EV_LOAD_USER]: (_, [__, id]) => ({
            [FX_DISPATCH_NOW]: [EV_SET_STATUS, ["idle", `loading user data...`]],
            [FX_DISPATCH_ASYNC]: [FX_JSON, `user-${id}.json`, EV_RECEIVE_USER, EV_ERROR]
        }),

        [EV_RECEIVE_USER]: (state, [__, json]) => ({
            [FX_STATE]: setIn(state, ["users", json.id], json),
            [FX_DISPATCH_NOW]: [EV_SET_STATUS, ["success", "JSON succesfully loaded"]],
            [FX_DISPATCH_ASYNC]: [FX_DELAY, [1000], EV_DONE, EV_ERROR],
        }),

        [EVENT_ROUTE_CHANGED]: valueSetter("route"),

        [EV_SET_STATUS]: valueSetter("status"),
    },

    // side effects
    effects: {
        [FX_JSON]: (url) =>
            fetch(url).then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }),
        [FX_DELAY]: ([x, body]) => new Promise((res) => setTimeout(() => res(body), x))
    },

    // mapping route IDs to their respective UI component functions
    // those functions are called with the app instance as sole argument
    components: {
        [ROUTE_HOME.id]: home,
        [ROUTE_USER_LIST.id]: userList,
        [ROUTE_USER_PROFILE.id]: userProfile,
    },

    // derived view declarations
    // each key specifies the name of the view and its value
    // the state path or `[path, transformer]`
    views: {
        jsonState: ["", (state) => ["pre", UI.code, "// App state:\n\n", JSON.stringify(state, null, 2)]],
        status: "status",
        users: ["users", (users) => users || {}],
    },

    // DOM root element (or ID)
    domRoot: "app"
};

// tachyons.css class presets for skinning different UI elements
// see usage in `/view/*.ts` files...
export const UI = {
    root: { class: "measure pa2 system-sans-serif " },
    button: { class: "pa2 bn bg-navy white link" },
    code: { class: "pa2 bg-moon-gray code f7" },
    subtitle: { class: "f5 normal moon-gray" },
    status: {
        idle: { class: "pa2 bg-light-yellow" },
        success: { class: "pa2 bg-light-green" },
        error: { class: "pa2 bg-light-red" },
    }
};
