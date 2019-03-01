import { IDeref } from "@thi.ng/api";

export const delay = <T>(body: () => T) => new Delay<T>(body);

export class Delay<T> implements IDeref<T> {
    value: T;
    protected body: () => T;
    protected realized: boolean;

    constructor(body: () => T) {
        this.body = body;
        this.realized = false;
    }

    deref() {
        if (!this.realized) {
            this.value = this.body();
            this.realized = true;
        }
        return this.value;
    }

    isRealized() {
        return this.realized;
    }
}
