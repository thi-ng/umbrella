import type { IEnable } from "../api/enable";
import type { Event } from "../api/event";
import { EVENT_DISABLE, EVENT_ENABLE } from "../constants";
import { mixin } from "../mixin";

interface _IEnable extends IEnable<any> {
    _enabled: boolean;
    notify?(e: Event): void;
}

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the
 * {@link @thi.ng/api#INotify} interface, {@link IEnable.enable} and
 * {@link IEnable.disable} will automatically emit the respective
 * events.
 */
export const IEnableMixin = mixin(<IEnable<any>>{
    _enabled: true,

    isEnabled(this: _IEnable) {
        return this._enabled;
    },

    enable(this: _IEnable) {
        this._enabled = true;
        if (this.notify) {
            this.notify({ id: EVENT_ENABLE, target: this });
        }
    },

    disable(this: _IEnable) {
        this._enabled = false;
        if (this.notify) {
            this.notify({ id: EVENT_DISABLE, target: this });
        }
    },

    toggle(this: _IEnable) {
        this._enabled ? this.disable() : this.enable();
        return this._enabled;
    },
});
