import { ThunkConfig } from "@/app/providers/StoreProvider"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm"
import { validateProfileData } from "../validateProfileData/validateProfileData"
import { Profile } from "@/entities/Profile"
import { ValidateProfileError } from "../../consts/consts"


export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (_, { extra, rejectWithValue, getState }) => {
        const formData = getProfileForm(getState())

        const errors = validateProfileData(formData)

        if (errors.length) {
            return rejectWithValue(errors)
        }

        try {
            const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)
            return response.data
        } catch (e) {
            return rejectWithValue([ValidateProfileError.SERVER_ERROR])
        }
    },
)