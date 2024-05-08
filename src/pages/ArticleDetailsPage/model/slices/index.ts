import { combineReducers } from "@reduxjs/toolkit";
import { articleDetailsPageRecommendationsReducer } from "./articleDetailsPageRecommendationSlice";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";

export const articleDetailsPageReducer = combineReducers({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer
})