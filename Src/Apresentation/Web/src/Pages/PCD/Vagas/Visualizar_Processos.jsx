import { collection, query, where } from "firebase/firestore";
const citiesRef = collection(db, "cities");

const q = query(citiesRef, where("capital", "==", true));