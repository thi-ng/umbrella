import { ISubscriber } from "../api";

export function trace(prefix?: any): ISubscriber<any> {
    return {
        next(x) {
            prefix ? console.log(prefix, x) : console.log(x);
        },
        done() {
            prefix ? console.log(prefix, "done") : console.log("done");
        }
    }
}
