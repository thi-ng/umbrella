import { isArray, isFunction } from "@thi.ng/checks";
import { ASTNode, ASTOpts, generateAST } from "@thi.ng/gp";
import { SYSTEM } from "@thi.ng/random";
import {
    $,
    $x,
    abs,
    add,
    assign,
    div,
    exp,
    fract,
    mix,
    mod,
    mul,
    neg,
    normalize,
    pow,
    ret,
    sin,
    smoothstep,
    sqrt,
    sub,
    sym,
    Term,
    vec3,
    Vec3Sym,
    Vec3Term,
    vec4
} from "@thi.ng/shader-ast";
import { fragUV, snoiseVec3 } from "@thi.ng/shader-ast-stdlib";
import { glCanvas } from "@thi.ng/webgl";
import { MainImageFn, shaderToy } from "@thi.ng/webgl-shadertoy";

const MAX_DEPTH = 10;
const NORM_SCALE = 1;

// unary functions
const OP1 = [
    abs,
    exp,
    neg,
    normalize,
    sin,
    sin,
    sin,
    snoiseVec3,
    sqrt,
    (x: Vec3Term) => $(x, "zyx"),
    (x: Vec3Term) => $(x, "yzx"),
    (x: Vec3Term) => $(x, "xyx"),
    (x: Vec3Term) => $(x, "yzy"),
    (x: Vec3Term) => $(x, "xxx"),
    (x: Vec3Term) => $(x, "yyy"),
    (x: Vec3Term) => $(x, "zzz")
];
// binary functions
const OP2 = [add, div, mul, mod, pow, sub];
// ternary functions
const OP3 = [mix, smoothstep];

// place holder for fragment UV var in shader
const UV: Vec3Sym = sym(vec3());

// AST generation config
const AST_OPTS: ASTOpts<Function, Vec3Term> = {
    terminal: (rnd) =>
        rnd.float() < 0.5
            ? UV
            : vec3(
                  rnd.norm(NORM_SCALE),
                  rnd.norm(NORM_SCALE),
                  rnd.norm(NORM_SCALE)
              ),
    op1: (rnd) => OP1[rnd.int() % OP1.length],
    op2: (rnd) => OP2[rnd.int() % OP2.length],
    op3: (rnd) => OP3[rnd.int() % OP3.length],
    op4: () => <any>null,
    probs: [0.45, 0.4, 0.1, 0],
    isOp: isFunction,
    rnd: SYSTEM
};

const transpile = (node: ASTNode<Function, Vec3Term>): Term<any> =>
    isArray(node)
        ? node[0].apply(
              null,
              node.slice(1).map((x) => transpile(<Vec3Term>x))
          )
        : node;

const shaderFunction = (): MainImageFn => (gl, unis) => {
    return [
        UV,
        assign(
            UV,
            vec3(
                fragUV(gl.gl_FragCoord, unis.resolution),
                $x(add(unis.mouse, fract(unis.time)))
            )
        ),
        ret(vec4(transpile(generateAST(AST_OPTS, MAX_DEPTH)), 1))
    ];
};

const canvas = glCanvas({
    width: 640,
    height: 640,
    parent: document.body,
    version: 1
});

const toy = shaderToy({
    canvas: canvas.canvas,
    gl: canvas.gl,
    main: shaderFunction()
});

toy.start();

setInterval(() => {
    toy.recompile(shaderFunction());
}, 1000);
