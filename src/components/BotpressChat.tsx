import { useEffect, useState } from 'react';

declare global {
  interface Window {
    botpressWebChat: {
      init: (config: any) => void;
    };
  }
}

const BotpressChat = () => {
  const [isDOMReady, setIsDOMReady] = useState(false);

  useEffect(() => {
    // Function to load Botpress script
    const loadBotpressScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.botpress.cloud/webchat/v2.4/inject.js';
      script.async = true;
      document.body.appendChild(script);
    };

    // Function to initialize chat
    const initializeChat = () => {
      if (window.botpressWebChat && document.body) {
        window.botpressWebChat.init({
          composerPlaceholder: "Chat with us",
          botConversationDescription: "This is a bot",
          botId: "HLJBJRKW",
          hostUrl: "https://cdn.botpress.cloud/webchat/v2.4",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: "HLJBJRKW",
          webhookId: "HLJBJRKW",
          lazySocket: true,
          themeName: "prism",
          frontendVersion: "v2.4",
          showPoweredBy: false,
          theme: "prism",
          themeColor: "#2563eb"
        });
      }
    };

    // Check if DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setIsDOMReady(true);
      loadBotpressScript();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        setIsDOMReady(true);
        loadBotpressScript();
      });
    }

    // Initialize chat when script is loaded
    window.addEventListener('botpress.ready', initializeChat);

    return () => {
      window.removeEventListener('botpress.ready', initializeChat);
    };
  }, []);

  if (!isDOMReady) return null;

  return <div id="botpress-webchat-container" />;
};

export default BotpressChat;