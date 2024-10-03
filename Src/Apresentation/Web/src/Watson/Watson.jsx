import React, { useEffect } from 'react';

const WatsonChat = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "a438860f-919d-4d3e-8d3b-70412c8c3481", // O ID da integração.
      region: "au-syd", // Região da integração.
      serviceInstanceID: "239fa452-0d3f-4d0e-aa93-273b15005239", // O ID da instância do serviço.
      onLoad: async (instance) => {
        await instance.updateLocale('pt-br');
        instance.render();
      }
    };

    const t = document.createElement('script');
    t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + 
            (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);

    // Limpa o chat na desmontagem para evitar múltiplas instâncias
    return () => {
      document.head.removeChild(t);
      window.watsonAssistantChatOptions = null; // Limpa o namespace
    };
  }, []); // O array vazio faz com que o efeito só execute uma vez

  return null; // O componente não precisa renderizar nada
};

export default WatsonChat;
