import { getUserAuthData } from "@/entities/User";
import { createSelector } from "@reduxjs/toolkit";
import AboutIcon from "@/shared/assets/icons/about.svg?react";
import MainIcon from "@/shared/assets/icons/main.svg?react";
import ProfileIcon from "@/shared/assets/icons/profile.svg?react";
import ArticleIcon from "@/shared/assets/icons/article.svg?react";
import { SidebarItemType } from "../types/sidebar";
import { RoutePath } from "@/shared/const/router";

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
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
        ]

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData?.id,
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
            )
        }

        return sidebarItemsList
    }
)