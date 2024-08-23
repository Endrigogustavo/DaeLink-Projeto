const functions = require('firebase-functions');
const admin = require('firebase-admin');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

admin.initializeApp();

exports.sanitizeJobDescription = functions.https.onCall((data, context) => {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  const sanitizedDescription = purify.sanitize(data.description);

  // Retorna a descrição sanitizada para o cliente React
  return { sanitizedDescription };
});
