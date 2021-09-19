import { FormatPresets, PresetID, PRESETS_TPL, StringFormat } from "./api";

/**
 * HOF format function. Returns a single-arg function which wraps a given value
 * into a fully prefixed & suffixed format string using given
 * {@link StringFormat} impl.
 *
 * @example
 * ```ts
 * const red = defFormat(FMT_ANSI16, FG_RED);
 *
 * red("hello");
 * // "\x1B[31mhello\x1B[0m"
 * ```
 *
 * @param fmt
 * @param code
 */
export const defFormat = (fmt: StringFormat, code: number) => (x: any) =>
    fmt.start(code) + x + fmt.end;

/**
 * Takes a {@link StringFormat} impl supporting preset format ID constants (e.g.
 * {@link FG_GREEN}) and returns an object of formatting functions for each
 * `FG_XXX` preset ID.
 *
 * @param fmt
 */
export const defFormatPresets = (fmt: StringFormat): FormatPresets =>
    Object.keys(PRESETS_TPL).reduce(
        (acc, id) => (
            (acc[id] = defFormat(fmt, PRESETS_TPL[<PresetID>id])), acc
        ),
        <any>{}
    );
