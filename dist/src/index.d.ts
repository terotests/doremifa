export declare class escapedHtml {
    str: string;
    constructor(value: any);
}
export declare function forElem(parent: Element, fn: (elems: any) => void): Element;
export declare function html(strings: any, ...values: any[]): escapedHtml;
export declare function element(strings: any, ...values: any[]): Element;
export declare function getState(): any;
export declare function setState(state: any): void;
export declare function reduce(reducer: (state: any) => any): void;
export declare function router(routermap: any): Promise<Element>;
export interface DoremifaOptions {
    updateInterval: number;
}
export declare function start(root: Element, renderFn: (state: any) => Promise<Element>, state?: any, options?: DoremifaOptions): void;
