import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { isLayout } from "@thi.ng/layout/checks";

export const layoutBox = (
    layout: IGridLayout | LayoutBox,
    spans?: [number, number]
) => (isLayout(layout) ? layout.next(spans) : layout);
