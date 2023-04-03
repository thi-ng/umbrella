import { exposeGlobal } from "@thi.ng/expose";
import { div, h3 } from "@thi.ng/hiccup-html";
import { ConsoleLogger } from "@thi.ng/logger";
import { $compile } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { setLogger } from "@thi.ng/rstream";
import { THEME } from "./api";
import { exportControls } from "./components/export";
import { imageControls } from "./components/image";
import { layerControls } from "./components/layer";
import { presetControls } from "./components/presets";
import { stats } from "./components/stats";
import { DB } from "./state/atom";
import { initGestures, resetCanvasView, resizeCanvas } from "./state/canvas";
import { canvasState, scene } from "./state/process";
import { visualizeTopology } from "./state/viz";

// enable for logging all thi.ng/rstream constructs
// setLogger(new ConsoleLogger("rs", "INFO"));

//////////////////////////////// IMPORTANT! ////////////////////////////////////
// Please ensure you read the detailed comments in /src/components/*.ts and
// /src/state/*.ts to understand how the different parts of this app are fitting
// together! This file here only sets up the toplevel UI.
////////////////////////////////////////////////////////////////////////////////

$compile(
	div(
		{ class: THEME.root },
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
			canvasState.map((x) => x.size, { id: "size" }),
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
		case "v":
			// only enable in dev build
			if (import.meta.env.DEV) visualizeTopology();
			break;
	}
});

// Only for dev builds:
// Expose global vars to be able to inspect via console
exposeGlobal("DB", DB);
exposeGlobal("THEME", THEME);
