import type { Nullable, Path } from "@thi.ng/api";
import { defAtom } from "@thi.ng/atom/atom";
import { defView } from "@thi.ng/atom/view";
import { exposeGlobal } from "@thi.ng/expose";
import { start } from "@thi.ng/hdom/start";
import { capitalize } from "@thi.ng/strings/case";

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

// the error view converts the state value into a UI component array
const error = defView(db, ["error"], (error) =>
	error ? ["div.error", error] : null
);

// view transformer for the username value
const user = defView(db, ["user", "name"], (name) =>
	name ? capitalize(name) : null
);

// state update functions

// trigger new route / UI view
const setState = (s: string) => setValue(appState.path, s);

const setError = (err: Nullable<string>) => setValue(error.path, err);

const setUser = (e: Event) => setValue(user.path, (<any>e.target).value);

const setValue = (path: Path, val: any) => db.resetInUnsafe(path, val);

const loginUser = () => {
	if (user.deref() === "Admin") {
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

// UI components for different app states
// note how the value views are used here
const uiViews: any = {
	// dummy login form
	login: () => [
		"div#login",
		["h1", "Login"],
		// embedded error view (will auto-deref)
		error.deref(),
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
// embedded view (will auto-deref)
start(() => ["div", currView]);

exposeGlobal("db", db);
