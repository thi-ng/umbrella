import { Match, RES_FAIL, RES_PARTIAL, Matcher } from "./api";
import { success } from "./success";

export const not =
    <T, C, R>(match: Matcher<T, C, R>, callback?): Matcher<T, C, R> =>
        () => {
            let m = match();
            return (ctx, x) => {
                const { type } = m(ctx, x);
                return type === Match.FAIL ?
                    success(callback && callback(ctx)) :
                    type !== Match.PARTIAL ?
                        // TODO Match.FULL_NC handling?
                        RES_FAIL :
                        RES_PARTIAL;
            }
        };
