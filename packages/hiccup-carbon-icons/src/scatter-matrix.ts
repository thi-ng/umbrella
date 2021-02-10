import { svg } from "./_svg";

/**
 * https://demo.thi.ng/umbrella/hiccup-carbon-icons/#SCATTER_MATRIX
 */
// prettier-ignore
export const SCATTER_MATRIX = svg(
    ["circle",
        {
            r: 2.5,
            cy: 9.5,
            cx: 9.5,
        }],
    ["circle",
        {
            r: 2.5,
            cy: 22.5,
            cx: 9.5,
        }],
    ["circle",
        {
            r: 2.5,
            cy: 22.5,
            cx: 22.5,
        }],
    ["path", { d: "M28 2H4a2.002 2.002 0 00-2 2v24a2.002 2.002 0 002 2h24a2.002 2.002 0 002-2V4a2.002 2.002 0 00-2-2zm0 13H17V4h11zM15 4v11H4V4zM4 17h11v11H4zm13 11V17h11v11z" }]
);
