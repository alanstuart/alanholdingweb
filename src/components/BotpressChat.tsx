import { useEffect } from 'react';

declare global {
  interface Window {
    botpressWebChat: {
      init: (config: any) => void;
    };
  }
}

const BotpressChat = () => {
  useEffect(() => {
    // Initialize Botpress chat when component mounts
    const initializeChat = () => {
      // Ensure body element exists before initialization
      if (window.botpressWebChat && document.body) {
        setTimeout(() => {
          window.botpressWebChat.init({
            // The configuration will be loaded from the external script
            // We don't need to specify any config here as it's in the HLJBJRKW.js file
          });
        }, 100); // Small delay to ensure DOM is fully loaded
      }
    };

    // Check if Botpress is already loaded
    if (window.botpressWebChat) {
      initializeChat();
    } else {
      // If not loaded yet, wait for it
      window.addEventListener('botpress.ready', initializeChat);
    }

    return () => {
      window.removeEventListener('botpress.ready', initializeChat);
    };
  }, []);

  // Return a div that will be present in the DOM
  return <div id="botpress-webchat-container" />;
};

export default BotpressChat;