import { appLink } from "./link.js";
import type { IObjectOf } from "@thi.ng/api";

export interface NotificationOpts {
	/**
	 * Attribute object to use for notification.
	 * Default: none
	 */
	attribs: IObjectOf<any>;
	/**
	 * Attribute object for link wrapper of `close` element.
	 * Default: none
	 */
	attribsClose: IObjectOf<any>;
	/**
	 * Icon element to use for notification.
	 * Default: none
	 */
	icon: any[];
	/**
	 * Icon element to use for close button.
	 * Default: none
	 */
	close: any[];
}

/**
 * Runtime supplied user args for individual notification instances.
 */
export interface NotificationArgs {
	/**
	 * Extra attribs to merge with (or override) configured default attribs.
	 */
	attribs: IObjectOf<any>;
	/**
	 * Event handler called when user closes notification. Only used if
	 * {@link NotificationOpts} has `close` option configured.
	 */
	onclose: EventListener;
}

/**
 * Higher order function to create a new stateless notification
 * component, pre-configured via user supplied options. The returned
 * component function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - partial {@link NotificationArgs} object (extra attribs, onclose handler)
 * - body content
 *
 * Any `attribs` provided as arg via {@link NotificationArgs} are merged with
 * the default options provided to the HOF. If the notification body
 * consists of multiple elements then they will need to be wrapped in a
 * container element.
 *
 * @param opts -
 */
export const notification = (opts: Partial<NotificationOpts> = {}) => {
	return (_: any, args: Partial<NotificationArgs>, body: any) => [
		"div",
		{ ...opts.attribs, ...args.attribs },
		opts.icon,
		body,
		opts.close && args.onclose
			? [appLink, opts.attribsClose, args.onclose, opts.close]
			: undefined,
	];
};
