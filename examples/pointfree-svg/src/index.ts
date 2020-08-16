import { serialize } from "@thi.ng/hiccup";
import * as svg from "@thi.ng/hiccup-svg";
import { ensureStack, maptos } from "@thi.ng/pointfree";
import { ffi, run } from "@thi.ng/pointfree-lang";
import { writeFileSync } from "fs";

// rudimentary generic graphics lib & helper words
const libsrc = `
( helper words for forming 2D vectors )
: xy ( x y -- [x y] ) vec2 ;
: yx ( x y -- [y x] ) swap vec2 ;

( appends a hiccup shape element to @shapes array )
: addshape ( s -- ) @shapes pushl drop ;

( creates hiccup element with 2 args & shape type )
: shape2 ( a b type -- ) -rot vec3 execjs addshape;

( transforms 2 points into a svg line )
: line ( a b -- ) @svg.line shape2 ;

( transforms point and radius into a svg circle )
: circle ( p r -- ) @svg.circle shape2 ;

( creates a horizontal line )
: hline ( y width -- ) over 0 yx -rot yx line ;

( creates a vertical line )
: vline ( x height -- ) over 0 xy -rot xy line ;

(
    2D grid loop construct
    executes body quot for each iteration
)
: loop2 ( cols rows body -- )
  >r [ over [ over cprd exec ] dotimes drop ] dotimes
  drop rdrop ;
`;

// user code to generate SVG graphic and write out as file
// the whole block has this stack effect:
//
// ( filename res -- )
const usersrc = `
( creates grid of lines with given grid res )
: grid ( res -- )
  dup [10 * 100 dup2 hline vline] dotimes ;

(
    creates triangular grid of circles with given grid res
    only creates circles for grid cells where x <= y
)
: circlegrid ( res -- )
  dup [dup2 <= [xy 10 v* 3 circle] [drop2] if] loop2 ;

grid circlegrid

( create SVG root element in hiccup format )
[@svg.svg {width: 200, height: 200, stroke: "#f04", fill: "none"}]

( concat generated shapes )
@shapes cat

(
    execute entire quotation as JS function,
    i.e call @svg.svg with all remaining values in quot / array
)
execjs

( serialize hiccup format to SVG and write to disk )
serialize swap write-file
`;

// initialize environment and pre-compile library source
const env = ffi(
    // predefined variables
    {
        "svg.line": svg.line,
        "svg.circle": svg.circle,
        "svg.svg": svg.svg,
        shapes: [],
    },
    // foreign function interface (FFI)
    // custom words usable by the DSL
    {
        // ( svgdom -- svgstring )
        serialize: maptos(serialize),
        // ( body filename -- )
        "write-file": (ctx) => {
            const stack = ctx[0];
            ensureStack(stack, 2);
            writeFileSync(stack.pop(), stack.pop());
            return ctx;
        },
    }
);
// compile lib (resulting words are stored in env)
run(libsrc, env);

// compile & execute user code with given stack params
run(usersrc, env, ["output.svg", 21]);
