import { ThunkConfig } from "@/app/providers/StoreProvider"
import { getArticleDetailsData } from "@/entities/Article"
import { Comment } from "@/entities/Comment"
import { getUserAuthData } from "@/entities/User"
import i18n from "@/shared/config/i18n/i18n"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId"



export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, { dispatch, extra, rejectWithValue, getState }) => {

        const userData = getUserAuthData(getState())
        const article = getArticleDetailsData(getState())

        if (!userData || !text || !article) {
            return rejectWithValue(i18n.t('no  data'))
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text
            })

            if (!response.data) {
                throw new Error()
            }
            
            dispatch(fetchCommentsByArticleId(article.id))

            return response.data
        } catch (e) {
            return rejectWithValue(i18n.t('error'))
        }
    },
)