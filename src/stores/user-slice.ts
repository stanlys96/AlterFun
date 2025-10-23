import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCreatorSlug: "",
  applicationEmail: "",
  authModalMode: null,
  walletModalOpen: false,
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedCreatorSlug: (state, action) => {
      state.selectedCreatorSlug = action.payload;
    },
    setApplicationEmail: (state, action) => {
      state.applicationEmail = action.payload;
    },
    setAuthModalMode: (state, action) => {
      state.authModalMode = action.payload;
    },
    setWalletModalOpen: (state, action) => {
      state.walletModalOpen = action.payload;
    },
    setUserUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    resetState: (state) => {
      state.selectedCreatorSlug = "";
      state.applicationEmail = "";
      state.authModalMode = null;
      state.walletModalOpen = false;
      state.username = "";
      state.email = "";
    },
  },
});

const { actions, reducer } = userSlice;
export const {
  setSelectedCreatorSlug,
  setApplicationEmail,
  setAuthModalMode,
  setWalletModalOpen,
  resetState,
  setUserUsername,
  setUserEmail,
} = actions;
export default reducer;
