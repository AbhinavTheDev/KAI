import React, { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGeminiData,
  selectGeminiStatus,
} from "../../store/geminifunctionSlice";
import { fetchImage, selectSDStatus } from "../../store/stablediffusionSlice.js";
import HideIcon from "../../icons/HideIcon.jsx";
import ShowIcon from "../../icons/ShowIcon.jsx";
import { Loader } from "../index.js";
import "./utilities.css";
// import Modal from "react-modal";

// React Modal Integrations
// Modal.setAppElement(document.getElementById("root"));

export default function Utilities({ isOpen, closeModal }) {
  const [CurrentStep, setCurrentStep] = useState(1);
  const [inputValues, setInputValues] = useState({
    geminiKey: "",
    SDKey: "",
    genre: "Fantasy",
    protagonist: "Hero",
    antagonist: "Villain",
    theme: "Courage",
  });
  const [showgeminiKey, setShowgeminiKey] = useState(false);
  const [showSDKey, setShowSDKey] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const dispatch = useDispatch();
  const geministatus = useSelector(selectGeminiStatus);
  const sdstatus = useSelector(selectSDStatus);
  const navigate = useNavigate();

  const customPrompt = `Examples Are : Ambrose Bierce, “An Occurrence at Owl Creek Bridge” (1890) , Edgar Allan Poe, “The Tell-Tale Heart” (1843), Washington Irving, “Rip Van Winkle” (1819) and “The Legend of Sleepy Hollow” (1820).\nGenerate an engaging short story in the ${inputValues.genre} genre. The story should center on a ${inputValues.protagonist} who encounters a significant conflict or adversary in the form of ${inputValues.antagonist} The central theme of the story should be ${inputValues.theme}. Begin with a strong introduction that sets up the world and introduces the protagonist. Detail the protagonist's background, their current situation, and their primary goals or desires. Introduce the antagonist and provide insight into their background, motivations, and the conflict they bring. Develop the story by detailing the protagonist's journey as they face the antagonist, including key events that build tension and move the plot forward. Highlight the protagonist's challenges and the pivotal moments in their struggle. Conclude with a resolution that ties back to the central theme, illustrating how the protagonist has grown or what they have learned from their experiences.`;
  const stablePrompt = `${inputValues.genre} World with ${inputValues.theme} theme in anime style, vibrant colors, smooth and calm`; 
  
  if (!isOpen) return null;

  const handleChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,

      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (inputValues.geminiKey.length > 0 && inputValues.SDKey.length > 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (!inputValues.geminiKey) {
      setError("Please enter a valid Gemini API key");
     } else if (!inputValues.SDKey) {
      setError2("Please enter a valid Stable Diffusion Key");
    }
  };
  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const togglegeminiKeyVisibility = () => {
    setShowgeminiKey(!showgeminiKey);
  };
  const toggleSDKeyVisibility = () => {
    setShowSDKey(!showSDKey);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    // if (!inputValues.geminiKey) {
    //   return; // Prevent submission if key is missing
    // }
    let data = JSON.stringify({
      system_instruction: {
        parts: {
          text: "You are a short story generator bot who channeling the styles of Stephen King, Virginia Woolf, and Neil Gaiman.Objective: Transform raw thoughts and ideas into polished, engaging stories that capture a writers unique style and voice.\nInput:\nExample Stories (3-5): A user will provide examples of story book references that will guide you in understanding the preferences for word choice, sentence structure, and overall voice.\nOutput:\nStory: A well-structured story post, suitable for platforms like hashnode, linkedin or medium.\nThe draft will include:\nClear and engaging writing: you will strive to make the writing clear, concise and interesting for the target audience.\nTone and style alignment: The language and style will closely match the examples provided, ensuring consistency with desired voice.",
        },
      },
      contents: {
        parts: {
          text: customPrompt,
        },
      },
    });

    const config = {
      apiKey: inputValues.geminiKey.trim(),
      prompt: data,
      SDapiKey: inputValues.SDKey.trim(),
      SDprompt: stablePrompt,
    };
console.log("Gemini status",geministatus );
console.log("SD status",sdstatus );
    // console.log("Form Submitted", inputValues);
    dispatch(fetchGeminiData(config));
    dispatch(fetchImage(config));
    closeModal();
    navigate("/story");
  };

  return (
   
      <>
        {geministatus === "loading" && <Loader />}
        <div className="modal-overlay">
          <div className="modal-content">
                <span className="closeBtn" onClick={closeModal}>
                  &#10007;
                </span>
            <div className="form-wrapper">
              <h2>Enter the Details...</h2>
              <Form onSubmit={handleSubmit} className="inputs-form">
                {CurrentStep === 1 && (
                  <div>
                    <label htmlFor="gemini-api">
                      <h3>Enter Your Gemini API key</h3>
                      <div id="iconDiv" style={{ position: "relative" }}>
                        <input
                          name="geminiKey"
                          type={showgeminiKey ? "text" : "password"}
                          placeholder="Enter API key"
                          onChange={handleChange}
                          value={inputValues.geminiKey}
                          required
                        />
                        <span
                          onClick={togglegeminiKeyVisibility}
                          style={{
                            // background: "black",
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          {showgeminiKey ? (
                            <HideIcon />
                          ) : (
                            <ShowIcon/>
                          )}
                        </span>
                      </div>
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </label>
                    <a id="api-key-link" href="https://aistudio.google.com/app/apikey">Get Your API Now!</a>
                    <label htmlFor="SD-api">
                      <h3>Enter Your Stable Diffusion API key</h3>
                      <div id="iconDiv" style={{ position: "relative" }}>
                        <input
                          name="SDKey"
                          type={showSDKey ? "text" : "password"}
                          placeholder="Enter API key"
                          onChange={handleChange}
                          value={inputValues.SDKey}
                        />

                        <span
                          onClick={toggleSDKeyVisibility}
                          style={{
                            // background: "black",
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          {showSDKey ? (
                            <HideIcon />
                          ) : (
                            <ShowIcon/>
                          )}
                        </span>
                      </div>
                      {error && <p style={{ color: "red" }}>{error2}</p>}
                    </label>
                    <a id="api-key-link" href="https://platform.stability.ai/account/keys">Get Your SD API Now!</a>
                    <br/>
                    <button type="button" id="btn" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                )}

                {/* Genre Dropdown  */}
                {CurrentStep === 2 && (
                  <div>
                    <label htmlFor="genre">
                      <h3>Choose Genre</h3>
                    </label>
                    <select
                      name="genre"
                      id="genre"
                      onChange={handleChange}
                      value={inputValues.genre}
                    >
                      <option value="Fantasy">Fantasy</option>
                      <option value="Science-Fiction">Sci-Fi</option>
                      <option value="Mystery">Mysterious</option>
                      <option value="Historical Fiction">
                        Historical Fiction
                      </option>
                      <option value="Thriller">Thriller</option>
                      <option value="Adventure">Adventure</option>
                    </select>
                    <div id="btn-wrapper-2">
                      <button type="button" id="btn" onClick={handlePrev}>
                        Previous
                      </button>
                      <button type="button" id="btn" onClick={handleNext}>
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {/* Characters Dropdown  */}
                {CurrentStep === 3 && (
                  <div>
                    <label htmlFor="character">
                      <h3>Choose Characters</h3>
                    </label>
                    {/* Heroes */}
                    <label htmlFor="protagonist">
                      <h4>Protagonist</h4>
                    </label>
                    <select
                      name="protagonist"
                      id="protagonist"
                      onChange={handleChange}
                      value={inputValues.protagonist}
                    >
                      <option value="A courageous and noble character who fights for justice.">
                        Hero
                      </option>
                      <option value="A flawed, often reluctant hero with questionable morals.">
                        Reluctant Hero
                      </option>
                      <option value="An everyday individual thrust into extraordinary circumstances.">
                        Normal Person
                      </option>
                    </select>
                    {/* Villains */}
                    <label htmlFor="antagonist">
                      <h4>Antagonist</h4>
                    </label>
                    <select
                      name="antagonist"
                      id="antagonist"
                      onChange={handleChange}
                      value={inputValues.antagonist}
                    >
                      <option value="A malevolent character driven by greed, power, or revenge.">
                        Villain
                      </option>
                      <option value="A force of nature or natural disaster posing a threat.">
                        Nature
                      </option>
                      <option value="It's own fears, guilt, or internal struggles.">
                        Inner Demons
                      </option>
                      <option value=" A corrupt system or oppressive regime that the protagonist must challenge.">
                        Society
                      </option>
                    </select>
                    <div id="btn-wrapper-2">
                      <button type="button" id="btn" onClick={handlePrev}>
                        Previous
                      </button>
                      <button type="button" id="btn" onClick={handleNext}>
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {/* Theme Dropdown */}
                {CurrentStep === 4 && (
                  <div>
                    <label htmlFor="theme">
                      <h3>Choose Theme</h3>
                    </label>
                    <select
                      name="theme"
                      id="theme"
                      onChange={handleChange}
                      value={inputValues.theme}
                    >
                      <option value="Acts of bravery and facing fears.">
                        Courage
                      </option>
                      <option value="The struggle for independence and autonomy">
                        Freedom
                      </option>
                      <option value="The use and abuse of power and its consequences.">
                        Power
                      </option>
                      <option value="Seeking forgiveness and making amends for past mistakes.">
                        Redemption
                      </option>
                    </select>
                    <div id="btn-wrapper-2">
                      <button type="button" id="btn" onClick={handlePrev}>
                        Previous
                      </button>
                      <button className="submitBtn" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </>
  );
}
