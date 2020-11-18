import type { Fn2, Nullable } from "@thi.ng/api";

export type CSVRow = Record<string, any>;

export type CellTransform = Fn2<string, CSVRow, any>;

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

export interface CSVOpts {
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
    cols: Nullable<ColumnSpec>[] | Record<string, ColumnSpec>;
    /**
     * If true, all leading and trailing whitespace for each field value will be
     * trimmed.
     *
     * @defaultValue false
     */
    trim: boolean;
}
