import { Tuple } from "@thi.ng/api";

export const GL_COLOR_ATTACHMENT0_WEBGL = 0x8ce0;
export const GL_MAX_COLOR_ATTACHMENTS_WEBGL = 0x8cdf;
export const GL_RGBA = 0x1908;
export const GL_RGBA32F = 0x8814;

// [SRC_ALPHA, ONE_MINUS_SRC_ALPHA]
export const DEFAULT_BLEND: Tuple<GLenum, 2> = [0x302, 0x303];
