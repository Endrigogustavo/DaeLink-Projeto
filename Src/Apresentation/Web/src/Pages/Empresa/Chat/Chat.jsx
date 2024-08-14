//https://www.youtube.com/watch?v=u1rqGP7wgFc
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import "./ChatStyle.css"
import { useParams } from 'react-router-dom';
import { auth, db } from "../../../Database/Firebase"
import { addDoc, collection, orderBy, query, where, serverTimestamp , limit, getDocs} from "firebase/firestore";
import { useState, useRef, useEffect } from "react";

const App = () => {
    const [user] = useAuthState(auth)
    return (
        <div className="App">
            <header className="header">
                <h1>ReactChat</h1>
                <SingOut />
            </header>
            <section className="sectionchat">{user ? <ChatRoom/> : <SignIn />}</section>
        </div>
    );
};

export default App;

const ChatRoom = () => {
    const { id, idempresa } = useParams();
    const dummy = useRef();
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState("");
    const [messageRef, setMessageRef] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const candidatosRef = collection(db, "Chat");
            const q = query(candidatosRef, where("empresaId", "==", idempresa));
            const qq = query(q, where("userId", "==", id));
            const querySnapshot = await getDocs(qq);
            
            if (!querySnapshot.empty) {
                const documentRef = querySnapshot.docs[0]?.ref;
                if (documentRef) {
                    const messagesRef = collection(documentRef, "messages");
                    const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
                    setMessageRef(messagesRef);

                    const snapshot = await getDocs(messagesQuery);
                    setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                }
            }
        };

        fetchMessages();
    }, [idempresa]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (messageRef) {
            const { photoURL, uid } = auth.currentUser;

            await addDoc(messageRef, {
                text: formValue,
                uid,
                photoURL,
                createdAt: serverTimestamp(),
            });
            setFormValue("");
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // If messageRef is set, use it with useCollectionData
    const [collectionData] = useCollectionData(
        messageRef ? query(messageRef, orderBy("createdAt"), limit(25)) : null,
        { idField: "id" }
    );

    useEffect(() => {
        if (collectionData) {
            setMessages(collectionData);
        }
    }, [collectionData]);

    return (
        <>
            <main className="mainchat">
                {messages &&
                    messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                <div ref={dummy}></div>
            </main>
            <form className="formchat" onSubmit={sendMessage}>
                <input
                    type="text"
                    className="inputchat"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                />
                <button className="buttonchat">Enviar</button>
            </form>
        </>
    );
};

export const ChatMessage = (props) => {
    const {text, photoURL, uid} = props.message

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
    return (
        <div className={`message ${messageClass}`}>
            <img className="imgchat" src={photoURL}/>
            <p className="paragrafo">{text}</p>
        </div>
    )
}


export const SignIn = () => {
    const [SignInWithGoogle] = useSignInWithGoogle(auth)
    return(
        <button className="sign-in" onClick={() => SignInWithGoogle()}>
            Logar com google
        </button>
    )
}

export const SingOut = () => {
    return auth.currentUser && (<button className="sing-out" onClick={() => auth.signOut()}>Sair</button>)
    
}