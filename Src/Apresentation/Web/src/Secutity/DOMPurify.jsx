import React from 'react';
import DOMPurify from 'dompurify';

const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
  });


const SafeComponent = ({ dirtyHTML }) => {
  // Sanitiza o HTML recebido como prop
  const cleanHTML = DOMPurify.sanitize(dirtyHTML);

  return (
    <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
  );
};

/*
Exemplo
import React from 'react';
import SafeComponent from './SafeComponent';

function App() {
  const userInput = '<img src="x" onerror="alert(\'XSS\')">This is a safe <strong>content</strong>.';

  return (
    <div className="App">
      <h1>Sanitized Content</h1>
      <SafeComponent dirtyHTML={userInput} />
    </div>
  );
}

export default App;

*/

export default SafeComponent;
