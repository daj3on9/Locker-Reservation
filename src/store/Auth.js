import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        authenticated: false, //현재 로그인 여부 확인
        accessToken: null, //accessToken 저장
    },
    reducers: {
        //  accessToken 정보 저장
        SET_TOKEN: (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload;
        },
        //  accessToken 삭제
        DELETE_TOKEN: (state) => {
            state.authenticated = false;
            state.accessToken = null;
        },
    },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
