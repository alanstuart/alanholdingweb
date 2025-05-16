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
    // Load Botpress script
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2.4/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Load and initialize the custom configuration
      const configScript = document.createElement('script');
      configScript.src = 'https://files.bpcontent.cloud/2025/05/15/18/20250515182657-HLJBJRKW.js';
      configScript.async = true;
      document.body.appendChild(configScript);
    };

    return () => {
      // Cleanup scripts when component unmounts
      document.body.removeChild(script);
      const configScript = document.querySelector('script[src="https://files.bpcontent.cloud/2025/05/15/18/20250515182657-HLJBJRKW.js"]');
      if (configScript) {
        document.body.removeChild(configScript);
      }
    };
  }, []);

  return null;
};

export default BotpressChat;