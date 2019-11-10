import { Fn0 } from "@thi.ng/api";
import { ICache } from "./api";

export class NullCache<T> implements ICache<T> {
    release() {
        return true;
    }

    *keys() {}

    set(_: number, val: T): T {
        return val;
    }

    get(_: number): T | undefined {
        return;
    }

    getSet(_: number, notFound: Fn0<T>): T {
        return notFound();
    }

    delete(_: number): boolean {
        return true;
    }
}
