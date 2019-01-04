import { Match, RES_FAIL, RES_PARTIAL, Matcher, SeqCallback } from "./api";
import { success } from "./success";

export const not = <T, C, R>(
    match: Matcher<T, C, R>,
    callback?: SeqCallback<T, C, R>
): Matcher<T, C, R> =>
    () => {
        let m = match();
        const buf: T[] = [];
        return (ctx, x) => {
            buf.push(x);
            const { type } = m(ctx, x);
            return type === Match.FAIL ?
                success(callback && callback(ctx, buf)) :
                type !== Match.PARTIAL ?
                    // TODO Match.FULL_NC handling?
                    RES_FAIL :
                    RES_PARTIAL;
        }
    };
