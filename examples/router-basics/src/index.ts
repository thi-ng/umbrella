import { CONFIG } from "./config";
import { App } from "./app";

import { debugContainer } from "./components/debug-container";
import { nav } from "./components/nav";

/**
 * Specialization of generic base app for our demo purposes
 * Only the `rootComponent()` method needs to be implemented.
 */
class DemoApp extends App {

    rootComponent() {
        const debug = this.views.debug.deref();
        const ui = this.config.ui;
        return ["div", ui.root,
            ["div", ui.column.content[debug],
                [nav, this, ui.nav],
                this.views.routeComponent.deref()],
            [debugContainer, this, ui, debug, this.views.json],
        ];
    }
}

new DemoApp(CONFIG).start();
