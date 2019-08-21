import { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import { copyVectors } from "@thi.ng/vectors";
import { copyAttribs } from "./copy-attribs";

export const copyShape = (ctor: PCLikeConstructor, inst: PCLike) =>
    new ctor(copyVectors(inst.points), copyAttribs(inst));
