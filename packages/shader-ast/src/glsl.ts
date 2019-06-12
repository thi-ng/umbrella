import { Fn } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { defmulti } from "@thi.ng/defmulti";
import {
    Access,
    Func,
    FunCall,
    FuncArg,
    FuncReturn,
    Lit,
    Op1,
    Op2,
    Sym,
    Term,
    Type
} from "./api";

/**
 * GLSL code gen.
 *
 * @param version
 */
export const emitGLSL = (_ = 300): Fn<Term<any>, string> => {
    const TYPE_NAMES: any = {
        f32: "float",
        i32: "int",
        u32: "uint"
    };

    const emitType = (t: Type) => TYPE_NAMES[t] || t;

    const emitVec = (v: Term<"f32">[]) =>
        `vec${v.length}(${v
            .slice(0, v[3] ? 4 : v[2] ? 3 : v[1] ? 2 : 1)
            .map(emit)
            .join(", ")})`;

    const emit = defmulti<Term<any>, string>((x) => x.tag);

    emit.add("sym", (t) => (<Sym<any>>t).id);

    emit.add("lit", (t) => {
        const v = (<Lit<any>>t).val;
        switch (t.type) {
            case "bool":
                return String(!!v);
            case "f32":
                return isNumber(v)
                    ? v === Math.trunc(v)
                        ? v + ".0"
                        : String(v)
                    : emit(v);
            case "i32":
            case "u32":
                return isNumber(v) ? String(v) : emit(v);
            case "vec2":
            case "vec3":
            case "vec4":
                return emitVec(v);
            default:
                throw new Error(`unknown type: ${t.type}`);
        }
    });
    // prettier-ignore
    emit.add("access",
        (t) => `${emit((<Access<any>>t).val)}.${(<Access<any>>t).id}`
    );
    // prettier-ignore
    emit.add("call",
        (t) => `${(<FunCall<any>>t).id}(${(<FunCall<any>>t).args.map(emit).join(", ")})`
    );
    // prettier-ignore
    emit.add("op1",
        (t) => `${(<Op1<any>>t).op}${emit((<Op1<any>>t).val)}`
    );
    // prettier-ignore
    emit.add("op2",
        (t) => `(${emit((<Op2<any>>t).l)} ${(<Op2<any>>t).op} ${emit((<Op2<any>>t).r)})`
    );

    emit.add("fn", (t) => {
        const fn = <Func<any>>t;
        return `${emitType(fn.type)} ${fn.id}(${fn.args.map(emit).join(", ")}) {
${fn.body.map(emit).join(";\n")}${fn.body.length ? ";" : ""}
}`;
    });

    emit.add("arg", (t) => {
        const a = <FuncArg<any>>t;
        return `${a.q ? a.q + " " : ""}${emitType(a.type)} ${a.id}`;
    });

    emit.add("ret", (t) => {
        const val = (<FuncReturn<any>>t).val;
        return "return" + (val ? " " + emit(val) : "");
    });

    return emit;
};
