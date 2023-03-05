import { start } from "@thi.ng/hdom";
import { getInUnsafe, setInUnsafe } from "@thi.ng/paths";

interface ButtonAttribs {
	// unique button id / local state path
	id: string;
	onclick?: EventListener;
}

// stateless button component which stores its local state under an
// unique key in the global hdom user context.
const button = (
	ctx: any,
	attribs: ButtonAttribs,
	label: string,
	tooltip: string
) => {
	// attempt to read local state
	let local = getInUnsafe(ctx.__local, attribs.id);
	// create if not yet present
	if (!local) {
		ctx.__local = setInUnsafe(
			ctx.__local,
			attribs.id,
			(local = { tooltip: false })
		);
	}
	return [
		"a.dib.w4.pa2.mr3.white.bg-blue.hover-black.hover-bg-yellow.bg-animate",
		{
			onclick: attribs.onclick,
			onmouseenter: () => (local.tooltip = true),
			onmouseleave: () => (local.tooltip = false),
		},
		local.tooltip ? tooltip : label,
	];
};

const APP = [
	"div.ma3.sans-serif",
	// the ID attrib defines the local state path for these buttons
	// it will be used to lookup state in the hdom user context object
	// passed to each component function
	[button, { id: "button.help" }, "Help", "Whazzup?!"],
	[button, { id: "button.logout" }, "Logout", "See ya!"],
];

// start app and define context object skeleton
start(APP, { ctx: { __local: {} } });
