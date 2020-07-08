import type { MaybeDeref } from "@thi.ng/api";
import { button, i, InputAttribs } from "@thi.ng/hiccup-html";

export interface IconButtonOpts {
    attribs: Partial<InputAttribs>;
    icon: any;
    iconPos?: "L" | "R";
    label?: MaybeDeref<string>;
}

export const iconButton = (opts: IconButtonOpts) =>
    opts.iconPos !== "R"
        ? button(
              opts.attribs,
              i(
                  { style: { fill: "currentColor", "margin-right": "0.5rem" } },
                  opts.icon
              ),
              opts.label
          )
        : button(
              opts.attribs,
              opts.label,
              i(
                  { style: { fill: "currentColor", "margin-left": "0.5rem" } },
                  opts.icon
              )
          );
