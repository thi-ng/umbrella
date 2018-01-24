import { IID } from "@thi.ng/api/api";

export enum Level {
    FINE,
    DEBUG,
    INFO,
    WARN,
    SEVERE,
    NONE,
}

export interface LogEntry extends Array<any> {
    [0]: Level;
    [1]: string;
    [2]: number;
    [id: number]: any;
}

export interface LogEntryObj extends IID<string> {
    level: Level;
    time: number;
    body: any[];
}
