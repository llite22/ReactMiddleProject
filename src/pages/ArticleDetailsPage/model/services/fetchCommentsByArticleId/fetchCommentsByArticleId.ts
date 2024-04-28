import { ThunkConfig } from "@/app/providers/StoreProvider"
import i18n from "@/shared/config/i18n/i18n"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Comment } from "@/entities/Comment"

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, { extra, rejectWithValue }) => {
        if (!articleId) {
            return rejectWithValue(i18n.t('id not found'))
        }
        
        try {
            const response = await extra.api.get<Comment[]>(`/comments`, {
                params: {
                    articleId,
                    _expand: 'user',
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