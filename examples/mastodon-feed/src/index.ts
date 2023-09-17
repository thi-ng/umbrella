import type { Nullable } from "@thi.ng/api";
import { asPromise, timeSliceIterable } from "@thi.ng/fibers";
import { div, progress as progressBar } from "@thi.ng/hiccup-html";
import { $compile, $klist, $refresh } from "@thi.ng/rdom";
import { CloseMode, reactive, stream } from "@thi.ng/rstream";
import { percent } from "@thi.ng/strings";
import { iterator } from "@thi.ng/transducers";
import type { Account, MediaItem, Message } from "./api.js";
import { accountChooser, accountInfo } from "./components/account.js";
import { mediaModal } from "./components/media.js";
import { message } from "./components/message.js";
import { transformAccount, transformMessage } from "./transforms.js";

// reactive state values (various parts of the UI will subscribe to these)
const userID = reactive(location.hash.substring(1) || "@toxi@mastodon.thi.ng");
const loadTrigger = reactive(true);
const messages = stream<Message[]>();
const mediaSelection = reactive<Nullable<MediaItem>>(null);
// value for progress bar, the options are required to keep the stream alive
// even when no progress bar is currently subscribed
const progress = reactive(0, { closeOut: CloseMode.NEVER });

// update hash fragment when user ID changes
userID.subscribe({
	next(id) {
		location.hash = id;
	},
});

/**
 * Attempts to load JSON from given URL.
 *
 * @param url
 */
const loadJSON = async (url: string) => {
	const response = await fetch(url);
	if (response.status < 400) {
		return await response.json();
	} else {
		throw new Error(`HTTP error: ${response.status}`);
	}
};

// const asPromise = <T>(inner: MaybeFiber<T>) =>
// 	new Promise<T>((resolve, reject) => {
// 		fiber(inner, {
// 			deinit: (f) => f.state < STATE_ERROR && resolve(f.deref()!),
// 			catch: (_, e) => (reject(e), false),
// 		}).run();
// 	});

/**
 * Performs Mastodon API requests for user ID/instance currently in
 * {@link userID}. If successful, transforms received data, updates state
 * ({@link messages}) and returns a new account info/header component.
 */
const loadAccount = async () => {
	const [_, username, instance] = userID.deref()!.split("@");
	if (!(username && instance)) return;
	// clear existing messages in UI
	messages.next([]);
	progress.next(0);
	// lookup account info
	const baseURL = `https://${instance}/api/v1/accounts`;
	const account = await loadJSON(`${baseURL}/lookup?acct=${username}`);
	// load recent messages
	const rawMessages = await loadJSON(
		`${baseURL}/${account.id}/statuses?limit=50&exclude_replies=true&exclude_reblogs=true`
	);

	// split up message parsing/transformation over several frames, updating
	// progress bar at each step
	const transformedMessages = asPromise<Message[]>(function* () {
		const results: Message[] = [];
		yield* timeSliceIterable(
			// create a (lazy) iterator of transformed messages
			iterator(transformMessage, rawMessages),
			// collect step-wise results, update progress
			(chunk) => {
				results.push(...chunk);
				progress.next(results.length / rawMessages.length);
			},
			// arbitrarily limit step duration (time slice) to 1ms
			1
		);
		return results;
	});

	// wait for task to finish & place results (transformed messages) into
	// stream to trigger UI update
	messages.next(await transformedMessages);

	// return account info component
	return accountInfo(<Account>transformAccount(account));
};

// create & mount UI components
$compile(
	div(
		".w-100.w-50-l.center.lh-copy",
		{},
		// input form component
		accountChooser(userID, loadTrigger),
		// the account header component is managed by a wrapper component
		// subscribed to the `loadTrigger` stream which will then call the above
		// async function `loadAccount()` to retrieve the new account info &
		// messages and then return the new contents for this header
		// component...
		$refresh(
			loadTrigger,
			loadAccount,
			// error component ctor (if there're network or HTTP errors)
			async (e) => div(".mv0.mh3.pa3.bg-dark-red.white", {}, e.message),
			// preloader component ctor. the progress bar element will be
			// updated via its subscription to the `progress` stream
			async () =>
				div(
					".pa3.f7",
					{},
					progressBar(".db.w-100", { value: progress }),
					progress.map(percent())
				)
		),
		// keyed list component which subscribes to `messages` stream and
		// transforms each item via the `message` component function. the last arg
		// is the key function which MUST (and here does) produce a unique ID
		// for each list item.
		$klist(
			messages,
			"div",
			{},
			(x) => message(x, mediaSelection),
			(x) => x.id
		),
		// fullscreen media overlay component
		mediaModal(mediaSelection)
	)
).mount(document.getElementById("app")!);

// global event listener for stopping the modal media overlay
window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") mediaSelection.next(null);
});
