import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../utils/_DATA";


export const getUsersAsync = createAsyncThunk(
	'users/getUsersAsync',
	async () => {
		const users = await _getUsers();
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

export default userSlice.reducer;