import { ThunkConfig } from "@/app/providers/StoreProvider"
import { Profile } from "@/entities/Profile"
import i18n from "@/shared/config/i18n/i18n"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, { extra, rejectWithValue }) => {        
        try {
            const response = await extra.api.get<Profile>(`/profile/${profileId}`)

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue(i18n.t('error'))
        }
    },
)