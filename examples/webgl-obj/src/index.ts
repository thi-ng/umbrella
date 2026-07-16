import { typedArrayOfVec } from "@thi.ng/api";
import { defArcBall, defArcballController } from "@thi.ng/arcball";
import { parseOBJFromStream } from "@thi.ng/geom-io-obj";
import { button, div } from "@thi.ng/hiccup-html";
import { ConsoleLogger } from "@thi.ng/logger";
import { perspective } from "@thi.ng/matrices";
import { $compile, $wrapEl } from "@thi.ng/rdom";
import { fromRAF } from "@thi.ng/rstream";
import {
	clearCanvas,
	compileModel,
	draw,
	glCanvas,
	LAMBERT,
	LOGGER,
	type GLMat4,
} from "@thi.ng/webgl";
import MODEL_URL from "./bunny-normals.obj?url";

// enable logger for debugging webgl
// LOGGER.set(new ConsoleLogger());

// create webgl canvas
const { gl, canvas } = glCanvas({
	width: window.innerWidth - 32,
	height: window.innerHeight - 100,
});

const loadModel = async () => {
	document.getElementById("btload")!.remove();

	// parse OBJ model directly from fetch response stream
	const response = await fetch(MODEL_URL);
	const objModel = await parseOBJFromStream(response.body!, {
		objects: false,
		groups: false,
		tessellate: true,
	});
	// build & compile WebGL model spec
	const faces = objModel.objects[0].groups[0].faces;
	const model = compileModel(gl, {
		attribs: {
			position: {
				data: typedArrayOfVec("f32", objModel.vertices),
				type: "f32",
				size: 3,
			},
			normal: {
				data: typedArrayOfVec("f32", objModel.normals),
				type: "f32",
				size: 3,
			},
		},
		indices: {
			data: typedArrayOfVec(
				"u32",
				faces.map((f) => f.v)
			),
		},
		shader: LAMBERT(),
		num: faces.length * 3,
		uniforms: {
			proj: <GLMat4>(
				perspective([], 60, canvas.width / canvas.height, 0.01, 100)
			),
		},
	});

	const arcball = defArcBall(canvas.width, canvas.height, {
		eyeDist: 3,
		initial: [0, 1, 0, 0],
	});

	// redraw function, uses arcball's current view matrix
	const redraw = () => {
		model.uniforms!.view = <GLMat4>arcball.viewMat;
		clearCanvas(gl, [0.6, 0.8, 1, 1]);
		draw(model);
	};

	// initial draw
	redraw();

	// attach arcball controller to canvas to allow user to update view.
	// this is an abstraction over both mouse, touch and wheel events.
	// in our case the scene will only be redrawn when required...
	defArcballController(canvas, arcball, {
		minZoom: 1.5,
		maxZoom: 4,
		onUpdate: redraw,
	});
};

await $compile(
	div(
		{},
		// frame counter
		div({}, "frame: ", fromRAF()),
		// button to trigger model loading
		div({}, button({ id: "btload", onclick: loadModel }, "Load OBJ")),
		// webgl canvas
		$wrapEl(canvas)
	)
).mount(document.getElementById("app")!);
