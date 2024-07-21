//https://www.youtube.com/watch?v=u1rqGP7wgFc
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import "./Chat.css"
import { auth, db } from "../../Database/Firebase"
import { addDoc, collection, orderBy, query, serverTimestamp , limit} from "firebase/firestore";
import { useState, useRef} from "react";

const App = () => {
    const [user] = useAuthState(auth)
    return (
        <div className="App">
            <header>
                <h1>ReactChat</h1>
                <SingOut />
            </header>
            <section>{user ? <ChatRoom/> : <SignIn />}</section>
        </div>
    );
};

export default App;

export const ChatRoom = () => {
    const dummy = useRef()
    const messageRef = collection(db, "messages")
    const QueryMessages = query(messageRef, orderBy("createdAt"), limit(25))
    const [messages] = useCollectionData(QueryMessages, {idField: "id"})

    const [formValue, setFormValue] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault()

        const {photoURL, uid} = auth.currentUser

        await addDoc(messageRef, {
            text: formValue,
            uid,
            photoURL,
            createdAt: serverTimestamp(),
        })
        setFormValue("")
        dummy.current.scrollIntoView({behavior: 'smooth'})
    }
    return (
        <>
        <main>
            {messages &&
             messages.map((msg, index) =>(
             <ChatMessage key={index} message={msg}/>
             ))}
             <div ref={dummy}></div>
        </main>
        <form onSubmit={sendMessage}>
            <input type="text" 
            value={formValue}
            onChange={e => setFormValue(e.target.value)}
             />
            <button>Enviar</button>
        </form>
        </>
    )
}


export const ChatMessage = (props) => {
    const {text, photoURL, uid} = props.message

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL}/>
            <p>{text}</p>
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