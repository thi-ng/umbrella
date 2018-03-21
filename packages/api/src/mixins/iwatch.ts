import * as api from "../api";
import { mixin } from "../mixin";

export const IWatch = mixin(<api.IWatch<any>>{

    addWatch(id: string, fn: (id: string, oldState: any, newState: any) => void) {
        this._watches = this._watches || {};
        if (this._watches[id]) {
            return false;
        }
        this._watches[id] = fn;
        return true;
    },

    removeWatch(id: string) {
        if (!this._watches) return;
        if (this._watches[id]) {
            delete this._watches[id];
            return true;
        }
        return false;
    },

    notifyWatches(oldState: any, newState: any) {
        if (!this._watches) return;
        const w = this._watches;
        for (let id in w) {
            w[id](id, oldState, newState);
        }
    }

});
