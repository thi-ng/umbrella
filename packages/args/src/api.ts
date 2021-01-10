import type { Fn, IObjectOf } from "@thi.ng/api";

export interface ArgSpecBase {
    alias?: string;
    desc?: string;
    hint?: string;
    fn?: Fn<string, boolean>;
}

export type ArgSpecRestrict<T> = undefined extends T
    ? {}
    : { optional: false } | { default: T };

export type ArgSpec<T> = ArgSpecBase & ArgSpecRestrict<T>;

export type ArgSpecExt = ArgSpec<any> & {
    coerce?: Fn<any, any>;
    delim?: string;
    default?: any;
    flag?: boolean;
    fn?: Fn<string, boolean>;
    multi?: boolean;
    optional?: any;
};

export type Args<T extends IObjectOf<any>> = {
    [id in keyof T]: boolean extends T[id]
        ? ArgSpec<T[id]> & { flag: true }
        : any[] extends T[id]
        ? ArgSpec<T[id]> & {
              coerce: Fn<string[], Exclude<T[id], undefined>>;
              multi: true;
              delim?: string;
          }
        : KVDict extends T[id]
        ? ArgSpec<T[id]> & {
              coerce: Fn<string[], Exclude<T[id], undefined>>;
              multi: true;
          }
        : ArgSpec<T[id]> & {
              coerce: Fn<string, Exclude<T[id], undefined>>;
          };
};

export type KVDict = IObjectOf<string>;

export interface ParseResult<T> {
    result: T;
    index: number;
    done: boolean;
    rest: string[];
}

export interface ParseOpts {
    /**
     * Start index in `process.argv` to start parsing arguments from.
     *
     * @defaultValue 2
     */
    start: number;
    /**
     * True, if {@link usage} should be called automatically when a parse error
     * occurs. Note: Errors will always be thrown, regardless of this setting.
     *
     * @defaultValue true
     */
    showUsage: boolean;
    /**
     * Only used if `showUsage` is enabled.
     *
     * @see {@link UsageOpts}
     */
    usageOpts: Partial<UsageOpts>;
}

export interface UsageOpts {
    /**
     * Line width for usage information (used for word wrapping).
     *
     * @defaultValue 80
     */
    lineWidth: number;
    /**
     * Column width for params
     *
     * @defaultValue 32
     */
    paramWidth: number;
    /**
     * If false, ANSI colors will be stripped from output.
     *
     * @defaultValue true
     */
    color: Partial<ColorTheme> | false;
}

export interface ColorTheme {
    hint: number;
    multi: number;
    param: number;
    required: number;
}

export const DEFAULT_THEME: ColorTheme = {
    hint: 90,
    multi: 90,
    param: 96,
    required: 33,
};
