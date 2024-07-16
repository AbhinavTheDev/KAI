import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)

// Define the async thunk for the POST API call
export const fetchGeminiData = createAsyncThunk(
  "function/fetchGeminiData",
  async (config) => {
    const { prompt, apiKey } = config;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log(text);
      return text;
    } catch (error) {
      throw error;
    }
  },
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const functionSlice = createSlice({
  name: "function",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeminiData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGeminiData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGeminiData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectGeminiData = (state) => state.function.data;
export const selectGeminiStatus = (state) => state.function.status;
export const selectGeminiError = (state) => state.function.error;

export default functionSlice.reducer;
