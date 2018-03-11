import { IView } from "@thi.ng/atom/api";

/**
 * Status line component
 *
 * @param app
 * @param ui
 */
export function status(ui: any, view: IView<any>) {
    const [type, msg] = view.deref();
    return ["p", ui[type], msg];
}
