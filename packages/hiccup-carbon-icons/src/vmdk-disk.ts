import { svg } from "./_svg.js";

/**
 * https://demo.thi.ng/umbrella/hiccup-carbon-icons/#VMDK_DISK
 */
// prettier-ignore
export const VMDK_DISK = svg(
    ["circle",
        {
            r: 1.5,
            cy: 24.5,
            cx: 10.5,
        }],
    ["path", { d: "M18 16.414L19.414 15 23 18.585 21.585 20z" }],
    ["circle",
        {
            r: 2,
            cy: 13,
            cx: 16,
        }],
    ["path", { d: "M16 6a7 7 0 000 14v-2a5 5 0 115-5h2a7 7 0 00-7-7z" }],
    ["path", { d: "M26 2H6a2 2 0 00-2 2v24a2 2 0 002 2h20a2 2 0 002-2V4a2 2 0 00-2-2zm0 26H6V4h20z" }]
);
