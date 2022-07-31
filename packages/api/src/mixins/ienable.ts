import { EVENT_DISABLE, EVENT_ENABLE } from "../api.js";
import type { IEnable } from "../enable.js";
import type { Event } from "../event.js";
import { mixin } from "../mixin.js";

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
		$enable(this, true, EVENT_ENABLE);
	},

	disable(this: _IEnable) {
		$enable(this, false, EVENT_DISABLE);
	},

	toggle(this: _IEnable) {
		this._enabled ? this.disable() : this.enable();
		return this._enabled;
	},
});

const $enable = (target: _IEnable, state: boolean, id: string) => {
	target._enabled = state;
	if (target.notify) {
		target.notify({ id, target });
	}
};
