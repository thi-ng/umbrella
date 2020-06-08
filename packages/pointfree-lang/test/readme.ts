import { StackContext } from "@thi.ng/pointfree";
import * as pf from "../src";

const src = `
( helper words for forming 2D vectors )
: xy ( x y -- [x y] ) vec2 ;
: yx ( x y -- [y x] ) swap vec2 ;

( generate horizontal line coords )
: hline ( y w -- [0 y] [w y])
  over 0 yx -rot yx ;

( generate vertical line coords )
: vline ( x h -- [x 0] [x h])
  over 0 xy -rot xy ;

( generate haircross w/ FFI 'gfx.line' word )
: hairx ( x y w h -- [] )
  -rot [vline] [hline] bis2 [gfx.line] bia2;
`;

const drawLine = (ctx: StackContext) => {
    const stack = ctx[0];
    // minimum stack depth guard
    pf.ensureStack(stack, 2);
    // pop top 2 values
    const [x2, y2] = stack.pop();
    const [x1, y1] = stack.pop();
    console.log(`draw line: ${x1},${y1} -> ${x2},${y2}`);

    // if we had a canvas drawing context stored in env...
    // const canvasCtx = ctx[2].canvasContext;
    // canvasCtx.beginPath();
    // canvasCtx.moveTo(x1, y1);
    // canvasCtx.lineTo(x2, y2);
    // canvasCtx.stroke();

    // or alternatively generate SVG and push result on stack (or store in env)
    // stack.push(`<line x1="${x1}" y1="${y1} x2="${x2} y2="${y2}"/>`);
    return ctx;
};

// create new environment and associate custom FFI words
const env = pf.ffi(
    {},
    {
        "gfx.line": drawLine,
    }
);

// compile / execute source code w/ given env
// the compiled words will be stored in given env
pf.run(src, env);

// (optional, but that's how we do it here for example purposes)
// store some external state / config in env
// this could be modified via event handlers etc.
env.mouseX = 100;
env.mouseY = 200;
env.width = 640;
env.height = 480;

// now actually call the `hairx` word with args pulled from env
pf.run(`@mouseX @mouseY @width @height hairx`, env);

// or call precompiled word/function directly w/ given initial stack
pf.runWord("hairx", env, [100, 200, 640, 480]);
