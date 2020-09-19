import { IGridLayout, isLayout, LayoutBox } from "@thi.ng/layout";

export const layoutBox = (
    layout: IGridLayout | LayoutBox,
    spans?: [number, number]
) => (isLayout(layout) ? layout.next(spans) : layout);
