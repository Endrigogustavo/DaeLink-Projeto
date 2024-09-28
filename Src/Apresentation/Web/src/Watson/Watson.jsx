import React, { useEffect } from 'react';

const WatsonChat = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "a438860f-919d-4d3e-8d3b-70412c8c3481", // The ID of this integration.
      region: "au-syd", // The region your integration is hosted in.
      serviceInstanceID: "239fa452-0d3f-4d0e-aa93-273b15005239", // The ID of your service instance.
      onLoad: async (instance) => { await instance.render(); }
    };

    const script = document.createElement('script');
    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(script);

    return () => {
      // Limpeza do script quando o componente é desmontado
      document.head.removeChild(script);
    };
  }, []);

  return null; // Ou algum JSX, se necessário
};

export default WatsonChat;
