import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "./home.css"

export default function Home() {
  const { openModal } = useOutletContext();
  return (
    <>
    <div id="Home">
      <section className="firstSection">
        <h1>Kahani AI</h1>
        <p id="intro">Experience storytelling reimagined: Where cutting-edge AI transforms your concepts into captivating narratives and stunning visuals</p>
        <div id="btn-wrapper">
          {/* <NavLink to="/inputs"> */}
          {/* yha par button mein yeh prop lagaya tha react modal ke liye onClick={openModal}  */}
          <button onClick={openModal} className="btn">
            Get Started
          </button>
          {/* </NavLink> */}
          {/* <NavLink> */}
          <a target="_blank" href="https://github.com/AbhinavTheDev/KAI">
            <button className="repo">Github Repo</button>
          </a>
          {/* </NavLink> */}
        </div>
      </section>
      </div>
    </>
  );
}
