{
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
        / LineComment
        / Comment
        / Array
        / Obj
        / Atom
    ) _ { return ast(expr); }

Word
    = ":" __ id:Sym locals:LocalVars? body:NonWordExpr+ ";" {
        return { type: "word", id: id.id, locals, body};
    }

LocalVars
	= _ "^{" body:SymList+ "}" {
    	return body;
    }

SymList
	= _ id:Sym _ { return id.id; }

Array
    = "[" body:NonWordExpr* "]" {
        return { type: "array", body };
    }

Obj
    = "{" _ body:ObjPair* "}" {
        return { type: "obj", body };
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
        return {type: "nil", body: null};
    }

Boolean
    = $("T" / "F") {
        return {type: "boolean", body: text() == "T"};
    }

Sym
    = id:$((Alpha / SymChars) (AlphaNum / SymChars)*) {
        return {type: "sym", id};
    }

SymChars
    = [*?$%&#/\|~<>=_.+\-]

Var
    = VarDeref
    / VarStore

VarDeref
    = "@" id:Sym {
        return {type: "var_deref", id: id.id}
    }

VarStore
    = id:Sym "!" {
        return {type: "var_store", id: id.id}
    }

LitQuote
    = "'" body:NonWordExpr {
        return {type: "array", body: [body]};
    }

Comment
    = "("+ body:$(!")" .)* ")" {
        return body.indexOf("--") > 0 ?
            {
                type: "stack_comment",
                body: body.split("--").map(x => x.trim())
            } :
            {
                type: "comment",
                body: body.trim()
            };
    }

LineComment
    = "//" body:$(!"\n" .)* "\n" {
        return {
            type: "comment",
            body: body.trim()
        };
    }

String
    = "\"" body:$(!"\"" .)* "\"" {
        return {type: "string", body };
    }

Number
    = Hex
    / Binary
    / Decimal

Sign = [-+]

Binary
    = "0b" n:$[01]+ {
        return {type: "number", radix: 2, body: parseInt(n, 2)};
    }

Hex
    = "0x" n:$[0-9a-fA-F]+ {
        return {type: "number", radix: 16, body: parseInt(n, 16)};
    }

Int
    = Sign? Uint

Uint
    = Digit+

Decimal
    = Int ("." Uint?)? ("e" Int)? {
        return {type: "number", body: parseFloat(text())};
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
