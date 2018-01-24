import { mixin } from "../mixin";

// tslint:disable-next-line
export const IWatch = mixin({
    addWatch(id: string, fn: (id: string, oldState: any, newState: any) => void) {
        this._watches = this._watches || {};
        this._watches[id] = fn;
    },
    removeWatch(id: string) {
        this._watches = this._watches || {};
        delete this._watches[id];
    },
    notifyWatches(oldState: any, newState: any) {
        const w = (this._watches = this._watches || {}),
            keys = Object.keys(w);
        for (let i = keys.length - 1; i >= 0; i--) {
            const id = keys[i];
            w[id](id, oldState, newState);
        }
    },
});
