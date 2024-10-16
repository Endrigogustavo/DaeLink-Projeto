import { View, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';
import Message from './message'; // Corrigido para referenciar o componente Message corretamente

export default function MessagesList({messages, userId, empresaId }) {

 
  const message = messages; // Utilize as mensagens passadas como prop


  const user = userId; // Usuário atual
  const scrollViewRef = useRef(null); // Referência do ScrollView para controlar o scroll automático

  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })} // Scroll automático ao final
    >
    {message.map((msg) => (
  <Message
    isLeft={userId !== userId}
    message={msg.text}
  />
))}

    </ScrollView>
  );
}
