// redux/slices/tokenSlice.ts
import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";
import { IUser } from "../api/usersApiSlice";

// import { TokenApi } from "../api/tokenApiSlice";

interface UserState {
    userToEdit: IUser | null;
}

const initialState: UserState = {
    userToEdit: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserToEdit: (state, action) => {
            state.userToEdit = action.payload;
        },
    },
});

export const { setUserToEdit } = userSlice.actions;

export default userSlice.reducer;

// export const selectCurrentToken = (store: RootState) => store.token.accessToken;
