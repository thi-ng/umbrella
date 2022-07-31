import type { Fn } from "@thi.ng/api";
import type { FloatSym, Sym, Term, Vec2Sym, Vec4Sym } from "@thi.ng/shader-ast";

export enum GLSLVersion {
	GLES_100 = "100",
	GLES_300 = "300 es",
}

export interface GLSLOpts {
	/**
	 * Shader type: vertex / fragment
	 */
	type: "vs" | "fs";
	/**
	 * Syntax version (default GLES_300)
	 */
	version: GLSLVersion;
	/**
	 * If true (default), emit `#version` pragma
	 */
	versionPragma: boolean;
	/**
	 * Additional user define source code to prepend
	 */
	prelude: string;
	/**
	 * Float precision (number of fractional digits).
	 */
	prec?: number;
}

export interface GLSLTarget extends Fn<Term<any>, string> {
	gl_FragColor: Vec4Sym;
	gl_FragCoord: Vec4Sym;
	gl_FragData: Sym<"vec4[]">;
	gl_FrontFacing: Sym<"bool">;
	gl_PointCoord: Vec2Sym;
	gl_PointSize: FloatSym;
	gl_Position: Vec4Sym;
}
