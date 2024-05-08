import { StateSchema } from '@/app/providers/StoreProvider'
import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { Article } from '@/entities/Article'
import { ArticleDetailsPageRecommendationsSchema } from '../types/ArticleDetailsPageRecommendationSchema'
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations'


const recommendationAdapter = createEntityAdapter({
    selectId: (article: Article) => article.id,
})

export const getArticleRecommendations = recommendationAdapter.getSelectors<StateSchema>((state) => state.articleDetailsPage?.recommendations || recommendationAdapter.getInitialState())

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendations',
    initialState: recommendationAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false
                recommendationAdapter.setAll(state, action.payload)
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: articleDetailsPageRecommendationsActions } = articleDetailsPageRecommendationsSlice
export const { reducer: articleDetailsPageRecommendationsReducer } = articleDetailsPageRecommendationsSlice
