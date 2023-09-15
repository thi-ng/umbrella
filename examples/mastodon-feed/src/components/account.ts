import { anchor, div, h1, img, inputText, span } from "@thi.ng/hiccup-html";
import { $input, $inputTrigger } from "@thi.ng/rdom";
import type { ISubscriber, ISubscription } from "@thi.ng/rstream";
import { BUTTON_COLOR, type Account } from "../api.js";

/**
 * Form component to allow user entering a Mastodon user ID for loading &
 * displaying their messages.
 *
 * @param value
 * @param trigger
 */
export const accountChooser = (
	value: ISubscription<string, string>,
	trigger: ISubscriber<boolean>
) =>
	div(
		".pa3",
		{},
		inputText(".db.w-100.pa2.br2.ba.b--white-10.bg-near-black.white", {
			value,
			onchange: $input(value),
			onkeydown: (e) => {
				if (e.key === "Enter") {
					$input(value)(e);
					trigger.next(true);
				}
			},
			placeholder: "User ID",
		}),
		anchor(
			`.db.w-100.mt2.pa2.br2.${BUTTON_COLOR}.link.tc.pointer`,
			{ onclick: $inputTrigger(trigger) },
			"Load messages"
		)
	);

/**
 * User account header/info component, displaying various details & images from
 * the provided user account.
 *
 * @param account
 */
export const accountInfo = ({ username, name, bio, avatar, header }: Account) =>
	div(
		{},
		div(
			".relative",
			{ style: { "padding-bottom": "33.33%" } },
			div(".aspect-ratio--object.cover", {
				style: { background: `url(${header}) center` },
			}),
			div(".absolute.z-999.bottom-0.w-100.h4", {
				style: {
					background:
						"linear-gradient(to bottom, #0000 0%, #000e 100%)",
				},
			}),
			img(".absolute.left-2.w-25.br-100.ba.bw3.b--black.z-999", {
				src: avatar,
				style: {
					bottom: "-25%",
				},
			})
		),
		div(
			".mt5.ml4.mt4-ns.ml7-ns.lh-solid",
			{},
			h1(".mv0", {}, name),
			span(".f3", {}, `@${username}`)
		),
		div(".mt0.mb4.mh3.ph3", {}, ...bio)
	);
