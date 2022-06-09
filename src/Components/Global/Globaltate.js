import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  daries: [],
};

const Globaltate = createSlice({
  name: "State of Apeal",
  initialState,
  reducers: {
    createUser: (state, { payload }) => {
      state.currentUser = payload;
    },

    getDiary: (state, { payload }) => {
      state.daries = payload;
    },

    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { createUser, signOut, getDiary } = Globaltate.actions;

export default Globaltate.reducer;
