import { ADD_ALT } from "@thi.ng/hiccup-carbon-icons/add-alt";
import { CLOSE_OUTLINE } from "@thi.ng/hiccup-carbon-icons/close-outline";
import { withSize } from "@thi.ng/hiccup-carbon-icons/utils/with-size";
import { div } from "@thi.ng/hiccup-html/blocks";
import { $compile } from "@thi.ng/rdom/compile";
import { cycle } from "@thi.ng/transducers/cycle";
import { Draggable } from "./draggable";
import { Notification, NotifyOpts } from "./notification";

const messages = cycle<NotifyOpts>([
    { type: <const>"info", msg: "All systems working" },
    { type: <const>"success", msg: "All your base are belong to us" },
    { type: <const>"warn", msg: "All files deleted" },
]);

const notify = new Notification();

const dragBank = (id: string, col1: string, col2: string, icon: any) =>
    div(
        { id },
        dropZone(
            col1,
            id,
            new Draggable(dragButton(icon), {
                scope: id,
                dropzone: id,
                hover: { background: col2 },
                ondrop: () => notify.update(<NotifyOpts>messages.next().value),
            })
        ),
        dropZone(col1, id),
        dropZone(col1, id)
    );

const dropZone = (col: string, id: string, body?: any) =>
    div(
        { class: `v-top dib mr2 w4 h4 pa4 bg-${col}`, data: { dropzone: id } },
        body
    );

const dragButton = (icon: any) =>
    div(
        { class: "w3 h3 bg-black white flex items-center justify-center" },
        withSize(icon, "24px")
    );

$compile(
    div(
        null,
        notify,
        div(".mv2", null, "Drag & drop the icons..."),
        dragBank("bank1", "red", "cyan", ADD_ALT),
        dragBank("bank2", "blue", "orange", CLOSE_OUTLINE)
    )
).mount(document.getElementById("app")!);
