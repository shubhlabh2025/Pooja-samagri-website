import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConfigurationResponse } from "./configurationResponse.type";

interface ConfigurationState {
  data: ConfigurationResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ConfigurationState = {
  data: null,
  status: "idle",
  error: null,
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ConfigurationResponse>) => {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    // Optionally, add reset or error handler
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = configurationSlice.actions;

export default configurationSlice.reducer;

// Selector to get configuration state
export const selectConfiguration = (state: {
  configuration: ConfigurationState;
}) => state.configuration;
