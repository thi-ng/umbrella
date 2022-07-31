import type { IObjectOf } from "@thi.ng/api";

export const GL_EXT_INFO: IObjectOf<ExtensionInfo> = {
	WEBGL_draw_buffers: {
		gl: true,
		alias: "GL_EXT_draw_buffers",
	},
	OES_standard_derivatives: {
		gl: true,
		alias: "GL_OES_standard_derivatives",
	},
};

export interface ExtensionInfo {
	gl?: boolean;
	gl2?: boolean;
	alias: string;
}

export interface WebGLExtensionMap {
	ANGLE_instanced_arrays: ANGLE_instanced_arrays;
	EXT_blend_minmax: EXT_blend_minmax;
	EXT_color_buffer_float: WEBGL_color_buffer_float;
	EXT_frag_depth: EXT_frag_depth;
	EXT_shader_texture_lod: EXT_shader_texture_lod;
	EXT_sRGB: EXT_sRGB;
	EXT_texture_filter_anisotropic: EXT_texture_filter_anisotropic;
	OES_element_index_uint: OES_element_index_uint;
	OES_standard_derivatives: OES_standard_derivatives;
	OES_texture_float_linear: OES_texture_float_linear;
	OES_texture_float: OES_texture_float;
	OES_texture_half_float_linear: OES_texture_half_float_linear;
	OES_texture_half_float: OES_texture_half_float;
	OES_vertex_array_object: OES_vertex_array_object;
	WEBGL_color_buffer_float: WEBGL_color_buffer_float;
	WEBGL_compressed_texture_astc: WEBGL_compressed_texture_astc;
	WEBGL_compressed_texture_s3tc_srgb: WEBGL_compressed_texture_s3tc_srgb;
	WEBGL_compressed_texture_s3tc: WEBGL_compressed_texture_s3tc;
	WEBGL_debug_renderer_info: WEBGL_debug_renderer_info;
	WEBGL_debug_shaders: WEBGL_debug_shaders;
	WEBGL_depth_texture: WEBGL_depth_texture;
	WEBGL_draw_buffers: WEBGL_draw_buffers;
	WEBGL_lose_context: WEBGL_lose_context;
}

export type ExtensionName = keyof WebGLExtensionMap;

export type ExtensionBehavior = "require" | "warn" | boolean;

export type ExtensionBehaviors = Partial<
	Record<keyof WebGLExtensionMap, ExtensionBehavior>
>;
