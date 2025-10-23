import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCreatorSlug: "",
  applicationEmail: "",
  authModalMode: null,
  walletModalOpen: false,
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
    resetState: (state) => {
      state.selectedCreatorSlug = "";
      state.applicationEmail = "";
      state.authModalMode = null;
      state.walletModalOpen = false;
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
} = actions;
export default reducer;
