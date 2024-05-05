import { ThunkConfig } from "@/app/providers/StoreProvider"
import i18n from "@/shared/config/i18n/i18n"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Article } from "@/entities/Article"
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors"

interface FetchArticlesListProps {
    page?: number
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    'articlePage/fetchArticlesList',
    async ({ page = 1 }, { extra, rejectWithValue, getState }) => {
        const limit = getArticlesPageLimit(getState())
        try {
            const response = await extra.api.get<Article[]>(`/articles`, {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                }
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue(i18n.t('error'))
        }
    },
)