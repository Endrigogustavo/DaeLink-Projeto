import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento"
import ProcessosPage from './ProcessosPage'; 

function Visualizar_Processo() {
    //Pegar o id do usuario na tela anterior
    const { id } = useParams();
    //Variaveis para setar dados do banco
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(true);

    //Função de navegação do site
    const navigate = useNavigate()

    //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)

    return (
        <>
            <ProcessosPage/>
            
        </>
    );
}

export default Visualizar_Processo;