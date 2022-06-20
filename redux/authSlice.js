import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    purchaseCourse: (state, action) => {
      state.user.coursePurchased = [
        ...state.user.coursePurchased,
        action.payload,
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, purchaseCourse } = authSlice.actions;

export default authSlice.reducer;
