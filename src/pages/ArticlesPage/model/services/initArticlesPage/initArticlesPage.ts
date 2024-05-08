import { ThunkConfig } from "@/app/providers/StoreProvider"
import { ActionCreatorWithPayload, createAsyncThunk } from "@reduxjs/toolkit"
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { SortOrder } from "@/shared/types";
import { ArticleSortField } from "@/entities/Article";

interface ActionsMapkey {
    [key: string]: ActionCreatorWithPayload<any, string>;
    order: ActionCreatorWithPayload<SortOrder, 'articlesPage/setOrder'>;
    sort: ActionCreatorWithPayload<ArticleSortField, 'articlesPage/setSort'>;
    search: ActionCreatorWithPayload<string, 'articlesPage/setSearch'>;
}


const actionsMapkey: ActionsMapkey = {
    'order': articlesPageActions.setOrder,
    'sort': articlesPageActions.setSort,
    'search': articlesPageActions.setSearch
}


export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlePage/initArticlesPage',
    async (searchParams, { dispatch, getState }) => {
        const inited = getArticlesPageInited(getState())

        if (!inited) {
            for (const key in actionsMapkey) {
                if (actionsMapkey[key]) {
                    const valueFromUrl = searchParams.get(key)
                    if (valueFromUrl) {
                        dispatch(actionsMapkey[key](valueFromUrl))
                    }
                }
            }
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    }

)