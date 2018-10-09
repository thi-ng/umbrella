import { Mat23 } from "@thi.ng/vectors/mat23";
import { Vec2 } from "@thi.ng/vectors/vec2";
import { IBounds, ICentroid, ITransformable } from "./api";
import { collBounds } from "./internal/bounds";
import { Rect2 } from "./rect2";

const translateScale = (shape: ITransformable<Mat23>, c1: Vec2, c2: Vec2, smat: Mat23) =>
    shape.transform(
        Mat23.concat(
            Mat23.translation(c1),
            smat,
            Mat23.translation(c2)
        )
    );

export const fitIntoBounds2 = <T extends IBounds<Rect2> & ITransformable<Mat23>>(shape: T, bounds: Rect2) => {
    const obounds = shape.bounds();
    const tscale = bounds.size.copy().divNew(obounds.size);
    const scale = Math.min(tscale.x, tscale.y);
    return translateScale(
        shape,
        bounds.centroid(),
        obounds.centroid().neg(),
        Mat23.scale(scale)
    );
}

export const fitAllIntoBounds2 = <T extends IBounds<Rect2> & ICentroid<Vec2> & ITransformable<Mat23>>(shapes: T[], dest: Rect2) => {
    const src: Rect2 = collBounds(shapes);
    const w = dest.size.x / src.size.x;
    const h = dest.size.y / src.size.y;
    const s = w > 0 && h > 0 ? Math.min(w, h) : w > 0 ? w : h;
    const b = src.copy().scaleN(s).center(dest.centroid());
    const smat = Mat23.scale(s);
    for (let i = shapes.length; --i >= 0;) {
        const s = shapes[i];
        const c1 = s.centroid();
        const c2 = b.unmapPoint(src.mapPoint(c1));
        translateScale(s, c2, c1.neg(), smat);
    }
    return shapes;
};
