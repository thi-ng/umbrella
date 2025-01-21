// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api";

/**
 * Generic HTML link component.
 *
 * @param ctx -
 * @param href -
 * @param body -
 */
export const link = (_: AppContext, attribs: any, body: string) => [
	"a",
	attribs,
	body,
];
