import React from "react";
import { useSelector } from "react-redux";
import {
  selectGeminiData,
  selectGeminiStatus,
  selectGeminiError,
} from "../../store/geminifunctionSlice";

export default function Story() {
  const data = useSelector(selectGeminiData);
  const status = useSelector(selectGeminiStatus);
  const error = useSelector(selectGeminiError);

  // console.log("state:", ApiResponse);
  switch (status) {
    case "loading":
      return <div>Loading...</div>;
    case "succeeded":
      return (
        <>
          <h1>Here is Your Story &#9786; </h1>
          <div className="story-wrapper">
            <p>{data}</p>
          </div>
        </>
      );
    case "failed":
      return <div>Error: {error}</div>;
    default:
      return <div className="story-wrapper">No data available</div>;
  }
  // if (status === "loading") {
  // }

  // if (status === "failed") {
  // }

  // if (status === "succeeded" && data) {
  // }
}
