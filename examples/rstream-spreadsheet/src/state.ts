import type { IObjectOf } from "@thi.ng/api";
import { Atom } from "@thi.ng/atom";
import { setIn, setInManyUnsafe } from "@thi.ng/paths";
import { Node, removeNode } from "@thi.ng/rstream-graph";
import { charRange } from "@thi.ng/strings";
import {
	assocObj,
	map,
	permutations,
	range,
	transduce,
} from "@thi.ng/transducers";
import { MAX_COL, NUM_ROWS, type Cell } from "./api";
import { $eval } from "./dsl";

/**
 * Initializes state atom with default cell values. Later on, the
 * dataflow graph operators defined by various formula expressions will
 * then attach subscriptions manipulate individual cell values.
 */
export const DB = new Atom<IObjectOf<Cell>>(
	transduce(
		map(
			([col, row]) =>
				<[string, Cell]>[
					`${col}${row}`,
					{
						formula: "",
						value: "",
						backup: "",
						focus: false,
						error: "",
					},
				]
		),
		assocObj(),
		permutations(charRange("A", MAX_COL), range(1, NUM_ROWS + 1))
	)
);

/**
 * Container object for storing dataflow graph.
 */
export const graph: IObjectOf<Node> = {};

export const removeCell = (id: string) => removeNode(graph, id);

/**
 * Enables focus flag for given cell
 *
 * @param id -
 */
export const focusCell = (id: string) => {
	DB.swapIn([id], (cell) =>
		setInManyUnsafe(cell, "focus", true, "backup", cell.formula)
	);
};

/**
 * Disables focus flag for given cell
 *
 * @param id -
 */
export const blurCell = (id: string) => {
	DB.swapIn([id], (cell) => setIn(cell, ["focus"], false));
};

/**
 * Restores cell value to `backup` string and clears focus.
 *
 * @param id -
 */
export const cancelCell = (id: string) => {
	DB.swapIn([id], (cell) =>
		setInManyUnsafe(cell, "focus", false, "formula", cell.backup)
	);
};

/**
 * Cell on-change handler. Checks if `val` is potentially an
 * S-expression and if so attempts to parse and execute it. Sets cell
 * error if failed. If not an s-expr, updates cell value and clears
 * error.
 *
 * @param id -
 * @param val -
 */
export const updateCell = (id: string, val: string) => {
	if (val.startsWith("(")) {
		DB.resetIn(<const>[id, "formula"], val);
		try {
			$eval(val, id);
			DB.resetIn(<const>[id, "error"], null);
		} catch (e) {
			DB.resetIn(<const>[id, "error"], (<Error>e).message);
		}
	} else {
		removeCell(id);
		DB.swapIn([id], (cell) =>
			setInManyUnsafe(cell, "value", val, "formula", "", "error", null)
		);
	}
};
