import React, { useEffect } from 'react';

const WatsonChat = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "a438860f-919d-4d3e-8d3b-70412c8c3481",
      region: "au-syd",
      serviceInstanceID: "239fa452-0d3f-4d0e-aa93-273b15005239",
      onLoad: async (instance) => { await instance.render(); },
      namespace: "unique-namespace-name" // Adicione um namespace único
    };

    if (!document.querySelector(`script[src*="WatsonAssistantChatEntry.js"]`)) {
      const script = document.createElement('script');
      script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
      document.head.appendChild(script);
    }

    return () => {
      console.log('Removing Watson Assistant script');
      const existingScript = document.querySelector(`script[src*="WatsonAssistantChatEntry.js"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null; // Ou algum JSX, se necessário
};

export default WatsonChat;
