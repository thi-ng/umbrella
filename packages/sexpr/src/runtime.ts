import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { ASTNode, Implementations } from "./api.js";

export const runtime = <IMPL extends Implementations<ENV, RES>, ENV, RES>(
	impls: Partial<IMPL>
): MultiFn2<ASTNode, ENV, RES> =>
	defmulti<ASTNode, ENV, RES>((x: ASTNode) => x.type, {}, <any>impls);
