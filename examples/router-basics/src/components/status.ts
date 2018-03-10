import { App } from "../app";

/**
 * Status line component
 * 
 * @param app
 * @param ui 
 */
export function status(app: App, ui: any) {
    const [type, msg] = app.views.status.deref();
    return ["p", ui[type], msg];
}