import type { Predicate } from "@thi.ng/api";
import type { LCH, SRGB } from "@thi.ng/color";

export type ThemeColor = string | LCH | SRGB;

export type CSSTheme = string[];
export type LCHTheme = LCH[];
export type RGBTheme = SRGB[];

export type Theme = CSSTheme | LCHTheme | RGBTheme;

export type ColorPredicate = Predicate<ThemeColor>;
export type ThemePredicate = Predicate<Theme>;
