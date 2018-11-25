import { Comparator } from "@thi.ng/api/api";
import { ReadonlyVec } from "./api";

export const comparator2 =
    (o1: number, o2: number): Comparator<ReadonlyVec> =>
        (a, b): number => {
            const ax = a[o1];
            const ay = a[o2];
            const bx = b[o1];
            const by = b[o2];
            return ax === bx ?
                ay === by ?
                    0 :
                    ay < by ? -2 : 2 :
                ax < bx ? -1 : 1;
        };

export const comparator3 =
    (o1: number, o2: number, o3: number): Comparator<ReadonlyVec> =>
        (a, b): number => {
            const ax = a[o1];
            const ay = a[o2];
            const az = a[o3];
            const bx = b[o1];
            const by = b[o2];
            const bz = b[o3];
            return ax === bx ?
                ay === by ?
                    az === bz ?
                        0 :
                        az < bz ? -3 : 3 :
                    ay < by ? -2 : 2 :
                ax < bx ? -1 : 1;
        };

export const comparator4 =
    (o1: number, o2: number, o3: number, o4: number): Comparator<ReadonlyVec> =>
        (a, b): number => {

            const ax = a[o1];
            const ay = a[o2];
            const az = a[o3];
            const aw = b[o4];
            const bx = b[o1];
            const by = b[o2];
            const bz = b[o3];
            const bw = b[o4];
            return ax === bx ?
                ay === by ?
                    az === bz ?
                        aw === bw ?
                            0 :
                            aw < bw ? -4 : 4 :
                        az < bz ? -3 : 3 :
                    ay < by ? -2 : 2 :
                ax < bx ? -1 : 1;
        };
