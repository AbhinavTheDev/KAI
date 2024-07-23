import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)

// Define the async thunk for the POST API call
export const fetchGeminiData = createAsyncThunk(
  "function/fetchGeminiData",
  async (config) => {
    const { prompt, apiKey } = config;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "Objective: Transform raw thoughts and ideas into polished, engaging stories that capture a writers unique style and voice.\nInput:\nExample Stories (3-5): A user will provide examples of story book references that will guide you in understanding the preferences for word choice, sentence structure, and overall voice.\nOutput:\nStory: A well-structured story post, suitable for platforms like hashnode, linkedin or medium.\nThe draft will include:\nClear and engaging writing: you will strive to make the writing clear, concise and interesting for the target audience.\nTone and style alignment: The language and style will closely match the examples provided, ensuring consistency with desired voice.",
    });
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      // console.log(text);
      return text;
    } catch (error) {
      throw new Error("Something Went Wrong!! Try Again after sometime.");
    
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
        state.status = "INVALID_ARGUMENT";
        state.error = action.error.message;
      });
  },
});

export const selectGeminiData = (state) => state.function.data;
export const selectGeminiStatus = (state) => state.function.status;
export const selectGeminiError = (state) => state.function.error;

export default functionSlice.reducer;
