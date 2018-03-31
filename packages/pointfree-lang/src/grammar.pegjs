{
    const NodeType = require("./api").NodeType;

    // const NodeType = {};
    // NodeType[NodeType["SYM"] = 1] = "SYM";
    // NodeType[NodeType["WORD"] = 2] = "WORD";
    // NodeType[NodeType["QUOT"] = 3] = "QUOT";
    // NodeType[NodeType["VAR_DEREF"] = 4] = "VAR_DEREF";
    // NodeType[NodeType["VAR_STORE"] = 5] = "VAR_STORE";
    // NodeType[NodeType["NIL"] = 6] = "NIL";
    // NodeType[NodeType["NUMBER"] = 7] = "NUMBER";
    // NodeType[NodeType["BOOLEAN"] = 8] = "BOOLEAN";
    // NodeType[NodeType["STRING"] = 9] = "STRING";
    // NodeType[NodeType["MAP"] = 10] = "MAP";
    // NodeType[NodeType["SET"] = 11] = "SET";
    // NodeType[NodeType["COMMENT"] = 12] = "COMMENT";
    // NodeType[NodeType["STACK_COMMENT"] = 13] = "STACK_COMMENT";

    const ast = (node) => {
        // const loc = location().start;
        // node.loc = [loc.offset, loc.line, loc.column];
        return node;
    };
}

Root
    = exrp:Expr*

Expr
    = _ expr:(
        Word
        / Quot
        / LitQuote
        / Var
        / Comment
        / Atom
        / Map
//      / Set
    ) _ { return ast(expr); }

Word
    = ":" __ id:Sym body:Expr+ ";" {
        return { type: NodeType.WORD, id: id.id, body};
    }

Quot
    = "[" body:Expr* "]" {
        return { type: NodeType.QUOT, body };
    }

Set
    = "#{" body:Expr* "}" {
        return { type: NodeType.SET, body };
    }

Map
    = "{" _ body:MapPair* "}" {
        return { type: NodeType.MAP, body };
    }

MapPair
    = k:MapKey v:MapVal { return [ k, v ]; }

MapKey
    = k:(String / Sym / Number / VarDeref) ":" { return k; }

MapVal
    = _ val:(
        Atom
        / Quot
        / LitQuote
        / VarDeref
        / Map
//    	/ Set
    ) _ { return val; }

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
    = id:$(SymInit SymRest*) {
        return {type: NodeType.SYM, id};
    }

SymInit
    = Alpha
    / SymChars

SymRest
    = AlphaNum
    / SymChars

SymChars
    = [*?$%&/\|~<>=._+\-]

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
    = "'" body:Expr {
        return {type: NodeType.QUOT, body: [body]};
    }

Comment
    = "("+ body:$(!")" .)* ")" {
        return body.indexOf("--") > 0 ?
            { type: NodeType.STACK_COMMENT,
              body: body.split("--").map(x => x.trim().split(" "))
            } :
            { type: NodeType.COMMENT, body: body.trim()};
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
