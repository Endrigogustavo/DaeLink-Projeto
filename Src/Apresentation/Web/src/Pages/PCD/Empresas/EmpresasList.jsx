import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { encrypt } from '../../../Security/Cryptography_Rotes';

function EmpresasList() {
    // Variáveis onde as informações serão setadas
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect é utilizado para buscar os dados quando o componente é montado
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                // Caminho das informações no banco
                const CompanyCollection = collection(db, "Empresa");
                // Pegando dados
                const data = await getDocs(CompanyCollection);
                // Atualizando o estado com os dados recebidos
                setEmpresas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error("Erro ao buscar empresas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmpresas();
    }, []);

    const ViewCompanyProfile = (id) => {
        const encryptedId = encodeURIComponent(encrypt(id));
        navigate(`/visualizperfilempresa/${encryptedId}`);
    };

    return (
        <>
            <div className={`w-full h-fit flex justify-center items-center flex-col ${loading ? '' : 'grid  Empresascontainer gap-4 justify-items-center items-center pb-4'}`}>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    </div>
                ) : (
                    empresas.length > 0 ? (
                        empresas.map((empresa) => (
                            <div key={empresa.id} className='h-80 w-72 bg-gray-900 rounded-xl flex flex-col items-center justify-center gap-2 border-blue-500 border-4 overflow-x-hidden'>
                            </div>
                        ))
                    ) : (
                        <p>Sem empresas disponíveis</p>
                    )
                )}
            </div>
        </>
    );
}

export default EmpresasList;
