import { defError } from "@thi.ng/errors";
import {
    DEFAULT_SYNTAX,
    Expression,
    Node,
    RootNode,
    SyntaxOpts
} from "./api";

const ParseError = defError<string>((msg?) => msg || "Parser error", () => "");

export const parse = (tokens: Iterable<string>, opts?: Partial<SyntaxOpts>) => {
    const { scopeOpen, scopeClose } = {
        ...DEFAULT_SYNTAX,
        ...opts
    };
    const tree: Node[] = [{ type: "root", children: [] }];
    for (let t of tokens) {
        if (scopeOpen.indexOf(t) !== -1) {
            tree.push({ type: "expr", value: t, children: [] });
        } else if (scopeClose.indexOf(t) !== -1) {
            // TODO check matching scope type
            if (tree.length < 2) {
                throw new ParseError(`unmatched '${t}'`);
            }
            (<Expression>tree[tree.length - 2]).children!.push(tree.pop()!);
        } else {
            let node: Node;
            let value: number;
            if (t.startsWith('"')) {
                node = { type: "str", value: t.substring(1, t.length - 1) };
            } else if (
                (t.startsWith("0x") &&
                    !isNaN((value = parseInt(t.substr(2), 16)))) ||
                !isNaN((value = parseFloat(t)))
            ) {
                node = { type: "num", value };
            } else {
                node = { type: "sym", value: t };
            }
            (<Expression>tree[tree.length - 1]).children!.push(node);
        }
    }
    if (tree.length > 1) {
        throw new ParseError("invalid s-expression");
    }
    return <RootNode>tree[0];
};
