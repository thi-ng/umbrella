import type { Nullable } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { div, img, video } from "@thi.ng/hiccup-html";
import { $replace } from "@thi.ng/rdom";
import type { ISubscriber, ISubscription } from "@thi.ng/rstream";
import type { MediaItem } from "../api.js";

// CSS attribs for media preview wrapper
const GRID_LAYOUT = {
	style: {
		display: "grid",
		"grid-template-columns": "1fr 1fr",
		gap: "1rem",
	},
};

/**
 * Wrapper component for all media previews. Creates a {@link mediaItem}
 * component for each item.
 *
 * @param items
 * @param selection
 */
export const mediaAttachments = (
	items: MediaItem[],
	selection: ISubscriber<Nullable<MediaItem>>
) =>
	div(
		".mb3",
		items[0]?.type === "video" ? {} : GRID_LAYOUT,
		...items.map((x) => mediaItem(x, selection))
	);

/**
 * Polymorphic component function, dynamically choosing an implementation based
 * on media type.
 *
 * @remarks
 * The 2nd argument is a target stream of media items to trigger the
 * {@link mediaModal} overlay (currently only used for images).
 */
const mediaItem = defmulti<MediaItem, ISubscriber<Nullable<MediaItem>>, any>(
	(x) => x.type,
	{},
	{
		[DEFAULT]: ({ type }: MediaItem) =>
			div(".w-100", {}, `Unsupported media type: ${type}`),

		image: (item, selection) =>
			div(
				".relative.aspect-ratio--1x1",
				{},
				div(".aspect-ratio--object.cover.pointer", {
					title: item.description,
					style: { background: `url(${item.preview}) center` },
					onclick: () => selection.next(item),
				})
			),

		gifv: ({ description, url }) =>
			div(
				".relative.aspect-ratio--1x1",
				{},
				div(
					".aspect-ratio--object.overflow-hidden",
					{},
					video(".w-100", {
						src: url,
						title: description,
						preload: "auto",
						playsinline: true,
						autoplay: true,
						muted: true,
						loop: true,
					})
				)
			),

		video: ({ description, url, preview }) =>
			video(".w-100", {
				src: url,
				title: description,
				controls: true,
				poster: preview,
			}),
	}
);

/**
 * Fullscreen media modal overlay which subscribes to given stream of media
 * items. Only enables the modal for incoming non-null values (currently only
 * supports images).
 *
 * @param sel
 */
export const mediaModal = (
	sel: ISubscription<Nullable<MediaItem>, Nullable<MediaItem>>
) =>
	$replace(
		sel.map((item) =>
			item
				? div(
						".fadein.fixed.top-0.left-0.z-9999.w-100.vh-100.bg-black-90.flex.items-center.pointer",
						{
							// disable modal on click
							onclick: () => sel.next(null),
						},
						img(".center", {
							src: item.url,
							style: {
								"max-width": "100%",
								"max-height": "100%",
							},
						}),
						div(
							".fixed.bottom-1.left-1.pv2.ph3.mw7-l.br2.bg-black-80",
							{},
							item.description || "😢 No alt text provided..."
						)
				  )
				: // invisible div if no item
				  div(".dn", {})
		)
	);
