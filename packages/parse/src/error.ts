import { defError } from "@thi.ng/errors/deferror";
import type { ParseContext } from "./context";

const ParseError = defError(() => `ParseError`);

export const parseError = (ctx: ParseContext<any>, msg: string): never => {
    const info = ctx.reader.format(ctx.scope.state!);
    throw new ParseError(msg + (info ? ` @ ${info}` : ""));
};
