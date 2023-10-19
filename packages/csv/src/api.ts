import type { Fn2, Nullable } from "@thi.ng/api";
import type { Stringer } from "@thi.ng/strings";

/**
 * Tuple representing a single CSV row/record.
 */
export type CSVRow = any[];

/**
 * Tuple object representing a single CSV row/record
 */
export type CSVRecord = Record<string, any>;

/**
 * Cell value transformer used to coerce cell values. The 2nd arg provided is
 * the (incomplete) result array/object of the current row, useful for creating
 * derived values, taking other columns into account.
 */
export type CellTransform = Fn2<string, any, any>;

export interface ColumnSpec {
	/**
	 * Rename column to given name in result objects.
	 */
	alias?: string;
	/**
	 * Cell value transformer. This is a 2-arg function receiving string value
	 * and (incomplete) result object of current row. Return value is used as
	 * actual value for the cell.
	 */
	tx?: CellTransform;
}

export type ColumnSpecs = Record<string, ColumnSpec>;

export interface CommonCSVOpts {
	/**
	 * Field delimiter character.
	 *
	 * @defaultValue `,`
	 */
	delim: string;
	/**
	 * Field value quote character.
	 *
	 * @defaultValue `"`
	 */
	quote: string;
	/**
	 * Line comment prefix.
	 *
	 * @defaultValue `#`
	 */
	comment: string;
	/**
	 * If true, all leading and trailing whitespace for each field value will be
	 * trimmed.
	 *
	 * @defaultValue false
	 */
	trim: boolean;
}

export interface SimpleCSVOpts extends CommonCSVOpts {
	/**
	 * If true (default), the first row (usually containing CSV column names)
	 * will be skipped.
	 *
	 * @defaultValue true
	 */
	header: boolean;
	/**
	 * Array of booleans or {@link CellTransform}s (in column order), indicating
	 * which columns to retain in the result {@link CSVRow} tuples. If omitted
	 * ALL columns will be kept.
	 */
	cols: Nullable<boolean | CellTransform>[];
}

export interface CSVOpts extends CommonCSVOpts {
	/**
	 * If given, this array will be used as column names (and order) and
	 * overrides the default CSV behavior in which the first line defines the
	 * column names. Useful for parsing CSV data which doesn't contain a header
	 * row.
	 */
	header: string[];
	/**
	 * If true (default), all columns will be included in the result objects.
	 *
	 * @defaultValue true
	 */
	all: boolean;
	/**
	 * Array or object of column specific options/transformations.
	 *
	 * If given as array:
	 *
	 * - each item will be related to its respective column (array order)
	 * - any nullish {@link ColumnSpec} values will be skipped
	 * - if a spec provides no `alias` and no column name is made available
	 *   otherwise (i.e. either via 1st data row or the `header` option), then
	 *   that column will be named numerically
	 *
	 * If given as object, each key must match an existing/original column name
	 * (either as per 1st data row or the `header` option).
	 */
	cols: Nullable<ColumnSpec>[] | ColumnSpecs;
}

export interface CSVFormatOpts {
	/**
	 * Column names, in order of appearance. If omitted and rows are supplied as
	 * {@link CSVRecord}, the keys of the first item will be used as column
	 * names. If `header` is omitted and rows are given as array, NO header row
	 * will be created.
	 */
	header: string[];
	/**
	 * Column value formatters. If given as object, and the `header` option MUST be
	 * given and the column names given in `header` need to correspond with keys
	 * in the object.
	 */
	cols: Nullable<Stringer<any>>[] | Record<string, Stringer<any>>;
	/**
	 * Column delimiter
	 *
	 * @defaultValue `,`
	 */
	delim: string;
	/**
	 * Quote char
	 *
	 * @defaultValue `"`
	 */
	quote: string;
}
