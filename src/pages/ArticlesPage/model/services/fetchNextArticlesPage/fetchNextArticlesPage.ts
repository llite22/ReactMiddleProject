import { ThunkConfig } from "@/app/providers/StoreProvider"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageNum } from "../../selectors/articlesPageSelectors"
import { articlesPageActions } from "../../slices/articlesPageSlice"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlePage/fetchNextArticlesPage',
    async (_, { dispatch, getState }) => {
        const hasMore = getArticlesPageHasMore(getState())
        const page = getArticlesPageNum(getState())
        const isLoading = getArticlesPageIsLoading(getState())


        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(
                fetchArticlesList({
                    page: page + 1,
                })
            );
        }

    },
)