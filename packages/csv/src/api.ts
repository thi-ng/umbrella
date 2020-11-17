import type { Fn2 } from "@thi.ng/api";

export type CSVRow = Record<string, any>;

export interface ColumnSpec {
    /**
     * Rename column to given name in result objects.
     */
    alias?: string;
    /**
     * Value transformer.
     */
    coerce?: Fn2<string, CSVRow, any>;
}

export interface CSVOpts {
    /**
     * Field delimiter character.
     *
     * @defaultValue ","
     */
    delim: string;
    /**
     * Line comment prefix.
     *
     * @defaultValue "#"
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
     * Object of column specific options/transformations.
     */
    cols: Record<string, ColumnSpec>;
    /**
     * If true, all leading and trailing whitespace for each field value will be
     * trimmed.
     *
     * @defaultValue false
     */
    trim: boolean;
}
