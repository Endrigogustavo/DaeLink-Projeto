import React, { useEffect } from 'react';

const WatsonChat = () => {
  window.watsonAssistantChatOptions = {
    integrationID: "a438860f-919d-4d3e-8d3b-70412c8c3481", // The ID of this integration.
    region: "au-syd", // The region your integration is hosted in.
    serviceInstanceID: "239fa452-0d3f-4d0e-aa93-273b15005239", // The ID of your service instance.
    onLoad: async (instance) => { await 
      instance.updateLocale('pt-br')
      instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
};

export default WatsonChat;
