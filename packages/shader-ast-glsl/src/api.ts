import { Fn } from "@thi.ng/api";
import {
    FloatSym,
    Sym,
    Term,
    Vec2Sym,
    Vec4Sym
} from "@thi.ng/shader-ast";

export const enum GLSLVersion {
    GLES_100 = "100",
    GLES_300 = "300 es"
}

export interface GLSLOpts {
    type: "vs" | "fs";
    version: GLSLVersion;
    versionPragma: boolean;
    prelude: string;
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
