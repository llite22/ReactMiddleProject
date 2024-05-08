import { ArticleDetailsCommentsSchema } from "./ArticleDetailsCommentSchema"
import { ArticleDetailsPageRecommendationsSchema } from "./ArticleDetailsPageRecommendationSchema"

export interface ArticleDatilsPageSchema {
    comments: ArticleDetailsCommentsSchema
    recommendations: ArticleDetailsPageRecommendationsSchema
}