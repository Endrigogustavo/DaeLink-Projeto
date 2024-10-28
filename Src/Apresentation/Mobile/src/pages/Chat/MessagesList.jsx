import { View, ScrollView } from 'react-native';
import React, { useState, useRef,  } from 'react';
import Message from './message'; // Corrigido para referenciar o componente Message corretamente

export default function MessagesList({messages, userId, empresaId, }) {

 
  const message = messages; // mensagens passadas como prop
  const user = userId; // Usuário atual
  const scrollViewRef = useRef(null); 
  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })} 
    >
    {message.map((msg) => (
  <Message
   key={msg.id}
    isLeft={userId !== msg.uid}
    message={msg.text}
  />
))}

    </ScrollView>
  );
}
