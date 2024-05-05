import { ArticleDetailsSchema } from "@/entities/Article";
import { CounterSchema } from "@/entities/Counter";
import { ProfileSchema } from "@/entities/Profile";
import { UserSchema } from "@/entities/User";
import { addCommentFormSchema } from "@/features/AddCommentForm";
import { LoginSchema } from "@/features/AuthByUsername";
import { ArticleDetailsCommentsSchema } from "@/pages/ArticleDetailsPage";
import { ArticlesPageSchema } from "@/pages/ArticlesPage";
import { ScrollSaveSchema } from "@/widgets/Page/ScrollSave";
import { EnhancedStore, Reducer, ReducersMapObject, UnknownAction } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    scrollSave: ScrollSaveSchema

    // async reducers
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    articleDetailsComments?: ArticleDetailsCommentsSchema
    addCommentForm?: addCommentFormSchema
    articlesPage?: ArticlesPageSchema
}


export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: UnknownAction) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface CombinedState {
    counter: CounterSchema;
    user: UserSchema;
    scrollSave: ScrollSaveSchema;
    loginForm?: undefined;
    profile?: undefined;
    articleDetails?: undefined;
    articleDetailsComments?: undefined;
    addCommentForm?: undefined;
    articlesPage?: undefined;
}

export interface ReduxStoreWithReducerManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
}


export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg
    state: StateSchema
}