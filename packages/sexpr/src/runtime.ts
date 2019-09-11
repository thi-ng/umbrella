import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { Implementations, Node } from "./api";

export const runtime = <ENV, RES>(
    impls: Partial<Implementations<ENV, RES>>
) => {
    const rt: MultiFn1O<Node, ENV, RES> = defmulti((x: Node) => x.type);
    rt.addAll(<any>impls);
    return rt;
};
