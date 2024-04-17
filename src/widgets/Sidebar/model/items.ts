import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import AboutIcon from "@/shared/assets/icons/about.svg?react";
import MainIcon from "@/shared/assets/icons/main.svg?react";
import ProfileIcon from "@/shared/assets/icons/profile.svg?react";
import ArticleIcon from "@/shared/assets/icons/article.svg?react";

export interface SidebarItemType {
    path: string
    text: string
    Icon: SVGComponent
    authOnly?: boolean
}

type SVGComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        text: "Главная",
        Icon: MainIcon
    },
    {
        path: RoutePath.about,
        text: "О сайте",
        Icon: AboutIcon
    },
    {
        path: RoutePath.profile,
        text: "Профиль",
        Icon: ProfileIcon,
        authOnly: true
    },
    {
        path: RoutePath.articles,
        text: "Статьи",
        Icon: ArticleIcon,
        authOnly: true
    },
]