import {
    Event,
    EVENT_ALL,
    INotify,
    Listener
} from "../api";
import { mixin } from "../mixin";

export const inotify_dispatch = (listeners: any[][], e: Event) => {
    if (!listeners) return;
    for (let i = 0, n = listeners.length, l; i < n; i++) {
        l = listeners[i];
        l[0].call(l[1], e);
        if (e.canceled) {
            return;
        }
    }
};

/**
 * Mixin class decorator, injects INotify default implementation, incl.
 * a lazily instantiated `_listeners` property object, storing
 * registered listeners.
 */
export const INotifyMixin = mixin(<INotify>{
    addListener(id: PropertyKey, fn: Listener, scope?: any) {
        let l = (this._listeners = this._listeners || {})[id];
        if (!l) {
            l = this._listeners[id] = [];
        }
        if (this.__listener(l, fn, scope) === -1) {
            l.push([fn, scope]);
            return true;
        }
        return false;
    },

    removeListener(id: PropertyKey, fn: Listener, scope?: any) {
        if (!this._listeners) return false;
        const l: any[][] = this._listeners[id];
        if (l) {
            const idx = this.__listener(l, fn, scope);
            if (idx !== -1) {
                l.splice(idx, 1);
                return true;
            }
        }
        return false;
    },

    notify(e: Event) {
        if (!this._listeners) return;
        e.target === undefined && (e.target = this);
        inotify_dispatch(this._listeners[e.id], e);
        inotify_dispatch(this._listeners[EVENT_ALL], e);
    },

    __listener(listeners: any[][], f: Listener, scope: any) {
        let i = listeners.length;
        while (--i >= 0) {
            const l = listeners[i];
            if (l[0] === f && l[1] === scope) {
                break;
            }
        }
        return i;
    }
});
