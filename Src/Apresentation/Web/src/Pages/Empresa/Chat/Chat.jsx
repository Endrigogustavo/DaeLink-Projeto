import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./ChatStyle.css";
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from "../../../Database/Firebase";
import { addDoc, collection, orderBy, query, where, serverTimestamp, limit, getDoc, doc, getDocs } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";

import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const ChatRoomEmpresa = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    // States for storing user and empresa profile
    const [id, setId] = useState("")
    const [userProfile, setUserProfile] = useState(null);
    const [empresaProfile, setEmpresaProfile] = useState(null);
    const dummy = useRef();
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState("");
    const [messageRef, setMessageRef] = useState(null);

    const [idempresa, setUserId] = useState('');

    const chatContainerRef = useRef(null);


    // Fetch chat messages and profiles
    useEffect(() => {
        const GetChatMessage = async () => {
            try {
                const storedUserId = localStorage.getItem('userId');
                if (storedUserId) {
                    const userId = storedUserId;
                    setUserId(userId)
                }

                const id = localStorage.getItem("chatId")
                setId(id)
                // Chat collection and query
                const ChatCollection = collection(db, "Chat");
                const GetQueryCompanyId = query(ChatCollection, where("empresaId", "==", idempresa));
                const GetQueryPCDId = query(GetQueryCompanyId, where("userId", "==", id));
                const GetChatWithCompanyAndPCD = await getDocs(GetQueryPCDId);

                // Get PCD profile
                const getPCDprofile = async () => {
                    const PCDdoc = doc(db, "PCD", id);
                    const GetPCDInfo = await getDoc(PCDdoc);
                    if (GetPCDInfo.exists()) {
                        setUserProfile(GetPCDInfo.data());
                    } else {
                        console.warn("No PCD profile found!");
                        setUserProfile(null);
                    }
                };
                await getPCDprofile();

                // Get Empresa profile
                const getEmpresaProfile = async () => {
                    const empresaDoc = doc(db, "Empresa", idempresa);
                    const empresaSnap = await getDoc(empresaDoc);

                    if (empresaSnap.exists()) {
                        setEmpresaProfile(empresaSnap.data());
                    } else {
                        console.warn("No Empresa profile found!");
                        setEmpresaProfile(null);
                    }
                };
                await getEmpresaProfile();

                // Fetch chat messages if there is a chat between the user and company
                if (!GetChatWithCompanyAndPCD.empty) {
                    const DocumentRef = GetChatWithCompanyAndPCD.docs[0]?.ref;
                    if (DocumentRef) {
                        const MessagesRef = collection(DocumentRef, "messages");
                        const MessagesQuery = query(MessagesRef, orderBy("createdAt"), limit(25));
                        setMessageRef(MessagesRef);

                        const GetMessages = await getDocs(MessagesQuery);
                        setMessages(GetMessages.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                    }
                } else {
                    console.warn("No chat found for this user and company");
                }
            } catch (error) {
                console.error("Error fetching chat messages or profiles:", error);
            }
            finally {
                setLoading(false);
            }
        };

        GetChatMessage();
    }, [id, idempresa]);

    // Create new message
    const CreateNewMessage = async (e) => {
        e.preventDefault();

        if (messageRef && userProfile) {
            const { uid } = auth.currentUser;
            try {
                await addDoc(messageRef, {
                    text: formValue, // Texto da mensagem
                    uid, // UID do usuário autenticado
                    pcdId: idempresa, // ID do PCD (decryptedId)
                    pcdImageUrl: idempresa.imageUrl || null, // URL da imagem do perfil do PCD (ou null se não existir)
                    createdAt: serverTimestamp(), // Timestamp do servidor
                });
                setFormValue(""); // Limpa o campo de texto
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; // Faz o scroll para a última mensagem
                }
            } catch (error) {
                console.error("Error sending message:", error); // Loga o erro caso aconteça
            }
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
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; // Rolagem automática ao carregar mensagens
            }
        }
    }, [collectionData]);

    // Handle back button click
    const handleButtonClickReturn = () => {
        navigate(-1); // Simply go back to the previous page
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gray-200">
            <div className="w-full h-24 flex items-center bg-gray-700 px-12 gap-3">
                <button onClick={handleButtonClickReturn}>
                    <FaCircleArrowLeft className="text-3xl text-white" />
                </button>
                {userProfile && (
                    <>
                        <img src={userProfile.imageUrl} alt="Logo" className="w-12 h-12 rounded-full border-2 border-blue-500 " />
                        <h1 className="font-medium text-white">{userProfile.name}</h1>
                    </>
                )}
            </div>

            <div ref={chatContainerRef} className="Chatcontainer pt-4 px-12">
                {messages && messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        message={{
                            ...msg,
                            pcdImageUrl: userProfile?.imageUrl, // Passa a imagem do PCD
                            empresaImageUrl: empresaProfile?.imageUrl // Passa a imagem da empresa
                        }}
                    />
                ))}
                <div ref={dummy}></div>
            </div>

            <form className="MessageForm py-3" onSubmit={CreateNewMessage}>
                <input
                    type="text"
                    className="h-full border-2 bg-gray-700 respon-w-input rounded-full flex w-4/5 text-white p-4 mt-1"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    required
                />
                <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <IoSend className="text-white text-3xl" />
                </button>
            </form>
        </div>
    );
};

// Componente para renderizar a mensagem
export const ChatMessage = (props) => {
    const { text, uid, pcdImageUrl, empresaImageUrl } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const imageToShow = messageClass === 'sent' ? empresaImageUrl : pcdImageUrl;

    return (
        <div className={`message ${messageClass}`}>
            <img className="imgchat border-2 border-blue-500" src={imageToShow || "/default.png"} alt="User profile " />
            <p className="paragrafo">{text}</p>
        </div>
    );
};

export default ChatRoomEmpresa;
