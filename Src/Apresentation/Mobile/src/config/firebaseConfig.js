// src/config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//const firebaseConfig = {
//apiKey: "AIzaSyAAB_EtOGn5m_rNzXr7SG7D61KcOwDsKgE",
//authDomain: "daelink-projeto.firebaseapp.com",
//projectId: "daelink-projeto",
//storageBucket: "daelink-projeto.appspot.com",
//messagingSenderId: "775363508579",
//appId: "1:775363508579:web:0426976db91adb4bd8fb56",
//measurementId: "G-TXSH5BXCHZ"
//};

const firebaseConfig = {
apiKey: "AIzaSyA-aYVeTIWTQWhBXG11iaCaBSWikfQWvlI",
authDomain: "daelink-producao.firebaseapp.com",
projectId: "daelink-producao",
storageBucket: "daelink-producao.appspot.com",
messagingSenderId: "1037795223095",
appId: "1:1037795223095:web:0803dc2cc54b676a4e01b2"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app)
const storage = getStorage(app);

export { auth, db ,storage};
