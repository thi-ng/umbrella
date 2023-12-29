import { ADD_ALT, CLOSE_OUTLINE, withSize } from "@thi.ng/hiccup-carbon-icons";
import { div, para } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { cycle } from "@thi.ng/transducers";
import { Draggable } from "./draggable";
import { Notification, type NotifyOpts } from "./notification";

const messages = cycle<NotifyOpts>([
	{ type: "info", msg: "All systems working" },
	{ type: "success", msg: "All your base are belong to us" },
	{ type: "warn", msg: "All files deleted" },
]);

const notify = new Notification();

const dragBank = (id: string, icon: any) =>
	div(
		{ id },
		dropZone(
			id,
			new Draggable(dragButton(icon), {
				scope: id,
				dropzone: id,
				ondrop: () => notify.update(<NotifyOpts>messages.next().value),
			})
		),
		dropZone(id),
		dropZone(id)
	);

const dropZone = (id: string, body?: any) =>
	div({ class: `dropzone`, data: { dropzone: id } }, body);

const dragButton = (icon: any) => div(".dragbt", null, withSize(icon, "2rem"));

$compile(
	div(
		null,
		notify,
		para(null, "Drag & drop the icons..."),
		dragBank("bank1", ADD_ALT),
		dragBank("bank2", CLOSE_OUTLINE)
	)
).mount(document.getElementById("app")!);
