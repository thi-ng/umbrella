import { ShaderOpts } from "./api";

export const isGL2Context = (
    gl: WebGLRenderingContext
): gl is WebGL2RenderingContext =>
    typeof WebGL2RenderingContext !== "undefined" &&
    gl instanceof WebGL2RenderingContext;

export const positionAttrib = (
    opts: Partial<ShaderOpts<any>>,
    pos = "a_position"
) => `${pos}${opts.instancePos ? ` + a_${opts.instancePos}` : ""}`;

export const colorAttrib = (
    opts: Partial<ShaderOpts<any>>,
    fallback = "u_diffuseCol",
    post = ` * ${fallback}`
) =>
    opts.instanceColor
        ? `a_${opts.instanceColor}${post}`
        : opts.color
        ? `a_${opts.color}${post}`
        : fallback;
