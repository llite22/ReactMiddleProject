import { getUserAuthData } from "@/entities/User";
import { createSelector } from "@reduxjs/toolkit";
import AboutIcon from "@/shared/assets/icons/about.svg?react";
import MainIcon from "@/shared/assets/icons/main.svg?react";
import ProfileIcon from "@/shared/assets/icons/profile.svg?react";
import ArticleIcon from "@/shared/assets/icons/article.svg?react";
import { SidebarItemType } from "../types/sidebar";
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: "Главная",
                Icon: MainIcon
            },
            {
                path: getRouteAbout(),
                text: "О сайте",
                Icon: AboutIcon
            },
        ]

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData?.id),
                    text: "Профиль",
                    Icon: ProfileIcon,
                    authOnly: true
                },
                {
                    path: getRouteArticles(),
                    text: "Статьи",
                    Icon: ArticleIcon,
                    authOnly: true
                },
            )
        }

        return sidebarItemsList
    }
)