import type { ISubscribable } from "@thi.ng/rstream";

let NEXT_ID = 0;

/** @internal */
export const __nextID = (name: string, src?: ISubscribable<any>) =>
	src ? `rdom$${name}-${src.id}-${NEXT_ID++}` : `rdom$${name}-${NEXT_ID++}`;
