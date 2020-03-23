import { AtomPath, defAtom, defView } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";
import type { Nullable } from "@thi.ng/api";

interface State {
    state: string;
    error?: string;
    user: {
        name?: string;
    };
}

// central immutable app state
const db = defAtom<State>({ state: "login", user: {} });

// define views for different state values
const appState = defView(db, ["state"]);
const error = defView(db, ["error"]);
// specify a view transformer for the username value
const user = defView(db, ["user", "name"], (x) =>
    x ? x.charAt(0).toUpperCase() + x.substr(1) : null
);

// state update functions
const setValue = (path: AtomPath, val: any) => db.resetInUnsafe(path, val);
const setState = (s: string) => setValue(appState.path, s);
const setError = (err: Nullable<string>) => setValue(error.path, err);
const setUser = (e: Event) => setValue(user.path, (<any>e.target).value);
const loginUser = () => {
    if (user.deref() && user.deref()!.toLowerCase() === "admin") {
        setError(null);
        setState("main");
    } else {
        setError("sorry, wrong username (try 'admin')");
    }
};
const logoutUser = () => {
    setValue(user.path, null);
    setState("logout");
};

// components for different app states
// note how the value views are used here
const uiViews: any = {
    // dummy login form
    login: () => [
        "div#login",
        ["h1", "Login"],
        error.deref() ? ["div.error", error] : undefined,
        ["input", { type: "text", onchange: setUser }],
        ["button", { onclick: loginUser }, "Login"],
    ],
    logout: () => [
        "div#logout",
        ["h1", "Good bye"],
        "You've been logged out. ",
        ["a", { href: "#", onclick: () => setState("login") }, "Log back in?"],
    ],
    main: () => [
        "div#main",
        ["h1", `Welcome, ${user.deref()}!`],
        ["div", "Current app state:"],
        [
            "div",
            [
                "textarea",
                { cols: 40, rows: 10 },
                JSON.stringify(db.deref(), null, 2),
            ],
        ],
        ["button", { onclick: logoutUser }, "Logout"],
    ],
};

// finally define another derived view for the app state value
// including a transformer, which maps the current app state value
// to its correct UI component (incl. a fallback for illegal app states)
const currView = defView(
    db,
    ["state"],
    (state) =>
        uiViews[state] || ["div", ["h1", `No component for state: ${state}`]]
);

// app root component
const app = () => [
    "div",
    currView,
    ["footer", "Made with @thi.ng/atom and @thi.ng/hdom"],
];

start(app);
