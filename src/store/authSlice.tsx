import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    isSignedIn: Boolean,
    userId: String,
    name: String,
    email: String,
}

const INITIAL_STATE:InitialState = {
    isSignedIn: localStorage.getItem('token') == null ? false : true,
    userId: '',
    name: '',
    email: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        signInAction: (state, action) => {
            state.isSignedIn = true;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        signOutAction: state => {
            state.isSignedIn = false;
            state.userId = '';
            state.name = '';
            state.email = '';
        },
    },
});

export const { signInAction, signOutAction } = authSlice.actions;

export default authSlice.reducer;
