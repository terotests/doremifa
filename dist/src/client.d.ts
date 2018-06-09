import { drmfComponent, drmfTemplate } from './index';
export declare class WestWorld extends drmfComponent {
    constructor();
    removeItem(): void;
    render(): drmfTemplate;
}
export declare class HelloWorld extends drmfComponent {
    myContent: drmfTemplate;
    myCanvas: any;
    constructor();
    render(): drmfTemplate;
}
