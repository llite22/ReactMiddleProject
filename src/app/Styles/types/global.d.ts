declare module "*.scss" {
    interface IClassNames {
        [classname: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}


declare module "*.svg?react" {
    import React from "react";
    type SVGComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    const ReactComponent: SVGComponent;
    export default ReactComponent;
}

declare const __IS_DEV__: boolean

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;


