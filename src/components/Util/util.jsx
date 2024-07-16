import React, { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGeminiData,
  selectGeminiStatus,
} from "../../store/geminifunctionSlice";
import Modal from "react-modal";
import { Loader } from "../index";

// React Modal Integrations
Modal.setAppElement(document.getElementById("root"));
// inside function parenthesis -> { isOpen, closeModal }

// const ApiContext = createContext();

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
  const dispatch = useDispatch();
  const status = useSelector(selectGeminiStatus);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,

      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (inputValues.geminiKey.length > 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setError("Please enter a valid Gemini API key");
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
    const myprompt = `Generate an engaging short story in the ${inputValues.genre} genre. The story should center on a ${inputValues.protagonist} who encounters a significant conflict or adversary in the form of ${inputValues.antagonist} The central theme of the story should be ${inputValues.theme}. Begin with a strong introduction that sets up the world and introduces the protagonist. Detail the protagonist's background, their current situation, and their primary goals or desires. Introduce the antagonist and provide insight into their background, motivations, and the conflict they bring. Develop the story by detailing the protagonist's journey as they face the antagonist, including key events that build tension and move the plot forward. Highlight the protagonist's challenges and the pivotal moments in their struggle. Conclude with a resolution that ties back to the central theme, illustrating how the protagonist has grown or what they have learned from their experiences.`;
    let data = JSON.stringify({
      system_instruction: {
        parts: {
          text: "You are an esteemed short story writer channeling the styles of Stephen King, Virginia Woolf, and Neil Gaiman.",
        },
      },
      contents: {
        parts: {
          text: myprompt,
        },
      },
    });

    const config = {
      apiKey: inputValues.geminiKey,
      prompt: data,
    };

    // console.log("Form Submitted", inputValues);
    dispatch(fetchGeminiData(config));
  };
  useEffect(() => {
    if (status === "succeeded") {
      closeModal();
      navigate("/inputs/story");
    }
  }, [status, navigate]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Input Form Modal"
    >
      <>
        {status === "loading" && <Loader />}
        <div className="form-wrapper">
          <h2>Enter the Details...</h2>
          <Form onSubmit={handleSubmit} className="inputs-form">
            <span className="closeBtn" onClick={closeModal}>
              &#10007;
            </span>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="15"
                          height="15"
                          fill="currentColor"
                        >
                          <path d="M10.1305 15.8421L9.34268 18.7821L7.41083 18.2645L8.1983 15.3256C7.00919 14.8876 5.91661 14.2501 4.96116 13.4536L2.80783 15.6069L1.39362 14.1927L3.54695 12.0394C2.35581 10.6105 1.52014 8.8749 1.17578 6.96843L2.07634 6.80469C4.86882 8.81573 8.29618 10.0003 12.0002 10.0003C15.7043 10.0003 19.1316 8.81573 21.9241 6.80469L22.8247 6.96843C22.4803 8.8749 21.6446 10.6105 20.4535 12.0394L22.6068 14.1927L21.1926 15.6069L19.0393 13.4536C18.0838 14.2501 16.9912 14.8876 15.8021 15.3256L16.5896 18.2645L14.6578 18.7821L13.87 15.8421C13.2623 15.9461 12.6376 16.0003 12.0002 16.0003C11.3629 16.0003 10.7381 15.9461 10.1305 15.8421Z"></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="15"
                          height="15"
                          fill="currentColor"
                        >
                          <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
                        </svg>
                      )}
                    </span>
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </label>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="15"
                          height="15"
                          fill="currentColor"
                        >
                          <path d="M10.1305 15.8421L9.34268 18.7821L7.41083 18.2645L8.1983 15.3256C7.00919 14.8876 5.91661 14.2501 4.96116 13.4536L2.80783 15.6069L1.39362 14.1927L3.54695 12.0394C2.35581 10.6105 1.52014 8.8749 1.17578 6.96843L2.07634 6.80469C4.86882 8.81573 8.29618 10.0003 12.0002 10.0003C15.7043 10.0003 19.1316 8.81573 21.9241 6.80469L22.8247 6.96843C22.4803 8.8749 21.6446 10.6105 20.4535 12.0394L22.6068 14.1927L21.1926 15.6069L19.0393 13.4536C18.0838 14.2501 16.9912 14.8876 15.8021 15.3256L16.5896 18.2645L14.6578 18.7821L13.87 15.8421C13.2623 15.9461 12.6376 16.0003 12.0002 16.0003C11.3629 16.0003 10.7381 15.9461 10.1305 15.8421Z"></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="15"
                          height="15"
                          fill="currentColor"
                        >
                          <path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path>
                        </svg>
                      )}
                    </span>
                  </div>
                </label>
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
                  <option value="Historical Fiction">Historical Fiction</option>
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
                  <option value="The protagonist's own fears, guilt, or internal struggles.">
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
        {/* {status === "loading" && <div>Loading...</div>} */}
      </>
    </Modal>
  );
}
