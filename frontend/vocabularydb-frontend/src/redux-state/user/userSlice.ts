import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
    userId: string,
    isSigned: boolean,
}

const initialState: UserState = {
    userId: "",
    isSigned: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        checkSignedState: (state, action: PayloadAction<boolean>) => {
            state.isSigned = action.payload;
        },
    }
});

export const { updateUserId, checkSignedState } = userSlice.actions;

export default userSlice.reducer;