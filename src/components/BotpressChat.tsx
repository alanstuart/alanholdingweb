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
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          // The configuration will be loaded from the external script
          // We don't need to specify any config here as it's in the HLJBJRKW.js file
        });
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

  return null;
};

export default BotpressChat;