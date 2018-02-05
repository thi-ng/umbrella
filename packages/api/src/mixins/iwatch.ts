import { mixin } from "../mixin";

// tslint:disable-next-line
export const IWatch = mixin({
    addWatch(id: string, fn: (id: string, oldState: any, newState: any) => void) {
        this._watches = this._watches || {};
        if (this._watches[id]) {
            return false;
        }
        this._watches[id] = fn;
        return true;
    },
    removeWatch(id: string) {
        this._watches = this._watches || {};
        if (this._watches[id]) {
            delete this._watches[id];
            return true;
        }
        return false;
    },
    notifyWatches(oldState: any, newState: any) {
        const w = (this._watches = this._watches || {});
        const keys = Object.keys(w);
        for (let i = keys.length - 1; i >= 0; i--) {
            const id = keys[i];
            w[id](id, oldState, newState);
        }
    },
});
