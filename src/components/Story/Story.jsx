import React from "react";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { Loader } from "../index";
import {
  selectGeminiData,
  selectGeminiStatus,
  selectGeminiError,
} from "../../store/geminifunctionSlice";

export default function Story() {
  const data = useSelector(selectGeminiData);
  const status = useSelector(selectGeminiStatus);
  const error = useSelector(selectGeminiError);

  const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  };

  // console.log("state:", ApiResponse);
  switch (status) {
    case "loading":
      return <Loader />;
    case "succeeded":
      return (
        <>
          <h1>Here is Your Story &#9786; </h1>
          <div className="story-wrapper">
            <div
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(data.content) }}
            />
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
