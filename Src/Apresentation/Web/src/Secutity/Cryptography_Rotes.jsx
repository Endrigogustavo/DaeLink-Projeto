import CryptoJS from 'crypto-js';

const secretKey = 'DaelinkKey';

export function encrypt(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decrypt(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function Dashboard({ match }) {
    const encryptedId = match.params.id;
    const decryptedId = decrypt(encryptedId);
  
    return <div>Dashboard - User ID: {decryptedId}</div>;
  }