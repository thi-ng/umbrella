import { identity } from "@thi.ng/api";
import { isString } from "@thi.ng/checks";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { parseHtml } from "@thi.ng/hiccup-html-parse";
import { truncate } from "@thi.ng/strings";
import { comp, mapKeys, pluck, rename, step } from "@thi.ng/transducers";
import {
	LINK_COLOR,
	TAG_COLOR,
	type Account,
	type MediaItem,
	type Message,
} from "./api.js";

/**
 * Polymorphic function to transform selected HTML elements (given in
 * thi.ng/hiccup format). Dynamically chooses implementation based on element
 * type.
 *
 * @remarks
 * Some of these transformation steps here are only needed/desired because the
 * original Mastodon HTML is quite noisy, but it also shows how easy it is to
 * manipulate these elements once they're available in hiccup format (i.e. as
 * plain JS arrays & objects)...
 */
const cleanupElement = defmulti<any[], any>(
	(x) => x[0],
	{},
	{
		// by default keep each element as is
		[DEFAULT]: identity,

		// transform/augment <a> elements: `["a", {href: "...", ...}, body...]`
		a: (el) => {
			const isHashTag = el[1].rel === "tag";
			let col: string;
			if (isHashTag) {
				const url = el[1].href;
				el[1].onclick = (e: MouseEvent) => {
					e.preventDefault();
					alert(`Hashtag: ${url}`);
				};
				el[1].href = "#";
				col = `${TAG_COLOR} hover-${LINK_COLOR}`;
			} else {
				col = LINK_COLOR;
				el[1].target = "_blank";
			}
			el[1].class = `link b ${col}`;
			// merge string children
			for (let i = 3; i < el.length; ) {
				if (isString(el[i - 1]) && isString(el[i])) {
					el[i - 1] += el[i];
					el.splice(i, 1);
				} else {
					i++;
				}
			}
			// truncate link body (usually long URLs in this use case)
			el[2] = truncate(32, "…")(el[2]);
			return el;
		},

		// skip spans with `http...` body, hoist any single string bodies
		span: (el) => {
			if (
				el.length < 3 ||
				(el.length === 3 && /^https?:\/\/$/.test(el[2]))
			)
				return;
			return el.length === 3 ? el[2] : el;
		},
	}
);

/**
 * Transforms an HTML source string into thi.ng/hiccup format and applies above
 * element cleanups.
 *
 * @param src
 */
const transformContent = (src: string) =>
	parseHtml(src, {
		ignoreElements: ["script"],
		ignoreAttribs: ["target", "translate"],
		tx: cleanupElement,
	}).result || [];

/**
 * Transforms & filters raw Mastodon API account info into an {@link Account}
 * object.
 */
export const transformAccount = step(
	comp(
		mapKeys({
			note: transformContent,
		}),
		rename<any, Account>({
			id: true,
			username: true,
			url: true,
			avatar: true,
			header: true,
			name: "display_name",
			bio: "note",
		})
	)
);

/**
 * A transducer which transforms raw Mastodon API data of a single message/toot
 * into a {@link Message} object.
 */
export const transformMessage = comp(
	mapKeys({
		created_at: Date.parse,
		tags: (tags) => [...pluck("name", tags)],
		media_attachments: (attachments) => attachments.map(transformMedia),
		content: transformContent,
		reblog: (x) => !!x,
	}),
	rename<any, Message>({
		id: true,
		url: true,
		content: true,
		tags: true,
		sensitive: true,
		reblog: true,
		date: "created_at",
		media: "media_attachments",
		likes: "favourites_count",
		boosts: "reblogs_count",
		replies: "replies_count",
	})
);

/**
 * Transforms a single media item description from raw Mastodon API data into a
 * {@link MediaItem} object.
 */
const transformMedia = ({
	id,
	type,
	url,
	preview_url,
	description,
	meta: { small },
}: any): MediaItem => ({
	id,
	type,
	url,
	preview: preview_url,
	description,
	width: small.width,
	height: small.height,
});
