import { Fn } from "@thi.ng/api";
import { Term } from "../api";
import { isMat, isVec } from "../ast";
import { defTarget } from "./target";

export const targetWASM = () => {
    type Stack = any[];

    const TYPES: any = {
        float: "f32",
        int: "i32",
        uint: "u32"
    };

    const OP_NAMES: any = {
        "+": "add",
        "-": "sub",
        "*": "mul",
        "/": "div"
    };

    let scopes: Stack[];
    const push = (...xs: any[]) => scopes[scopes.length - 1].push(...xs);

    const stackTX: Fn<Term<any>, void> = defTarget<void>(<any>{
        lit: (t: any) => {
            switch (t.type) {
                case "float":
                case "int":
                case "uint":
                    push([`${TYPES[t.type]}.const`, t.val]);
                    break;
                case "vec2":
                case "vec3":
                case "vec4":
                    (<any[]>t.val).forEach(stackTX);
                    push(["call", `$${t.type}${t.info || ""}`]);
                    break;
                default:
            }
        },

        op1: (t: any) => {
            stackTX(t.val);
            push(["call", `$${t.type}_${OP_NAMES[t.op]}1`]);
        },

        op2: (t: any) => {
            stackTX(t.l);
            stackTX(t.r);
            push(
                isVec(t) || isMat(t)
                    ? ["call", `$${t.type}_${OP_NAMES[t.op]}${t.info || ""}`]
                    : [`${TYPES[t.type]}.${OP_NAMES[t.op]}`]
            );
        },

        scope: (t: any) => {
            scopes.push([["call", "$begin_frame"]]);
            t.body.forEach(stackTX);
            push(["call", "$end_frame"]);
            push(scopes.pop());
        }
    });

    return (x: Term<any>) => {
        scopes = [[]];
        stackTX(x);
        return scopes;
    };
};

/*
wasm=ast.targetWASM()
wasm(ast.scope([ast.add(ast.neg(ast.vec3(ast.vec2(1), 2)), ast.mul(ast.float(2), ast.float(10)))]))[0]
[
  [
    [ 'call', '$begin_frame' ],
    [ 'f32.const', 1 ],
    [ 'call', '$vec2n' ],
    [ 'f32.const', 2 ],
    [ 'call', '$vec3vn' ],
    [ 'call', '$vec3_sub1' ],
    [ 'f32.const', 2 ],
    [ 'f32.const', 10 ],
    [ 'f32.mul' ],
    [ 'call', '$vec3_addvn' ],
    [ 'call', '$end_frame' ]
  ]
]

pointer free:

add(vec3(1,2,3), vec3(10,2 * 10,30))

f32.const 1
f32.const 10
f32.add
f32.const 2
f32.const 2
f32.const 10
f32.mul
f32.add
f32.const 3
f32.const 30
f32.add
call vec3
*/
