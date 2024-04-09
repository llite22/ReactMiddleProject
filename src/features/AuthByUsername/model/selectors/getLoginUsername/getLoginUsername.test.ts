import { StateSchema } from "@/app/providers/StoreProvider"
import { getLoginUsername } from "./getLoginUsername"

describe("getLoginUsername", () => {
    test('should return value', () => {
        const state = {
            loginForm: {
                username: 'John'
            }
        }
        expect(getLoginUsername(state as StateSchema)).toEqual('John')
    }),
        test('should work with empty state', () => {
            const state = {}
            expect(getLoginUsername(state as StateSchema)).toEqual('')
        })
})