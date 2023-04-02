import { exposeGlobal } from "@thi.ng/expose";
import { div } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { THEME } from "./api";
import { exportControls } from "./components/export";
import { imageControls } from "./components/image";
import { layerControls } from "./components/layer";
import { presetControls } from "./components/presets";
import { stats } from "./components/stats";
import { DB } from "./state/atom";
import { initGestures, resizeCanvas } from "./state/canvas";
import { canvasState, scene } from "./state/process";
import { ConsoleLogger } from "@thi.ng/logger";
import { setLogger } from "@thi.ng/rstream";

setLogger(new ConsoleLogger("rs"));

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
			presetControls,
			imageControls,
			layerControls,
			exportControls
		),
		div(
			".dib",
			{},
			$canvas(
				scene,
				canvasState.map((x) => x.size),
				{ id: "viz", onmount: initGestures }
			)
		),
		stats
	)
).mount(document.getElementById("app")!);

window.addEventListener("resize", resizeCanvas);

// Only for dev builds:
// Expose DB as global var to be able to inspect via console
exposeGlobal("DB", DB);
exposeGlobal("THEME", THEME);
