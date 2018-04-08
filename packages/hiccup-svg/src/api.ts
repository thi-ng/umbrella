export interface PathSegment extends Array<any> {
    [0]: string;
    [1]?: ArrayLike<number>[];
}
