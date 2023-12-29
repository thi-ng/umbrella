import { ADD_ALT, CLOSE_OUTLINE } from "@thi.ng/hiccup-carbon-icons";
import { div, para } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { cycle } from "@thi.ng/transducers";
import { Draggable } from "./draggable";
import { Notification, type NotifyItem } from "./notification";

const messages = cycle<NotifyItem>([
	{ type: "info", msg: "All systems working" },
	{ type: "success", msg: "All your base are belong to us" },
	{ type: "warn", msg: "All files deleted" },
]);

const notify = new Notification();

const dragGroup = (id: string, icon: any) =>
	div(
		{ id },
		dropZone(
			id,
			new Draggable(div(".drag", null, icon), {
				ondrop: () => notify.update(messages.next().value!),
				dropzone: id,
				scope: id,
			})
		),
		dropZone(id),
		dropZone(id)
	);

const dropZone = (id: string, body?: any) =>
	div({ class: `dropzone`, data: { dropzone: id } }, body);

$compile(
	div(
		null,
		notify,
		para(null, "Drag & drop the icons..."),
		dragGroup("bank1", ADD_ALT),
		dragGroup("bank2", CLOSE_OUTLINE)
	)
).mount(document.getElementById("app")!);
