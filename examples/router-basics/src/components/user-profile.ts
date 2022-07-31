import { type AppContext, StatusType } from "../api";
import { LOAD_USER, SET_STATUS } from "../events";
import { status } from "./status";

/**
 * Single user profile page. Triggers JSON I/O request on init if user
 * data has not been loaded yet.
 *
 * @param ctx - njected context object
 */
export function userProfile(ctx: AppContext) {
	const id = ctx.views.route.deref()!.params.id;
	ctx.bus.dispatch(
		ctx.views.users.deref()![id]
			? [SET_STATUS, [StatusType.SUCCESS, "loaded from cache", true]]
			: [LOAD_USER, id]
	);
	return ["div", [status], [userCard, id]];
}

// based on: http://tachyons.io/components/cards/profile-card/index.html
function userCard(ctx: AppContext, id: number) {
	const user = ctx.views.users.deref()![id];
	const ui = ctx.ui.card;
	return user
		? [
				"div",
				ui.container,
				["img", { ...ui.thumb, src: user.img }],
				["h3", ui.title, user.name],
				user.job,
				["hr", ui.sep],
				["p", ui.body, user.desc],
		  ]
		: undefined;
}
