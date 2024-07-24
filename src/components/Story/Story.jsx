import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectGeminiData,
  selectGeminiStatus,
  selectGeminiError,
} from "../../store/geminifunctionSlice";
import {
  selectSDImage,
  selectSDStatus,
  selectSDError,
} from "../../store/stablediffusionSlice";
import { Loader } from "../index.js";
import "./story.css";

export default function Story() {
  const data = useSelector(selectGeminiData);
  const status = useSelector(selectGeminiStatus);
  const error = useSelector(selectGeminiError);
  const image = useSelector(selectSDImage);
  const loading = useSelector(selectSDStatus);
  const err = useSelector(selectSDError);
  // console.log("data:", data);
  // console.log("status:", status);
  // console.log("ERROR 1", error);
  // console.log("image:", image);
  // console.log("loading:", loading);
  // console.log("ERROR 2", err);
  // console.log("state:", ApiResponse);
  if (status === "loading") {
    return <Loader />;
  }
  if (status === "succeeded" && image) {
    return (
      <>
        <div id="StoryCover-Wrapper">
          <div className="Story-Cover">
            {image ? (
              <img
                src={`data:image/png;base64,${image}`}
                alt="Generated Story"
              />
            ) : (
              <p>No Image Found</p>
            )}
          </div>
          <h1>Here is Your Story &#9786; </h1>
          <div className="story-wrapper">
            <p>{data}</p>
          </div>
          <NavLink to="/">
            <button className="gnrtBtn">Generate Again</button>
          </NavLink>
        </div>
      </>
    );
  }
  if (status === "succeeded" && !image) {
    return (
      <>
        <div id="storyWrapper">
          <h1>Here is Your Story &#9786; </h1>
          <div className="story-wrapper">
            <p>{data}</p>
          </div>
          <NavLink to="/">
            <button className="gnrtBtn">Generate Again</button>
          </NavLink>
        </div>
      </>
    );
  }

  if (status === "INVALID_ARGUMENT" || loading === "false") {
    return (
      <>
        <div id="Error-Wrapper">
          <div id="ErrorDiv">
            <div>Gemini Error: {error}</div>
            <div>Stable Diffusion Error: {err}</div>
          </div>
          <br />
          <NavLink to="/">
            <button className="TryAgnBtn">Try Again</button>
          </NavLink>
        </div>
      </>
    );
  }
}
