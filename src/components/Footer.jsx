// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>© 2024 Resume Insights. All rights reserved.</p>
      <p>For inquiries, email us at <a href="mailto:contact@resumeinsights.com" className="underline">contact@resumeinsights.com</a></p>
      <p>Visit our GitHub <a href="https://github.com/yourusername/resumeinsights" target="_blank" rel="noopener noreferrer" className="underline">here</a>.</p>
    </footer>
  );
};

export default Footer;
