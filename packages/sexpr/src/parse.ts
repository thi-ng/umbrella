import { defError } from "@thi.ng/errors";
import {
    ASTNode,
    DEFAULT_SYNTAX,
    Expression,
    Root,
    SyntaxOpts
} from "./api";

const ParseError = defError<string>((msg?) => msg || "Parser error", () => "");

export const parse = (tokens: Iterable<string>, opts?: Partial<SyntaxOpts>) => {
    const { scopes } = {
        ...DEFAULT_SYNTAX,
        ...opts
    };
    const scopeOpen = scopes.map((x) => x[0]);
    const scopeClose = scopes.map((x) => x[1]);
    const tree: ASTNode[] = [{ type: "root", children: [] }];
    let currScope = -1;
    for (let t of tokens) {
        let tmp: number;
        if ((tmp = scopeOpen.indexOf(t)) !== -1) {
            tree.push({ type: "expr", value: t, children: [] });
            currScope = tmp;
        } else if ((tmp = scopeClose.indexOf(t)) !== -1) {
            if (tree.length < 2 || currScope !== tmp) {
                throw new ParseError(`unmatched '${t}'`);
            }
            (<Expression>tree[tree.length - 2]).children!.push(tree.pop()!);
            currScope = scopeOpen.indexOf(
                (<Expression>tree[tree.length - 1]).value
            );
        } else {
            let node: ASTNode;
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
        throw new ParseError("unclosed s-expr");
    }
    return <Root>tree[0];
};
