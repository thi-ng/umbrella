import type { MSDFFont, RawGlyphs } from "./api.js";

/**
 * Takes a JSON spec produced by the MSDF font generator at
 * {@link https://github.com/donmccurdy/msdf-bmfont-web} and transforms
 * it into a filtered, more compact glyph spec used by the functions of
 * this module.
 *
 * @param raw -
 */
export const convertGlyphs = (raw: RawGlyphs): MSDFFont => ({
	fontFace: raw.info.face,
	fontSize: raw.info.size,
	lineHeight: raw.common.lineHeight,
	baseLine: raw.common.base,
	tex: raw.pages[0],
	size: [raw.common.scaleW, raw.common.scaleH],
	chars: raw.chars.reduce((acc: any, ch) => {
		acc[String.fromCharCode(ch.id)] = {
			pos: [ch.x, ch.y],
			offset: [ch.xoffset, ch.yoffset],
			size: [ch.width, ch.height],
			step: ch.xadvance,
		};
		return acc;
	}, {}),
});
