// SPDX-License-Identifier: Apache-2.0
import type { Attribs } from "@thi.ng/hiccup-html";
import { anchor } from "@thi.ng/hiccup-html/inline";
import { table, tbody, td, tr } from "@thi.ng/hiccup-html/table";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";

/**
 * Returns a `<table>` element with rows of labeled percentage anchors as scroll
 * targets. `numSteps` default is 4 (aka 25%).
 *
 * @remarks
 * Resulting table structure is shown below. Note: Unless provided by the user,
 * the table will be entirely unstyled, but it's recommended to set the
 * `vertical-align` of table cells to `top`.
 *
 * ```html
 * <table>
 *   <tbody>
 *     <tr>
 *       <td id="0%"><a href="#0%">0%</a></td>
 *       <td id="25%"><a href="#25%">25%</a></td>
 *       <td id="50%"><a href="#50%">50%</a></td>
 *       <td id="75%"><a href="#75%">75%</a></td>
 *     </tr>
 *   </tbody>
 * </table>
 * ```
 *
 * @param attribs
 * @param numSteps
 */
export const verticalRuler = (attribs: Partial<Attribs> = {}, numSteps = 4) =>
	table(
		attribs,
		tbody(
			{},
			...map((x) => {
				const id = `${(x * 100) | 0}%`;
				return tr({}, td({ id }, anchor({ href: `#${id}` }, id)));
			}, normRange(numSteps, false))
		)
	);
