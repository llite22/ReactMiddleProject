import { StateSchema } from "@/app/providers/StoreProvider"
import { getLoginIsLoading } from "./getLoadingIsLoading"

describe("getLoginIsLoading", () => {
    test('should return true', () => {
        const state = {
            loginForm: {
                isLoading: true
            }
        }
        expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
    }),
        test('should work with empty state', () => {
            const state = {}
            expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
        })
})