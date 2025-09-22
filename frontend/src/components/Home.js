// src/components/Home.js
import React from 'react';
import PostSection from './PostSection';

const Home = ({ posts }) => {
    // We need Font Awesome for icons, add this to your public/index.html head tag:
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

  return (
    <main className="container">
      <div className="alert-bar">
        Alert:- infoczy नाम से मिलती-जुलती फर्जी वेबसाइट से सावधान रहें, हमेशा Google में Type करें | infoczy.com
      </div>

      <section className="icon-boxes">
        <div className="icon-box">
            <a href="#govt-scheme">
                <i className="fas fa-landmark"></i>
                <h3>Govt Scheme</h3>
            </a>
        </div>
        <div className="icon-box">
            <a href="#admit-card">
                <i className="fas fa-address-card"></i>
                <h3>Admit Card</h3>
            </a>
        </div>
        <div className="icon-box">
            <a href="#scholarship">
                <i className="fas fa-graduation-cap"></i>
                <h3>Scholarship</h3>
            </a>
        </div>
        <div className="icon-box">
            <a href="#career">
                <i className="fas fa-briefcase"></i>
                <h3>Career</h3>
            </a>
        </div>
      </section>

      <section className="content-grid">
        <PostSection title="New Update" posts={posts} category="New Update" id="new-update" />
        <PostSection title="Admit Card/Results" posts={posts} category="Admit Card" id="admit-card" />
        <PostSection title="Govt Scheme" posts={posts} category="Govt Scheme" id="govt-scheme" />
        <PostSection title="Latest Jobs" posts={posts} category="Latest Jobs" id="latest-jobs" />
        <PostSection title="Scholarship" posts={posts} category="Scholarship" id="scholarship" />
        <PostSection title="Syllabus/ Answer Key" posts={posts} category="Syllabus" id="syllabus" />
        <PostSection title="Career" posts={posts} category="Career" id="career" />
        <PostSection title="Admission Update" posts={posts} category="Admission Update" id="admission-update" />
      </section>

      <section className="welcome-section">
          <h3>Welcome to Infoczy!</h3>
          <p>Infoczy – आपका भरोसेमंद शैक्षिक और सरकारी अपडेट स्रोत। Infoczy (infoczy.com) एक स्वतंत्र मंच है, जो सरकारी योजनाओं, शैक्षिक संसाधनों, नौकरी रिक्तियों, परीक्षा परिणामों, और अन्य महत्वपूर्ण सूचनाओं को सही रूप में प्रदान करने के लिए समर्पित है।</p>
          <h4>अस्वीकरण (Disclaimer):</h4>
          <p style={{color: 'red'}}>यह वेबसाइट केवल शैक्षिक और सूचना उद्देश्यों के लिए बनाई गई है और इसका किसी भी सरकारी विभाग से कोई संबंध नहीं है। उपयोगकर्ताओं को सलाह दी जाती है कि वे आवेदन करने से पहले आधिकारिक वेबसाइट पर जानकारी सत्यापित करें।</p>
      </section>
    </main>
  );
};

export default Home;