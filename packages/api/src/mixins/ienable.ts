import {
    Event,
    EVENT_DISABLE,
    EVENT_ENABLE,
    IEnable
} from "../api";
import { mixin } from "../mixin";

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the `INotify`
 * interface, `enable()` and `disable()` will automatically emit the
 * respective events.
 */
export const IEnableMixin = mixin(<IEnable<any>>{
    _enabled: true,

    isEnabled() {
        return this._enabled;
    },

    enable() {
        this._enabled = true;
        if (this.notify) {
            this.notify(<Event>{ id: EVENT_ENABLE, target: this });
        }
    },

    disable() {
        this._enabled = false;
        if (this.notify) {
            this.notify(<Event>{ id: EVENT_DISABLE, target: this });
        }
    },

    toggle() {
        this._enabled ? this.disable() : this.enable();
        return this._enabled;
    }
});
