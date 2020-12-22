import { AST, ASTNode, ASTOpts } from "@thi.ng/gp";
import { roundTo } from "@thi.ng/math";
import { IRandom, SYSTEM } from "@thi.ng/random";
import {
    $,
    abs,
    acos,
    add,
    asin,
    assign,
    cos,
    distance,
    div,
    exp,
    fract,
    inversesqrt,
    length,
    log,
    mix,
    mod,
    mul,
    neg,
    normalize,
    pow,
    ret,
    sin,
    sqrt,
    sub,
    sym,
    tan,
    Term,
    vec3,
    Vec3Sym,
    Vec3Term,
    vec4,
} from "@thi.ng/shader-ast";
import {
    clamp11,
    fragUV,
    snoise3,
    snoiseVec3,
} from "@thi.ng/shader-ast-stdlib";
import { glCanvas } from "@thi.ng/webgl";
import {
    MainImageFn,
    shaderToy,
    ShaderToyUniforms,
} from "@thi.ng/webgl-shadertoy";

const MAX_DEPTH = 11;
const NORM_SCALE = 1;

// unary functions
const OP1 = [
    abs,
    exp,
    neg,
    normalize,
    sin,
    cos,
    snoiseVec3,
    tan,
    fract,
    (x: Vec3Term) => vec3(snoise3(x)),
    (x: Vec3Term) => sub(1, clamp11(x)),
    (x: Vec3Term) => vec3(length(x)),
    (x: Vec3Term) => log(abs(x)),
    (x: Vec3Term) => inversesqrt(abs(x)),
    (x: Vec3Term) => sqrt(abs(x)),
    (x: Vec3Term) => asin(clamp11(x)),
    (x: Vec3Term) => acos(clamp11(x)),
    (x: Vec3Term) => $(x, "zyx"),
    (x: Vec3Term) => $(x, "yzx"),
    (x: Vec3Term) => $(x, "yxz"),
    (x: Vec3Term) => $(x, "xxx"),
    (x: Vec3Term) => $(x, "yyy"),
    (x: Vec3Term) => $(x, "zzz"),
];
// binary functions
const OP2 = [
    add,
    sub,
    mul,
    div,
    mod,
    pow,
    (x: Vec3Term, y: Vec3Term) => vec3(distance(x, y)),
];
// ternary functions
const OP3 = [mix];

// place holder for fragment UV var in shader
const UV: Vec3Sym = sym(vec3());

const randomFn = (ops: Function[]) => (rnd: IRandom) =>
    ops[rnd.int() % ops.length];

// AST generation config
const AST_OPTS: ASTOpts<Function, Vec3Term> = {
    terminal: (rnd) =>
        rnd.float() < 0.5
            ? UV
            : vec3(
                  roundTo(rnd.norm(NORM_SCALE), 0.01),
                  roundTo(rnd.norm(NORM_SCALE), 0.01),
                  roundTo(rnd.norm(NORM_SCALE), 0.01)
              ),
    ops: [
        { fn: randomFn(OP1), arity: 1, prob: 0.4 },
        { fn: randomFn(OP2), arity: 2, prob: 0.4 },
        { fn: randomFn(OP3), arity: 3, prob: 0.1 },
    ],
    maxDepth: MAX_DEPTH,
    probMutate: 0.01,
};

const transpile = (node: ASTNode<Function, Vec3Term>): Term<any> =>
    node.type === "op"
        ? node.op.apply(null, node.args.map(transpile))
        : node.value;

const shaderFunction = (
    ast: ASTNode<Function, Vec3Term>
): MainImageFn<ShaderToyUniforms> => (gl, unis) => {
    return [
        UV,
        assign(
            UV,
            vec3(
                fragUV(gl.gl_FragCoord, unis.resolution),
                mul(1, fract(unis.time))
            )
        ),
        ret(vec4(abs(transpile(ast)), 1)),
        // ret(vec4(fit1101(normalize(transpile(ast))), 1))
    ];
};

const ast = new AST(AST_OPTS);
let currTree = ast.randomAST();

const canvas = glCanvas({
    width: 640,
    height: 640,
    parent: document.body,
    version: 1,
});

const toy = shaderToy({
    canvas: canvas.canvas,
    gl: canvas.gl,
    main: shaderFunction(currTree),
});

toy.start();

const update = () => {
    console.clear();
    // currTree = ast.randomAST();
    currTree =
        SYSTEM.float() < 0.9
            ? ast.mutate(currTree, SYSTEM.minmax(1, 4))
            : ast.crossoverSingle(currTree, ast.randomAST())[0];
    toy.recompile(shaderFunction(currTree));
};

setInterval(update, 500);

// canvas.canvas.addEventListener("click", update);
