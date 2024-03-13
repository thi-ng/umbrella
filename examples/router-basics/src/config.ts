import {
	type Event,
	EV_SET_VALUE,
	FX_DELAY,
	FX_DISPATCH_ASYNC,
	FX_DISPATCH_NOW,
	valueUpdater,
} from "@thi.ng/interceptors";
import { type AppConfig, StatusType } from "./api";
import { allUsers } from "./components/all-users";
import { contact } from "./components/contact";
import { home } from "./components/home";
import { userProfile } from "./components/user-profile";
import * as fx from "./effects";
import * as ev from "./events";
import * as routes from "./routes";

// main App configuration
export const CONFIG: AppConfig = {
	// router configuration
	// docs here:
	// https://docs.thi.ng/umbrella/router/
	router: {
		// use URI hash for routes (KISS)
		useFragment: true,
		// route ID if no other matches (MUST be non-parametric!)
		default: routes.HOME.id,
		// IMPORTANT: rules with common prefixes MUST be specified in
		// order of highest precision / longest path
		routes: [
			routes.HOME,
			routes.CONTACT,
			routes.USER_PROFILE,
			routes.USER_LIST,
		],
	},

	// event handlers events are queued and batch processed in app's RAF
	// render loop event handlers can be single functions, interceptor
	// objects with `pre`/`post` keys or arrays of either.

	// the event handlers' only task is to transform the event into a
	// number of side effects. event handlers should be pure functions
	// and only side effect functions execute any "real" work.

	// see EventBus docs here:
	// https://docs.thi.ng/umbrella/interceptors/#event-bus-interceptors-side-effects

	events: {
		// sets status to "done"
		[ev.DONE]: () => ({
			[FX_DISPATCH_NOW]: [ev.SET_STATUS, [StatusType.DONE, "done"]],
		}),

		// sets status to thrown error's message
		[ev.ERROR]: (_, [__, err]) => ({
			[FX_DISPATCH_NOW]: [ev.SET_STATUS, [StatusType.ERROR, err.message]],
		}),

		// triggers loading of JSON for single user, sets status
		[ev.LOAD_USER]: (_, [__, id]) => ({
			[FX_DISPATCH_NOW]: [
				ev.SET_STATUS,
				[StatusType.INFO, `loading user data...`],
			],
			[FX_DISPATCH_ASYNC]: [
				fx.JSON,
				`data/user-${id}.json`,
				ev.RECEIVE_USER,
				ev.LOAD_USER_ERROR,
			],
		}),

		// triggered after successful IO
		// stores received user data under `users.{id}`, sets status
		// note: we assign multiple value/events as array to the FX_DISPATCH_NOW side effect
		[ev.RECEIVE_USER]: (_, [__, json]) => ({
			[FX_DISPATCH_NOW]: [
				<Event>[EV_SET_VALUE, [["users", json.id], json]],
				<Event>[
					ev.SET_STATUS,
					[StatusType.SUCCESS, "JSON successfully loaded", true],
				],
			],
		}),

		// error event for user profile IO requests (i.e. in this demo for user ID 3)
		// set status, then redirects to /users after 1sec
		[ev.LOAD_USER_ERROR]: (_, [__, err]) => ({
			[FX_DISPATCH_NOW]: [ev.SET_STATUS, [StatusType.ERROR, err.message]],
			[FX_DISPATCH_ASYNC]: [
				FX_DELAY,
				[1000, [routes.USER_LIST.id]],
				ev.ROUTE_TO,
				ev.ERROR,
			],
		}),

		// triggers loading of JSON summary of all users, sets status
		[ev.LOAD_USER_LIST]: () => ({
			[FX_DISPATCH_NOW]: [
				ev.SET_STATUS,
				[StatusType.INFO, `loading user data...`],
			],
			[FX_DISPATCH_ASYNC]: [
				fx.JSON,
				"data/users.json",
				ev.RECEIVE_USERS,
				ev.ERROR,
			],
		}),

		// triggered after successful IO
		// note: we assign multiple value/events as array to the FX_DISPATCH_NOW side effect
		[ev.RECEIVE_USERS]: (_, [__, json]) => ({
			[FX_DISPATCH_NOW]: [
				<Event>[EV_SET_VALUE, ["userlist", json]],
				<Event>[
					ev.SET_STATUS,
					[StatusType.SUCCESS, "JSON successfully loaded", true],
				],
			],
		}),

		// stores status (a tuple of `[type, message, done?]`) in app state
		// if status type != DONE & `done` == true, also triggers delayed EV_DONE
		// Note: we inject the `trace` interceptor to log the event to the console
		[ev.SET_STATUS]: (_, [__, status]) => ({
			[FX_DISPATCH_NOW]: [EV_SET_VALUE, ["status", status]],
			[FX_DISPATCH_ASYNC]:
				status[0] !== StatusType.DONE && status[2]
					? [FX_DELAY, [1000], ev.DONE, ev.ERROR]
					: undefined,
		}),

		// toggles debug state flag on/off
		[ev.TOGGLE_DEBUG]: valueUpdater<number>("debug", (x) => x ^ 1),
	},

	// side effects
	effects: {
		// generic JSON loader via fetch()
		[fx.JSON]: (req) =>
			fetch(req).then((resp) => {
				if (!resp.ok) {
					throw new Error(resp.statusText);
				}
				return resp.json();
			}),
	},

	// mapping route IDs to their respective UI component functions
	// those functions are called automatically by the app's root component
	// base on the currently active route
	components: {
		[routes.HOME.id]: home,
		[routes.CONTACT.id]: contact,
		[routes.USER_LIST.id]: allUsers,
		[routes.USER_PROFILE.id]: userProfile,
	},

	// DOM root element (or ID)
	domRoot: "app",

	// initial app state
	initialState: {
		status: [StatusType.INFO, "running"],
		users: {},
		userlist: [],
		route: {},
		debug: 1,
	},

	// derived view declarations
	// each key specifies the name of the view and its value
	// the state path or `[path, transformer]`
	// docs here:
	// https://github.com/thi-ng/umbrella/tree/develop/packages/atom#derived-views
	views: {
		json: ["", (state) => JSON.stringify(state, null, 2)],
		users: ["users", (users) => users || {}],
		userlist: "userlist",
		status: "status",
		debug: "debug",
	},

	// component CSS class config using tachyons-css
	// these attribs are being passed to all/most components
	// with a bit more thought this can still be simplified a lot more
	// and repetitions minimized...

	// looks at first somewhat cryptic, but it's a great/powerful system
	// http://tachyons.io/
	ui: {
		bodyCopy: {
			class: "center measure-narrow measure-ns tc lh-copy black-70",
		},
		bodyLink: { class: "link dim black" },
		card: {
			container: {
				class: "mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 tc",
			},
			thumb: { class: "br-100 h3 w3 dib" },
			title: { class: "ma1" },
			sep: { class: "mt3 mw3 bb bw1 b--black-10" },
			body: { class: "lh-copy measure center f6 black-70" },
		},
		code: { class: "ma0 ml4 pa2 f7 bg-light-gray code overflow-x-hidden" },
		column: {
			content: [{ class: "w-90-ns ma2" }, { class: "w-50-ns ma2" }],
			debug: [
				{ class: "w-10-ns ma2 close" },
				{ class: "w-50-ns ma2 open" },
			],
		},
		contact: {
			link: { class: "db pb2 link dim black" },
		},
		debugToggle: { class: "toggle pointer" },
		nav: {
			inner: { class: "tc pb3" },
			title: { class: "black f1 lh-title tc db mb2 mb2-ns" },
			link: { class: "pointer link dim gray f6 f5-ns dib mr3" },
			linkLast: { class: "pointer link dim gray f6 f5-ns dib" },
		},
		root: { class: "flex-ns sans-serif ma0" },
		status: {
			[StatusType.DONE]: {
				class: "pa2 bg-light-yellow gold tc fadeout bg-animate",
			},
			[StatusType.INFO]: {
				class: "pa2 bg-light-yellow gold tc bg-animate",
			},
			[StatusType.SUCCESS]: {
				class: "pa2 bg-light-green green tc bg-animate",
			},
			[StatusType.ERROR]: {
				class: "pa2 bg-light-red dark-red tc bg-animate",
			},
		},
		userlist: {
			root: { class: "measure center" },
			container: { class: "dt w-100 bb b--black-05 pb2 mt2" },
			thumbWrapper: { class: "dtc w2 w3-ns v-mid" },
			thumb: { class: "ba b--black-10 db br-100 w2 w3-ns h2 h3-ns" },
			body: { class: "dtc v-mid pl3" },
			title: { class: "pointer f6 f5-ns fw6 lh-title black mv0" },
			subtitle: { class: "f6 fw4 mt0 mb0 black-60" },
			meta: { class: "dtc tr v-mid black-60 f7" },
		},
	},
};
