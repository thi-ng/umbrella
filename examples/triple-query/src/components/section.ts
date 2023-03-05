import { title } from "@thi.ng/hdom-components";

const h1 = title({ subAttribs: { class: "moon-gray" } });

export const section = (
	_: any,
	title: string,
	subtitle: string,
	...body: any[]
) => ["section", [h1, title, subtitle], ...body];
