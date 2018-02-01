export interface DiffLogPair extends Array<any> {
    [0]: number;
    [1]: any;
}

export interface DiffLogEntry extends Array<any> {
    [0]: number;
    [1]: DiffLogPair;
}

export interface DiffKeyMap {
    [id: number]: any;
}

export interface ArrayDiff {
    distance: number;
    adds: DiffKeyMap;
    dels: DiffKeyMap;
    const: DiffKeyMap;
    linear: DiffLogEntry[];
}

export interface ObjectDiff {
    distance: number;
    adds: string[];
    dels: string[];
    edits: [PropertyKey, any];
}
