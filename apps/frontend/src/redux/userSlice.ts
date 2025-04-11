import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { StateUserType } from "@redux/types";

const initialState: StateUserType = {
  loading: true,
  data: {
    isJwtValid: false,
    email: "",
  },
  error: "",
};

const userSlice: Slice<StateUserType> = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    changeEmail: (state, action: PayloadAction<string>) => {
      state.data.email = action.payload;
    },
  },
});

export const { increment, changeEmail } = userSlice.actions;
export default userSlice.reducer;
