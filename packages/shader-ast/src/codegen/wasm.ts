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

    // const HEADER = [0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00];

    // const OP_CODES: IObjectOf<number> = {
    //     "i32.load": 0x28,
    //     "f32.load": 0x2a,
    //     "i32.load8": 0x2d,
    //     "i32.store": 0x36,
    //     "f32.store": 0x38,
    //     "i32.store8": 0x3a,
    //     "i32.const": 0x41,
    //     "f32.const": 0x43,

    //     "i32.eqz": 0x45,
    //     "i32.eq": 0x46,
    //     "i32.ne": 0x47,
    //     "i32.lt_s": 0x48,
    //     "i32.lt_u": 0x49,
    //     "i32.gt_s": 0x4a,
    //     "i32.gt_u": 0x4b,
    //     "i32.le_s": 0x4c,
    //     "i32.le_u": 0x4d,
    //     "i32.ge_s": 0x4e,
    //     "i32.ge_u": 0x4f,

    //     "f32.eq": 0x5b,
    //     "f32.ne": 0x5c,
    //     "f32.lt": 0x5d,
    //     "f32.gt": 0x5e,
    //     "f32.le": 0x5f,
    //     "f32.ge": 0x60,

    //     "i32.add": 0x6a,
    //     "i32.sub": 0x6b,
    //     "i32.mul": 0x6c,
    //     "i32.div_s": 0x6d,
    //     "i32.div_u": 0x6e,
    //     "i32.rem_s": 0x6f,
    //     "i32.rem_u": 0x70,
    //     "i32.and": 0x71,
    //     "i32.or": 0x72,
    //     "i32.xor": 0x73,
    //     "i32.shl": 0x74,
    //     "i32.shr_s": 0x75,
    //     "i32.shr_u": 0x76,

    //     "f32.abs": 0x8b,
    //     "f32.neg": 0x8c,
    //     "f32.ceil": 0x8d,
    //     "f32.floor": 0x8e,
    //     "f32.trunc": 0x8f,
    //     "f32.nearest": 0x90,
    //     "f32.sqrt": 0x91,
    //     "f32.add": 0x92,
    //     "f32.sub": 0x93,
    //     "f32.mul": 0x94,
    //     "f32.div": 0x95,
    //     "f32.min": 0x96,
    //     "f32.max": 0x97
    // };

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
