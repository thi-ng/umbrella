import { title } from "@thi.ng/hdom-components/title";

const h1 = title({ subAttribs: { class: "moon-gray" } });

export const section = (_, title, subtitle, ...body) =>
    ["section", [h1, title, subtitle], ...body];
