import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DocumentosStates = () => {
    const navigate = useNavigate();
    const { id, vagaId } = useParams();

    const [userId, setUserId] = useState(id);
    const [vagaUid, setVagaUid] = useState(vagaId);

    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");

    const [objetivo, setObjetivo] = useState("");

    const [experiencia1, setExperiencia1] = useState("");
    const [experiencia2, setExperiencia2] = useState("");
    const [experiencia3, setExperiencia3] = useState("");

    const [formacao1a, setFormacao1a] = useState("");
    const [formacao2a, setFormacao2a] = useState("");
    const [formacao3a, setFormacao3a] = useState("");


    const [idiomas, setIdiomas] = useState("");
    const [documento, setDocumento] = useState(null);

    useEffect(() => {
        if (id && vagaId) {
            setUserId(id);
            setVagaUid(vagaId);
        }
    }, [id, vagaId]);

    return {
        userId, setUserId,
        vagaUid, setVagaUid,
        nome, setNome,
        endereco, setEndereco,
        telefone, setTelefone,
        email, setEmail,
        idade, setIdade,
        objetivo, setObjetivo,
        experiencia1, setExperiencia1,
        experiencia2, setExperiencia2,
        experiencia3, setExperiencia3,
        formacao1a, setFormacao1a,
        formacao2a, setFormacao2a,
        formacao3a, setFormacao3a,
        idiomas, setIdiomas,
        documento, setDocumento
    };
}

export default DocumentosStates;
