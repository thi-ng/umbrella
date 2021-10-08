import { rect } from "@thi.ng/geom/rect";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { isLayout } from "@thi.ng/layout/checks";
import { hash } from "@thi.ng/vectors/hash";
import type { IMGUI } from "../gui";
import { mixHash } from "../hash";
import { buttonRaw } from "./button";
import { textLabelRaw } from "./textlabel";

export const iconButton = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    icon: any,
    iconW: number,
    iconH: number,
    label?: string,
    info?: string
) => {
    const theme = gui.theme;
    const pad = theme.pad;
    const bodyW = label
        ? iconW + 3 * pad + gui.textWidth(label)
        : iconW + 2 * pad;
    const bodyH = iconH + pad;
    const { x, y, w, h } = isLayout(layout)
        ? layout.next(layout.spansForSize(bodyW, bodyH))
        : layout;
    const key = hash([x, y, w, h, ~~gui.disabled]);
    const mkIcon = (hover: boolean) => {
        const col = gui.textColor(hover);
        const pos = [x + pad, y + (h - iconH) / 2];
        return [
            "g",
            {
                translate: pos,
                fill: col,
                stroke: col,
            },
            icon,
            label
                ? textLabelRaw(
                      [iconW + pad, -(h - iconH) / 2 + h / 2 + theme.baseLine],
                      { fill: col, stroke: "none" },
                      label
                  )
                : undefined,
        ];
    };
    return buttonRaw(
        gui,
        id,
        gui.resource(id, key, () => rect([x, y], [w, h])),
        key,
        gui.resource(id, mixHash(key, `l${label}`), () => mkIcon(false)),
        gui.resource(id, mixHash(key, `lh${label}`), () => mkIcon(true)),
        info
    );
};
