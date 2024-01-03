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
