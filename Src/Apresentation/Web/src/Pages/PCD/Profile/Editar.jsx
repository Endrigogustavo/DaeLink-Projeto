import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDocs} from "firebase/firestore";
import { db, storage } from "../../../Database/Firebase";  // Ajuste o caminho conforme necessário
import { useParams, useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const AddDocumentoForm = () => {
  //Função de navegação do site
  const navigate = useNavigate();
  //Utilizado para pegar o id do usuario e da vaga na tela anterior
  const { id } = useParams();
  const [userId, setUserId] = useState(id);

  //Informações do usuario
  const [userData, setUserData] = useState()

  //Informações para guardar no banco de dados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [trabalho, setTrabalho] = useState("");
  const [descrição, setDescrição] = useState("");
  const [idade, setIdade] = useState("");
  const [sobre, setSobre] = useState("");
  const [experiencias, setExperiencia] = useState("");
  const [deficiencia, setDeficiencia] = useState("");


  useEffect(() => {

    const fetchUser = async () => {
          //Pega o candidato matriculado dentro das vagas
          const candidatosRef = collection(db, "PCD", userId);
          //Indentificando o usuario pelo ID
          const querySnapshot = await getDocs(candidatosRef);
          setUserData(querySnapshot)
    
          fetchUser()
}}, [id]);


  //Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      //Pega o candidato matriculado dentro das vagas
      const candidatosRef = collection(db, "PCD", userId);
      //Indentificando o usuario pelo ID
      const querySnapshot = await getDocs(candidatosRef);

      //Taramento de erros
      if (!querySnapshot.empty) {

        //Add informações no banco de dados
        await updateDoc(documentosRef, {
          nome: nome,
          endereco: endereco,
          telefone: telefone,
          email: email,
          idade: idade,
          url: downloadURL,
          userId: userId
        });

        alert("Documento adicionado com sucesso!");
        setDocumento(null);
        navigate(`/homeuser/${userId}`);
      } else {
        console.error("Candidato não encontrado.");
        alert("Erro ao adicionar documento: candidato não encontrado.");
      }
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder={userData.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTel(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
      </div>

      <br />
      <div>
        <input
          type="text"
          placeholder="Informatica"
          value={informatica}
          onChange={(e) => setInfo(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label>Documento:</label>
        <input
          type="file"
          onChange={(e) => setDocumento(e.target.files[0])}
        />
      </div>
      <button type="submit">Adicionar Documento</button>
    </form>
  );
};

export default AddDocumentoForm;
