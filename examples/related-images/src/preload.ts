import { fiber, untilPromise } from "@thi.ng/fibers";
import { div } from "@thi.ng/hiccup-html";
import { imageFromURL } from "@thi.ng/pixel";
import { $replace } from "@thi.ng/rdom";
import { reactive, stream } from "@thi.ng/rstream";
import { percent } from "@thi.ng/strings";
import { DB, initDB } from "./data.js";
import { APP_STATE } from "./state.js";

// component function for the `preload` app state
export const preload = async () => {
	const progress = reactive(0);
	const error = stream<string>();
	// preload & analyze images in a fiber/co-routine. see https://thi.ng/fibers
	// readme for details... this function will continue to run even after
	// init() returned and is also used to update the reactive progress value
	// (to which the returned UI component subscribes to, see further below...)
	fiber(function* () {
		for (let i = 0; i < DB.length; i++) {
			const img = yield* untilPromise(imageFromURL(DB[i].url));
			// if image loading fails, update reactive error state & stop
			if (!img) {
				error.next(`error loading image (#${i}): ${DB[i].url}`);
				return;
			}
			// assign aspect ratio (later used for computing layout)
			DB[i].aspect = img!.width / img!.height;
			// update progress state
			progress.next(i / (DB.length - 1));
		}
		// initialize database
		initDB();
		// we're done here: switch to next app state (triggers main UI component
		// being replaced)
		APP_STATE.next("gallery");
	}).run();
	// return component with reactive values
	return div(
		".mt3",
		{},
		"Loading images...",
		progress.map(percent()),
		// reactive error state will only be populated if needed: $replace() is
		// an invisible control wrapper. in general, each new value received by
		// the given sub replaced the current component body (if any)...
		// https://docs.thi.ng/umbrella/rdom/functions/_replace.html
		$replace(error.map((e) => div(".mv2.pa2.bg-red.white", {}, e)))
	);
};
