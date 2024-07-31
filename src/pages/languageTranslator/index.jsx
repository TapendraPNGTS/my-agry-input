// GoogleTranslateButton.js

import React, { useEffect } from 'react';

const GoogleTranslateButton = () => {
  useEffect(() => {
    // Function to initialize Google Translate widget
    function googleTranslateElementInit() {
      new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    }

    // Load the Google Translate API
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Clean up the script on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslateButton;
