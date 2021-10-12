import { copyVectors } from "@thi.ng/vectors/copy";
import type {
    Attribs,
    IShape,
    PCLike,
    PCLikeConstructor,
} from "@thi.ng/geom-api";

export const __copyAttribs = ($: IShape) => <Attribs>{ ...$.attribs };

export const __copyShape = (ctor: PCLikeConstructor, inst: PCLike) =>
    new ctor(copyVectors(inst.points), __copyAttribs(inst));
