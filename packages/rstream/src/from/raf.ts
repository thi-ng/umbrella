import { Stream } from "../stream";

export function fromRAF() {
    return new Stream<number>((o) => {
        let i = 0, id,
            isActive = true,
            loop = () => {
                isActive && o.next(i++);
                isActive && (id = requestAnimationFrame(loop));
            };
        id = requestAnimationFrame(loop);
        return () => (isActive = false, cancelAnimationFrame(id));
    }, `raf-${Stream.NEXT_ID++}`);
}
