// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-widgets">
          <div className="footer-widget">
            <h4>Latest Update</h4>
            <ul>
              <li><a href="#">Latest Jobs</a></li>
              <li><a href="#">All India Jobs</a></li>
              <li><a href="#">Results</a></li>
              <li><a href="#">Latest Admit Card</a></li>
              <li><a href="#">University Updates</a></li>
            </ul>
          </div>
          <div className="footer-widget">
            <h4>Education & Career</h4>
            <ul>
              <li><a href="#">Admission</a></li>
              <li><a href="#">Exam Syllabus</a></li>
              <li><a href="#">Govt Scheme</a></li>
              <li><a href="#">Sarkari Yojana</a></li>
              <li><a href="#">Answer Key</a></li>
            </ul>
          </div>
          <div className="footer-widget">
            <h4>All India Jobs</h4>
            <ul>
              <li><a href="#">All India Jobs</a></li>
              <li><a href="#">Latest Jobs</a></li>
              <li><a href="#">SSC</a></li>
              <li><a href="#">Bank</a></li>
              <li><a href="#">Railway</a></li>
              <li><a href="#">Police</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          © 2025 infoczy.com | <a href="#">Disclaimer</a> | <a href="#">Privacy Policy</a> | <a href="#">About us</a> | <a href="#">Contact us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;