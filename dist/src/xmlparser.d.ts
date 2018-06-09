export declare type bufferType = string | any;
export interface XMLBuilder {
    beginNode(name: string, buffer_index?: number): any;
    setAttribute(name: string, value: bufferType, buffer_index?: number): any;
    addTextNode(value: string, buffer_index?: number): any;
    closeNode(name: string, buffer_index?: number): any;
    eof(): any;
}
export declare class XMLParser {
    __len: number;
    buff_index: number;
    used_index: number;
    parents: any[];
    tag_depth: number;
    buff: bufferType;
    i: number;
    eof: boolean;
    buffers: bufferType[];
    last_finished: any;
    in_tagdef: boolean;
    is_selfclosing: boolean;
    last_tag_name: string;
    constructor(initWith: string[]);
    code(index: number): number;
    here(): number;
    isValueBlock(): boolean;
    isHere(value: number): boolean;
    step(index: number): number;
    stepBuffer(): void;
    skipspace(): void;
    isTagChar(c: number, first: boolean): boolean;
    collectXMLName(): string;
    colllectText(): bufferType;
    skipUntil(fn: any): void;
    collectUntil(value: any): string;
    collectXMLAttributeValue(): bufferType;
    parse(callback: XMLBuilder): void;
}
