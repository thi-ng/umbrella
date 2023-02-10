import type { Predicate } from "@thi.ng/api";
import type { LCH, SRGB } from "@thi.ng/color";

export type ThemeColor = number | string | LCH | SRGB;

export type CSSTheme = string[];
export type IntTheme = number[];
export type LCHTheme = LCH[];
export type RGBTheme = SRGB[];

export type Theme = CSSTheme | IntTheme | LCHTheme | RGBTheme;

export type ColorPredicate = Predicate<ThemeColor>;
export type ThemePredicate = Predicate<Theme>;
