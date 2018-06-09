import { bufferType } from './xmlparser';
export declare class drfmKey {
    value: string;
}
export declare function key(value: string | number): drfmKey;
export declare class drmfComponent {
    lastRender: drmfTemplate;
    tpl(): drmfTemplate;
    toDom(): Node[];
    render(): drmfTemplate;
}
export declare class drmfTemplateCollection {
    node: Node;
    list: drmfTemplate[];
}
export declare class drmfTemplate {
    key: string;
    strings: string[];
    values: any[];
    valuestream: bufferType[];
    children: {
        [key: string]: any;
    };
    doms: {
        [key: string]: Element[];
    };
    templateStr: string;
    templateDom: Node[];
    rootNodes: Node[];
    slotTypes: any[][];
    prevNode: Node;
    ids: {
        [key: string]: Element;
    };
    list: {
        [key: string]: Element[];
    };
    _ready: (tpl: drmfTemplate) => void;
    onReady(fn: (tpl: drmfTemplate) => void): drmfTemplate;
    replaceWith(renderedTpl: drmfTemplate): drmfTemplate;
    updateValues(values: any[]): void;
    createDOM(): Node[];
    renderTemplate(): void;
}
export declare function html(strings: any, ...values: any[]): drmfTemplate;
export declare const drmf: typeof html;
export declare function getState(): any;
export declare function setState(state: any): void;
export declare function reduce(reducer: (state: any) => any): void;
export declare function router(routermap: any): drmfComponent;
export interface DoremifaOptions {
    updateInterval: number;
}
export declare type drmfFunction = (state: any) => drmfTemplate;
export declare function mount(root: Element, comp: drmfComponent | drmfFunction, state?: any, options?: DoremifaOptions): void;
