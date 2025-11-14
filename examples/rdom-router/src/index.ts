// SPDX-License-Identifier: Apache-2.0
import { defAtom } from "@thi.ng/atom";
import { exposeGlobal } from "@thi.ng/expose";
import { anchor, button, div, h1, img, main, nav } from "@thi.ng/hiccup-html";
import { ConsoleLogger, ROOT } from "@thi.ng/logger";
import { pickRandom } from "@thi.ng/random";
import { $compile, $list, $switch } from "@thi.ng/rdom";
import {
	EVENT_ROUTE_CHANGED,
	EVENT_ROUTE_FAILED,
	HTMLRouter,
	type Route,
	type RouteMatch,
} from "@thi.ng/router";
import { fromView } from "@thi.ng/rstream";
import IMG1 from "./img1.jpg?url";
import IMG2 from "./img2.jpg?url";
import IMG3 from "./img3.jpg?url";
import IMG4 from "./img4.jpg?url";

// type decl for app state structure
interface AppState {
	route: RouteMatch;
	images: string[];
}

// route definitions for router
const ROUTES: Route[] = [
	{ id: "home", match: "/home" },
	{ id: "gallery", match: "/gallery" },
	// parametric route with param coercion & validation
	{
		id: "image",
		match: "gallery/?id",
		validate: {
			id: {
				coerce: (x) => parseInt(x),
				check: (x) => x >= 0 && x < IMAGES.length,
			},
		},
	},
	// fallback route
	{ id: "missing", match: "/404" },
];

// list of image URLs
const IMAGES = [IMG1, IMG2, IMG3, IMG4];

// redirect all thi.ng logging to console
ROOT.set(new ConsoleLogger());

// define initial app state (see thi.ng/atom)
const db = defAtom<AppState>({
	route: { id: "home" },
	images: IMAGES,
});

// define & initialize router w/ basic config (see thi.ng/router)
const router = new HTMLRouter({
	routes: ROUTES,
	initial: "home",
	default: "missing",
	useFragment: true,
});

// the router will emit an event each time the route has changed
// we'll store the new route in the atom, which then will trigger an UI update
router.addListener(EVENT_ROUTE_CHANGED, (e) => db.resetIn(["route"], e.value));

// optional event listener for failed/unknown routes
// (these routes will be redirected to configured default route)
router.addListener(EVENT_ROUTE_FAILED, console.log);

// start the router
router.start();

// simple shared component wrapper
const container = (title: string, ...body: any[]) =>
	main({}, h1({}, title), ...body);

// homepage component, i.e. the main component for the `home` route
const home = async (route: RouteMatch) =>
	container(
		"Welcome",
		div({}, "A truly exciting home page... maybe try the gallery :)")
	);

// gallery component, i.e. the main component for the `gallery` route
const gallery = async (route: RouteMatch) =>
	container(
		"Gallery",
		div({}, "Click on images to enlarge..."),
		// create a list of thumbnails of the app state's image array
		$list(fromView(db, { path: ["images"] }), "div#gallery", {}, thumbnail),
		// add some dummy controls to allow user to add new items or clear the
		// array of images. the event handlers only update the atom, but the
		// above `$list()` component will be informed and update accordingly...
		div(
			"#controls",
			{},
			button(
				{
					onclick: () =>
						db.swapIn(["images"], (img) => [
							...img,
							pickRandom(IMAGES),
						]),
				},
				"add"
			),
			button({ onclick: () => db.resetIn(["images"], []) }, "clear")
		)
	);

// thumbnail component for above gallery
const thumbnail = (src: string) =>
	anchor(
		{ href: router.format("image", { id: IMAGES.indexOf(src) }) },
		img(".thumb", { src })
	);

// single image root component, i.e. the main component for the `image` route
const image = async ({ params: { id } }: RouteMatch) =>
	container("Single image", img(".fullsize", { src: IMAGES[id] }));

const missing = async () => container("404", "Route doesn't exist...");

// compile & mount main UI/DOM
$compile(
	div(
		{},
		nav(
			{},
			// build SPA navigation links using the router's format() feature to form URLs
			...["home", "gallery"].map((id) =>
				anchor({ href: router.format(id) }, id)
			),
			// unknown route (will trigger configured fallback/default route)
			anchor({ href: "#/foo" }, "todo")
		),
		// helper component to dynamically switch out its body based on given
		// reactive subscription value (here the app state's `route` info)
		$switch(
			// reactive value
			fromView(db, { path: ["route"] }),
			// key function to extract the actual dispatch/switch value
			(route) => route.id,
			// an object mapping keys to component functions. e.g. if the new
			// route ID is `gallery`, then the `gallery()` function defined
			// above will be called and its result used as new body of the
			// $switch() component. before that, the current component body will
			// be unmounted first....
			{
				home,
				gallery,
				image,
				missing,
			}
		)
	)
).mount(document.getElementById("app")!);

// debug only: expose app state atom in browser console
exposeGlobal("db", db);
