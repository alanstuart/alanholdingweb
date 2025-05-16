import { useEffect, useState } from 'react';

declare global {
  interface Window {
    botpress: {
      init: (config: any) => void;
      open: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}

const BotpressChat = () => {
  const [isDOMReady, setIsDOMReady] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setIsDOMReady(true);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        setIsDOMReady(true);
      });
    }
  }, []);

  if (!isDOMReady) return null;

  return (
    <div 
      id="webchat" 
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '400px',
        height: '500px',
        zIndex: 1000,
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    />
  );
};

export default BotpressChat;