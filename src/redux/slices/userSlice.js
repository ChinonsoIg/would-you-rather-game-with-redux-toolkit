import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInitialUsers } from "../../utils/api";


export const getUsersAsync = createAsyncThunk(
	'users/getUsersAsync',
	async () => {
		const users = await getInitialUsers();
    return users;
	}
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: {},
    currentUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
		},
    logout: (state) => {
      state.currentUser = null;
		},
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.allUsers = action.payload
    })
  },
});


export const { login, logout } = userSlice.actions;
// export const selectUser = (state) => state.user.currentUser;
// export const users = (state) => state.currentUser;

export default userSlice.reducer;