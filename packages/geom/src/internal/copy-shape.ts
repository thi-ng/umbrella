import { copyVectors } from "@thi.ng/vectors/copy";
import { copyAttribs } from "./copy-attribs";
import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";

export const copyShape = (ctor: PCLikeConstructor, inst: PCLike) =>
    new ctor(copyVectors(inst.points), copyAttribs(inst));
