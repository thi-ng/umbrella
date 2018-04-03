{
    const NodeType = require("./api").NodeType;

    // const NodeType = {};
    // NodeType[NodeType["SYM"] = 1] = "SYM";
    // NodeType[NodeType["WORD"] = 2] = "WORD";
    // NodeType[NodeType["VAR_DEREF"] = 3] = "VAR_DEREF";
    // NodeType[NodeType["VAR_STORE"] = 4] = "VAR_STORE";
    // NodeType[NodeType["NIL"] = 5] = "NIL";
    // NodeType[NodeType["NUMBER"] = 6] = "NUMBER";
    // NodeType[NodeType["BOOLEAN"] = 7] = "BOOLEAN";
    // NodeType[NodeType["STRING"] = 8] = "STRING";
    // NodeType[NodeType["ARRAY"] = 9] = "ARRAY";
    // NodeType[NodeType["OBJ"] = 10] = "OBJ";
    // NodeType[NodeType["COMMENT"] = 11] = "COMMENT";
    // NodeType[NodeType["STACK_COMMENT"] = 12] = "STACK_COMMENT";

    const ast = (node) => {
        const loc = location().start;
        node.loc = [loc.line, loc.column];
        return node;
    };
}

Root
    = expr:Expr*

Expr
    = _ expr:( Word / NonWordExpr ) _ {
        return ast(expr);
    }

NonWordExpr
    = _ expr:(
        LitQuote
        / Var
        / Comment
        / Array
        / Obj
        / Atom
    ) _ { return ast(expr); }

Word
    = ":" __ id:Sym locals:LocalVars? body:NonWordExpr+ ";" {
        return { type: NodeType.WORD, id: id.id, locals, body};
    }

LocalVars
	= _ "^{" body:SymList+ "}" {
    	return body;
    }

SymList
	= _ id:Sym _ { return id.id; }

Array
    = "[" body:NonWordExpr* "]" {
        return { type: NodeType.ARRAY, body };
    }

Obj
    = "{" _ body:ObjPair* "}" {
        return { type: NodeType.OBJ, body };
    }

ObjPair
    = k:ObjKey v:ObjVal { return [ k, v ]; }

ObjKey
    = k:(
        String
        / Number
        / VarDeref
        / Sym
    ) ":" { return ast(k); }

ObjVal
    = _ val:(
        Atom
        / LitQuote
        / VarDeref
        / Array
        / Obj
    ) _ { return ast(val); }

Atom
    = String
    / Number
    / Boolean
    / Nil
    / Sym

Nil
    = "nil" {
        return {type: NodeType.NIL, body: null};
    }

Boolean
    = $("T" / "F") {
        return {type: NodeType.BOOLEAN, body: text() == "T"};
    }

Sym
    = id:$((Alpha / SymChars) (AlphaNum / SymChars)*) {
        return {type: NodeType.SYM, id};
    }

SymChars
    = [*?$%&/\|~<>=_.+\-]

Var
    = VarDeref
    / VarStore

VarDeref
    = "@" id:Sym {
        return {type: NodeType.VAR_DEREF, id: id.id}
    }

VarStore
    = id:Sym "!" {
        return {type: NodeType.VAR_STORE, id: id.id}
    }

LitQuote
    = "'" body:NonWordExpr {
        return {type: NodeType.ARRAY, body: [body]};
    }

Comment
    = "("+ body:$(!")" .)* ")" {
        return body.indexOf("--") > 0 ?
            {
                type: NodeType.STACK_COMMENT,
                body: body.split("--").map(x => x.trim())
            } :
            {
                type: NodeType.COMMENT,
                body: body.trim()
            };
    }

String
    = "\"" body:$(!"\"" .)* "\"" {
        return {type: NodeType.STRING, body };
    }

Number
    = Hex
    / Binary
    / Decimal

Sign = [-+]

Binary
    = "0b" n:$[01]+ {
        return {type: NodeType.NUMBER, radix: 2, body: parseInt(n, 2)};
    }

Hex
    = "0x" n:$[0-9a-fA-F]+ {
        return {type: NodeType.NUMBER, radix: 16, body: parseInt(n, 16)};
    }

Int
    = Sign? Uint

Uint
    = Digit+

Decimal
    = Int ("." Uint?)? ("e" Int)? {
        return {type: NodeType.NUMBER, body: parseFloat(text())};
    }

AlphaNum
    = Alpha
    / Digit

Alpha
    = [a-z]i

Digit
    = [0-9]

LineBreak
    = [\n\r]

_ = [ ,\t\n\r]*
__ = [ ,\t\n\r]+
