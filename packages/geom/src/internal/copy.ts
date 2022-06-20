// thing:export
import { copyVectors } from "@thi.ng/vectors/copy";
import type {
    Attribs,
    IShape,
    PCLike,
    PCLikeConstructor,
} from "@thi.ng/geom-api";

/** @internal */
export const __copyAttribs = ($: IShape) => <Attribs>{ ...$.attribs };

/** @internal */
export const __copyShape = <T extends PCLike>(
    ctor: PCLikeConstructor,
    inst: T
) => <T>new ctor(copyVectors(inst.points), __copyAttribs(inst));
