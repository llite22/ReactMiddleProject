import { ThunkConfig } from "@/app/providers/StoreProvider"
import i18n from "@/shared/config/i18n/i18n"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Article } from "../../types/article"

export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (articleId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: 'user'
                }
            })
            if (!articleId) {
                throw new Error()
            }

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue(i18n.t('error'))
        }
    },
)