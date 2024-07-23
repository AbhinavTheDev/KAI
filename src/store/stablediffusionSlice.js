import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchImage = createAsyncThunk(
  "stableDiffusion/fetchImage",
  async (config) => {
    const { SDapiKey, SDprompt } = config;
    const engineId = "stable-diffusion-v1-6";
    const apiHost = "https://api.stability.ai";

    if (!SDapiKey) {
      throw new Error("Missing Stability API key.");
    }
    try {
      const response = await axios.post(
        `${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
          text_prompts: [{ text: SDprompt }],
          cfg_scale: 7,
          height: 512,
          width: 512,
          steps: 30,
          samples: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${SDapiKey}`,
          },
        },
      );
      return response.data.artifacts[0].base64;
    } catch (error) {
      if (response.status !== 200) {
        throw new Error(`Non-200 response: ${response.statusText}`);
      }
  };
  },
);

const stableDiffusionFunctionSlice = createSlice({
  name: "stableDiffusion",
  initialState: {
    image: null,
    loading: false,
    error2: null,
  },
  reducers: {
    clearImage: (state) => {
      state.image = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.loading = true;
        state.error2 = null;
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.image = action.payload;
        state.loading = false;
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.error2 = action.error.message;
        state.loading = false;
      });
  },
});
export const selectSDImage = (state) => state.stableDiffusion.image;
export const selectSDStatus = (state) => state.stableDiffusion.loading;
export const selectSDError = (state) => state.stableDiffusion.error2;

export const { clearImage } = stableDiffusionFunctionSlice.actions;
export default stableDiffusionFunctionSlice.reducer;
