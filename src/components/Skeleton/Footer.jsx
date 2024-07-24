import React from "react";
import "./footer.css";
import twitter from "../../assets/twitter.svg";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
              <div className="social-links">
                <ul>
                  <li>
                    <a target="_blank" href="https://x.com/abhinav11234" title="Twitter">
                    <img src={twitter} alt="Twitter" />
                    
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/AbhinavTheDev" title="GitHub">
                    <img src={github} alt="Github" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.linkedin.com/in/abhinav76" title="LinkedIn">
                      <img src={linkedin} alt="LinkedIn" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr/>
      {/* bottom part section */}
      <div className="footer-bottom">
        <div className="footer-bottom-wrapper">
          <p id="p1">Copyright &copy; {new Date().getFullYear()}</p>
          <p id="p2">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
