import type { Text } from "@thi.ng/geom";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Essential state/configuration required for updating, drawing & recording the
 * grid of characters
 */
export interface State {
	/**
	 * Canvas drawing context
	 */
	ctx: CanvasRenderingContext2D;
	/**
	 * Canvas video recorder (only defined whilst recording is active)
	 */
	recorder?: MediaRecorder;
	/**
	 * Array of text elements/characters
	 */
	grid: Text[];
	/**
	 * Object describing the current grid modification behavior. Will be
	 * updated/modified each frame.
	 */
	alterDef: AlterDefinition;
	/**
	 * Randomly selected sentence (see {@link SENTENCES})
	 */
	sentence: string;
	/**
	 * Randomly selected fill symbols (see {@link SYMBOLS})
	 */
	symbols: string;
	/**
	 * Randomly selected color palette (see {@link PALETTES})
	 */
	palette: string[];
	/**
	 * Size of a single grid cell
	 */
	cellSize: number;
	/**
	 * Number of grid columns
	 */
	cols: number;
	/**
	 * Number of grid rows
	 */
	rows: number;
	/**
	 * Pixel dimensions of usable canvas area
	 */
	bounds: ReadonlyVec;
	/**
	 * Offset position of 1st grid cell
	 */
	offset: ReadonlyVec;
	/**
	 * frame counter, used to trigger various animation changes
	 */
	frame: number;
	/**
	 * requestAnimationFrame ID
	 */
	timer: number;
}

/**
 * Object that defines the changes made in each loop
 */
export interface AlterDefinition {
	/**
	 * Flag to control forward/backward direction
	 */
	dir: boolean;
	/**
	 * Axis of the alteration
	 */
	sel: "x" | "y";
	/**
	 * Number of times box to fill on X (-1 none)
	 */
	x: number;
	/**
	 * Number of times box to fill on Y (-1 none)
	 */
	y: number;
	/**
	 * The character to push onto the grid
	 */
	char: string;
	/**
	 * Charactor color for new char being pushed onto the grid
	 */
	color: string;
}
