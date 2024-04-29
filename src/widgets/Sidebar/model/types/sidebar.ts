export interface SidebarItemType {
    path: string
    text: string
    Icon: SVGComponent
    authOnly?: boolean
}

type SVGComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
