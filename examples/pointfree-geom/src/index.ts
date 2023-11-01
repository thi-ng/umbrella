import { FMT_yyyyMMdd_HHmmss } from "@thi.ng/date";
import { downloadWithMime } from "@thi.ng/dl-asset";
import { asSvg, svgDoc, withAttribs } from "@thi.ng/geom";
import { button, div, textArea } from "@thi.ng/hiccup-html";
import { $compile, $input } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF, reactive, sync } from "@thi.ng/rstream";
import { splice } from "@thi.ng/strings";
import { evalSketch } from "./lang.js";

// canvas size
const W = Math.min(~~(window.innerWidth * 0.6), window.innerHeight - 40);
// date formatter
const FMT = FMT_yyyyMMdd_HHmmss;

// key event handler to toggle line comments in the textarea editor:
// when either `ctrl + /` or `command + /` is pressed, checks if current line is
// prefixed with a line comment and either removes or inserts it
// (for better live coding experience)...
const handleEditorKeys = (e: KeyboardEvent) => {
	if ((e.ctrlKey || e.metaKey) && e.key === "/") {
		const editor = <HTMLTextAreaElement>e.target;
		let selStart = editor.selectionStart - 1;
		let body = editor.value;
		const lineStart = body.lastIndexOf("\n", selStart) + 1;
		if (editor.value.substring(lineStart, lineStart + 2) == "//") {
			body = splice(body, "", lineStart, lineStart + 2);
			// update cursor position
			selStart += selStart === lineStart - 1 ? 1 : -1;
		} else {
			body = splice(body, "//", lineStart);
			selStart += 3;
		}
		src.next(body);
		editor.selectionStart = editor.selectionEnd = selStart;
	}
};

// serialize geometry to SVG and trigger file download
const downloadSvg = () =>
	downloadWithMime(
		`${FMT()}-pointfree-geom.svg`,
		asSvg(svgDoc({}, withAttribs(geo.deref()!, { stroke: "#000" }))),
		{ mime: "image/svg+xml" }
	);

// reactive wrapper for the source code of our example sketch written in a
// Forth-like geometry generation language. the geometry DSL based on
// thi.ng/pointfree-lang and various geometry specific extensions defined in
// /src/lang.ts - the editor textarea and sketch runtime/interpreter will
// subscribe to changes of this value (the canvas indirectly too, via the
// interpreter result...)
// lines prefixed with `//` are comments, for the rest of the syntax, please
// consult the detailed thi.ng/pointfree and thi.ng/pointfree-lang readme's!
const src = reactive(`
// Forth-like DSL for 2D geometry generation
// please consult the detailed readme's for:
// https://thi.ng/pointfree & https://thi.ng/pointfree-lang

// line comments can be toggled via ctrl+/ or cmd+/

// math helpers
: fract ( x -- y ) 1 mod ;
: normf ( f x -- y ) * fract ;
: normtau ( f x -- rad ) normf tau * ;
: madd ( a b c -- a+b*c ) * +;

// stateless sine oscillator
: osc-sin ( dc amp freq x -- y ) normtau sin madd ;

// timebased vertex distortion/rotation
: wave ^{ pos amp freq }
    0 @amp time cos * @freq @pos .y osc-sin
    0 @amp time sin * @freq @pos .x osc-sin
    vec2
    translate-tx ;

// timebased shape scaling effect
: squares ^{ pos amp freq }
    0.5 @amp @freq @pos .x time 100 madd osc-sin
    0.5 @amp @freq @pos .y time 100 madd osc-sin * ;

// hex grid generation
6 npoly [ hex 60 regular ] 16 16 grid
// scale shapes individually (to create spacing)
// 0.9 scale-center

// timebased shape tessellation (insetting)
0.5 0.5 0.2 time osc-sin inset
// additional tessellators
// trifan
// quadfan

// apply global wave deformation
// [ 50 0.0025 wave ] transform-points
// apply global shape scaling
// [ 0.45 0.002 squares ] scale-center
`);

// reactive stream combinator: combines the source code with a throwaway
// requestAnimationFrame()-based counter, then passes source code to the DSL
// interpreter and returns the result (i.e. some form of 2d geometry, if all
// goes well and there were no errors... :)
const geo = sync({ src: { src, _: fromRAF() } }).map(({ src }) =>
	evalSketch(src)
);

// create & mount UI/DOM components (using tachyons.io CSS classes)
$compile(
	div(
		".flex.vh-100",
		{},
		// editor component subscribes to source code changes but also feeds
		// them back. we also add the custom key handler here to toggle line
		// comments
		textArea(
			".db.flex-grow-1.vh-100.pa2.bg-near-black.light-blue.bn.code.f6",
			{
				value: src,
				oninput: $input(src),
				onkeydown: handleEditorKeys,
			}
		),
		div(
			".flex-grow-0",
			{},
			// reactive canvas component (subscribes to `geo` and redraws when changed)
			$canvas(geo, [W, W]),
			// SVG download button
			button(
				".db.w-100.pa2.bg-white.black.bn.code.f6",
				{ onclick: downloadSvg },
				"Download SVG"
			)
		)
	)
).mount(document.getElementById("app")!);
