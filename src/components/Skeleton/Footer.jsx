import React from "react";
import "./footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
              <div className="social-links">
                <ul>
                  <li>
                    <a target="_blank" href="https://x.com/abhinav11234" title="Twitter">
                    <img src="../../assets/twitter.svg" alt="Twitter" />
                    
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/AbhinavTheDev" title="GitHub">
                    <img src="../../assets/github.svg" alt="Github" />
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.linkedin.com/in/abhinav76" title="LinkedIn">
                      <img src="../../assets/linkedin.svg" alt="LinkedIn" />
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
