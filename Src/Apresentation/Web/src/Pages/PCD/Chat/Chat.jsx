//https://www.youtube.com/watch?v=u1rqGP7wgFc
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import "./ChatStyle.css"
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from "../../../Database/Firebase"
import { addDoc, collection, orderBy, query, where, serverTimestamp, limit, getDocs } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { decrypt } from "../../../Security/Cryptography_Rotes";

import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const ChatRoom = () => {
const navigate = useNavigate();
    const { encryptedId, empresaId } = useParams();
    const decryptedId = decodeURIComponent(decrypt(encryptedId))
    const dummy = useRef();
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState("");
    const [messageRef, setMessageRef] = useState(null);

    useEffect(() => {
        alert(decryptedId)
        alert(decryptedId)
        const GetChatMessage = async () => {
            const ChatCollection = collection(db, "Chat");
            const GetQueryPCDId = query(ChatCollection, where("userId", "==", decryptedId));
            const GetQueryCompanyId = query(GetQueryPCDId, where("empresaId", "==", empresaId));
            const GetChatWithCompanyAndPCD = await getDocs(GetQueryCompanyId);

            if (!GetChatWithCompanyAndPCD.empty) {
                const DocumentRef = GetChatWithCompanyAndPCD.docs[0]?.ref;
                if (DocumentRef) {
                    const MessagesRef = collection(DocumentRef, "messages");
                    const MessagesQuery = query(MessagesRef, orderBy("createdAt"), limit(25));
                    setMessageRef(MessagesRef);

                    const GetMessages = await getDocs(MessagesQuery);
                    setMessages(GetMessages.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                }
            }
        };

        GetChatMessage();
    }, [decryptedId]);

    const CreateNewMessage = async (e) => {
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

    const handleButtonClickReturn = () => {
        navigate(-1); // Simplesmente volta para a página anterior
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full h-24 flex items-center bg-gray-700 px-12 gap-3">
                    <button onClick={handleButtonClickReturn}>
                        <FaCircleArrowLeft className="text-3xl text-white" />
                    </button>
                    <img src="https://t.ctcdn.com.br/aFp_I8ScTJJch32H29ImNebDEYU=/i489949.jpeg" alt="" className="w-12 h-12 rounded-full border-2 border-blue-500 " />
                    <h1 className="font-medium text-white">Apple</h1>
                </div>

                <div className="Chatcontainer ">
                    {messages &&
                        messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg} />
                        ))}
                    <div ref={dummy}></div>
                </div>

                <form className="MessageForm  py-3" onSubmit={CreateNewMessage}>
                    <input
                        type="text"
                        className=" h-full border-2 bg-gray-700 respon-w-input rounded-full flex w-4/5 text-white p-4 mt-1"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                    />
                    <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center"><IoSend className="text-white text-3xl" /></button>
                </form>
            </div>
        </>
    );
};

export const ChatMessage = (props) => {
    const { text, photoURL, uid } = props.message

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
    return (
        <div className={`message ${messageClass}`}>
            <img className="imgchat" src={photoURL} />
            <p className="paragrafo">{text}</p>
        </div>
    )
}


export const SignIn = () => {
    const [SignInWithGoogle] = useSignInWithGoogle(auth)
    return (
        <button className="sign-in" onClick={() => SignInWithGoogle()}>
            Logar com google
        </button>
    )
}

export default ChatRoom;
