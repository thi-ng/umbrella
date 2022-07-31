import type { Nullable, NumOrString } from "@thi.ng/api";

export type Align = "c" | "l" | "r";

export type Column = Nullable<NumOrString>;

export type Row = Column[];

export interface TableOpts {
	/**
	 * If true, header cells will be wrapped in `**` (bold Markdown syntax).
	 *
	 * @defaultValue false
	 */
	bold: boolean;
	/**
	 * Array of column alignments. If given, MUST be same length as columns
	 * defined in header array.
	 *
	 * @defaultValue "l"
	 */
	align: Align[];
}
