import { CONFIG, UI } from "./config";
import { App } from "./app";

class DemoApp extends App {

    rootComponent() {
        return ["div", UI.root,
            this.views.routeComponent.deref(),
            this.views.jsonState.deref()
        ]
    }
}

new DemoApp(CONFIG).start();
