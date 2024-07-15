import React, { useState, useEffect } from "react";
import { doc, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../../Database/Firebase";  // Ajuste o caminho conforme necessário
import { useParams, useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const AddDocumentoForm = () => {
  //Função de navegação do site
  const navigate = useNavigate();
  //Utilizado para pegar o id do usuario e da vaga na tela anterior
  const { id, vagaId } = useParams();
  const [userId, setUserId] = useState(id);
  const [vagaUid, setVagaUid] = useState(vagaId);

  //Informações para guardar no banco de dados
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");

  const [objetivo, setObjetivo] = useState("");

  const [experiencia1, setExp1] = useState("");
  const [experiencia2, setExp2] = useState("");
  const [experiencia3, setExp3] = useState("");

  const [formacao1a, setForm1a] = useState("");
  const [formacao2a, setForm2a] = useState("");
  const [formacao3a, setForm3a] = useState("");

  const [formacao1c, setForm1c] = useState("");
  const [formacao2c, setForm2c] = useState("");
  const [formacao3c, setForm3c] = useState("");


  const [qualificacao1, setQuali1] = useState("");
  const [qualificacao2, setQuali2] = useState("");
  const [qualificacao3, setQuali3] = useState("");
  const [qualificacao4, setQuali4] = useState("");
  const [qualificacao5, setQuali5] = useState("");

  const [idiomas1, setIdioma1] = useState("");
  const [idiomas2, setIdioma2] = useState("");

  const [informatica, setInfo] = useState("");

  const [documento, setDocumento] = useState(null);

  //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    //Inicializando os IDs
    if (id && vagaUid) {
      setUserId(id);
      setVagaUid(vagaUid);
    }
  }, [id, vagaUid]);

  //Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Utiliza o storage para guardar arquivos no banco
      const storageRef = ref(storage, `documentos/${documento.name}`);
      //Guardando dados
      await uploadBytes(storageRef, documento);
      //Pegando a URL de onde a imagem esta para colocar no banco como uma informação do usuario
      const downloadURL = await getDownloadURL(storageRef);

      //Pega o candidato matriculado dentro das vagas
      const candidatosRef = collection(db, "Vagas", vagaUid, "candidatos");
      //Indentificando o usuario pelo ID
      const q = query(candidatosRef, where("userId", "==", userId));
      //Pegando inromações
      const querySnapshot = await getDocs(q);

      //Taramento de erros
      if (!querySnapshot.empty) {
        //Fazendo tratamento das imagens
        const candidatoDoc = querySnapshot.docs[0];
        const candidatoId = candidatoDoc.id;

        //Perfil do candidato encontrado para enviar os documentos no nome dele
        const candidatoDocRef = doc(db, "Vagas", vagaUid, "candidatos", candidatoId);

        //Criando a tabela documentos no perfil do user
        const documentosRef = collection(candidatoDocRef, "documentos");

        //Add informações no banco de dados
        await addDoc(documentosRef, {
          nome: nome,
          endereco: endereco,
          telefone: telefone,
          email: email,
          idade: idade,
          objetivo: objetivo,
          experiencias1: experiencia1,
          experiencias2: experiencia2,
          experiencias3: experiencia3,
          formacao_academica1: formacao1a,
          formacao_academica2: formacao2a,
          formacao_academica3: formacao3a,
          formacao_complementar1: formacao1c,
          formacao_complementar2: formacao2c,
          formacao_complementar3: formacao3c,
          qualificação1: qualificacao1,
          qualificação2: qualificacao2,
          qualificação3: qualificacao3,
          qualificação4: qualificacao4,
          qualificação5: qualificacao5,
          idioma1: idiomas1,
          idioma2: idiomas2,
          informatica: informatica,
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
          type="hidden"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
      <br />
      <div>
        <input
          type="text"
          placeholder="Objetivo Profissional"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
        />
      </div>
      <br />
      <br />

      <div>
        <input
          type="text"
          placeholder="Experiencia 1"
          value={experiencia1}
          onChange={(e) => setExp1(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Experiencia 2"
          value={experiencia2}
          onChange={(e) => setExp2(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Experiencia 3"
          value={experiencia3}
          onChange={(e) => setExp3(e.target.value)}
        />
      </div>
      <br />
      <br />

      <div>
        <input
          type="text"
          placeholder="Formação academica 1"
          value={formacao1a}
          onChange={(e) => setForm1a(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Formação academica 2"
          value={formacao2a}
          onChange={(e) => setForm2a(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Formação academica 3"
          value={formacao3a}
          onChange={(e) => setForm3a(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div>
        <input
          type="text"
          placeholder="Formação complementar 1"
          value={formacao1c}
          onChange={(e) => setForm1c(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Formação complementar 2"
          value={formacao2c}
          onChange={(e) => setForm2c(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Formação complementar 3"
          value={formacao3c}
          onChange={(e) => setForm3c(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div>
        <input
          type="text"
          placeholder="Qualificação 1"
          value={qualificacao1}
          onChange={(e) => setQuali1(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Qualificação 2"
          value={qualificacao2}
          onChange={(e) => setQuali2(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Qualificação 3"
          value={qualificacao3}
          onChange={(e) => setQuali3(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Qualificação 4"
          value={qualificacao4}
          onChange={(e) => setQuali4(e.target.value)}
        />
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Qualificação 5"
          value={qualificacao5}
          onChange={(e) => setQuali5(e.target.value)}
        />
      </div>
      <br />
      <br />

      <div>
        <input
          type="text"
          placeholder="Idioma 1"
          value={idiomas1}
          onChange={(e) => setIdioma1(e.target.value)}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Idioma 2"
          value={idiomas2}
          onChange={(e) => setIdioma2(e.target.value)}
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
