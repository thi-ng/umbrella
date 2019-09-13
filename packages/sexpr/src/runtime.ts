import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { ASTNode, Implementations } from "./api";

export const runtime = <IMPL extends Implementations<ENV, RES>, ENV, RES>(
    impls: Partial<IMPL>
) => {
    const rt: MultiFn1O<ASTNode, ENV, RES> = defmulti((x: ASTNode) => x.type);
    rt.addAll(<any>impls);
    return rt;
};
