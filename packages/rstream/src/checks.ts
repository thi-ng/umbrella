// SPDX-License-Identifier: Apache-2.0
import { implementsFunction } from "@thi.ng/checks/implements-function";
import type {
	CloseMode,
	ISubscribable,
	ISubscriber,
	ISubscription,
} from "./api.js";

export const isSubscriber = (x: any): x is ISubscriber<any> =>
	implementsFunction(x, "next");

export const isSubscribable = (x: any): x is ISubscribable<any> =>
	implementsFunction(x, "subscribe");

export const isSubscriptionLike = (x: any): x is ISubscription<any, any> =>
	isSubscriber(x) && isSubscribable(x);

/**
 * Returns true if mode is FIRST, or if mode is LAST *and* `num = 0`.
 *
 * @internal
 */
export const isFirstOrLastInput = (mode: CloseMode, num: number) =>
	mode === "first" || (mode === "last" && !num);
