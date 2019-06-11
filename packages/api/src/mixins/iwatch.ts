import {
    Fn3,
    IObjectOf,
    IWatch,
    Watch
} from "../api";
import { mixin } from "../mixin";

interface _IWatch extends IWatch<any> {
    _watches: IObjectOf<Watch<any>>;
}

export const IWatchMixin = mixin(<IWatch<any>>{
    addWatch(id: string, fn: Fn3<string, any, any, void>) {
        (<_IWatch>this)._watches = (<_IWatch>this)._watches || {};
        if ((<_IWatch>this)._watches[id]) {
            return false;
        }
        (<_IWatch>this)._watches[id] = fn;
        return true;
    },

    removeWatch(id: string) {
        if (!(<_IWatch>this)._watches) return;
        if ((<_IWatch>this)._watches[id]) {
            delete (<_IWatch>this)._watches[id];
            return true;
        }
        return false;
    },

    notifyWatches(oldState: any, newState: any) {
        if (!(<_IWatch>this)._watches) return;
        const w = (<_IWatch>this)._watches;
        for (let id in w) {
            w[id](id, oldState, newState);
        }
    }
});
