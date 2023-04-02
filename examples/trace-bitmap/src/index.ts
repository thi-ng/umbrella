import { exposeGlobal } from "@thi.ng/expose";
import { div, h3 } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { THEME } from "./api";
import { exportControls } from "./components/export";
import { imageControls } from "./components/image";
import { layerControls } from "./components/layer";
import { presetControls } from "./components/presets";
import { stats } from "./components/stats";
import { DB } from "./state/atom";
import { initGestures, resetCanvasView, resizeCanvas } from "./state/canvas";
import { canvasState, scene } from "./state/process";

// setLogger(new ConsoleLogger("rs"));

//////////////////////////////// IMPORTANT! ////////////////////////////////////
// Please ensure you read the detailed comments in /src/state.ts and
// /src/state/*.ts to understand how the different parts of this app are fitting
// together! This file here only sets up the toplevel UI.
////////////////////////////////////////////////////////////////////////////////

$compile(
	div(
		{ class: "vh-100 flex f7" },
		div(
			{
				class: THEME.sideBar.root,
			},
			h3({ class: THEME.sideBar.title }, "thi.ng/geom-trace-bitmap"),
			imageControls,
			presetControls,
			layerControls,
			exportControls
		),
		$canvas(
			scene,
			canvasState.map((x) => x.size),
			{ onmount: initGestures }
		),
		stats
	)
).mount(document.getElementById("app")!);

window.addEventListener("resize", resizeCanvas);

window.addEventListener("keydown", (e) => {
	switch (e.key.toLowerCase()) {
		case "h":
			resetCanvasView();
			break;
	}
});

// Only for dev builds:
// Expose DB as global var to be able to inspect via console
exposeGlobal("DB", DB);
exposeGlobal("THEME", THEME);
