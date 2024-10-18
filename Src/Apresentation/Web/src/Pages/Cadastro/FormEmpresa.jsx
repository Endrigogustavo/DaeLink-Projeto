import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmpresa } from '../../Auth/Auth';
import { auth } from '../../Database/Firebase'
import { MdExitToApp } from "react-icons/md";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";
import { IoDocumentAttachSharp } from "react-icons/io5";
import './CadastroCss.css';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Modal from './Modal';
import { FaClipboardList, FaIdCard, FaUser } from 'react-icons/fa';


const EmpresaFormRegister = () => {
    //Variaveis onde as informações serão setadas
    const [step, setStep] = useState(1);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [profilebackgroundpreview, setProfileBackgroundpreview] = useState('https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [cep, setCep] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");
    const [sobre, setSobre] = useState("");
    const [area, setArea] = useState("");
    const [loading, setLoading] = useState(false);
    const [CNPJError, setCNPJErro] = useState('')


    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    //Variavel para fazer gerenciamento de nivel de acesso
    const [tipo] = useState("Empresa");
    //Função de navegação do site
    const navigate = useNavigate();

    const textareaRefs = {
        sobre: useRef(null),
        area: useRef(null),

    };



    const adjustTextareaHeight = (ref) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };


    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleNext = () => {
        let isValid = true;

        // Validação para a etapa 1
        if (step === 1) {
            if (!name || !email || !password) {
                alert("Por favor, preencha todos os campos da Etapa 1.");
                isValid = false;
            }
        }

        // Validação para a etapa 2
        if (step === 2) {
            if (!cep || !cnpj || !endereco) {
                alert("Por favor, preencha todos os campos da Etapa 2.");
                isValid = false;
            }

        }

        // Se todas as validações forem bem-sucedidas, avançar para o próximo passo
        if (isValid) {
            setStep(step + 1);
        }
    };

    const handleClear = () => {
        setProfileImage(null);
        setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
        setBackgroundImage(null);
        setEmail("");
        setPassword("");
        setName("");
        setArea("");
        setEndereco("");
        setIdade("");
        setCnpj("");
        setSobre("");
        setTipo("Empresa");
    };

    // Borão para fazer Cadastro
    const handleRegister = async () => {
        // Verificar se o formato do e-mail é válido
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("O formato de email é invalido, tente novamente.");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("O formato de email é inválido, tente novamente.");
            return;
        }

        setLoading(true);

        //Função do Auth.jsx para fazer login enviando os parametros do form
        const response = await registerEmpresa(email, password, sobre, area, cnpj, endereco, cep, tipo, profileImage, backgroundImage, { name });
        if (response.success) {
            const auth = getAuth();
            const user = auth.currentUser; // Certifique-se de obter o 'user' da autenticação
            const id = user.uid; // Pegue o UID do usuário autenticado
            localStorage.setItem('userId', id);
            await axios.post('http://localhost:3000/cookie', { id }, {
                withCredentials: true
            });

            setModalMessage("Cadastro Realizado com Sucesso, e Email de Verificação Enviado");
            await sendEmailVerification(auth.currentUser)
                .then(() => {
                    setModalOpen(true);
                });

            setTimeout(() => {

                navigate(`/homeempresa/`);
            }, 3000);

        } else {
            alert("Falha ao criar um registro, tente novamente.");
            setLoading(false);
        }
    };

    useEffect(() => {
        Object.values(textareaRefs).forEach(adjustTextareaHeight);
    }, []);

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
        }
    };

    const handleProfileBackgroundChange = (e) => {
        const file = e.target.files[0]
        setBackgroundImage(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileBackgroundpreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileBackgroundpreview('https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png');
        }
    };

    const progressPercentage = (step / 3) * 100; // Calcular a porcentagem de progresso
    const validateCNPJ = (cnpj) => {
        // Remove caracteres especiais
        cnpj = cnpj.replace(/[^\d]+/g, '');
        console.log("CNPJ sem caracteres especiais:", cnpj); // Debug

        // CNPJ deve ter 14 dígitos
        if (cnpj.length !== 14) {
            console.log("CNPJ inválido: deve ter 14 dígitos."); // Debug
            return false;
        }

        // Verifica se todos os dígitos são iguais (ex: 11111111111111)
        if (/^(\d)\1+$/.test(cnpj)) {
            console.log("CNPJ inválido: todos os dígitos são iguais."); // Debug
            return false;
        }

        // Cálculo do primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cnpj[i]) * (5 - (i % 8));
        }
        let firstVerifier = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
        console.log("Primeiro dígito verificador calculado:", firstVerifier); // Debug

        if (firstVerifier !== parseInt(cnpj[12])) {
            console.log("CNPJ inválido: primeiro dígito verificador não corresponde."); // Debug
            return false;
        }

        // Cálculo do segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cnpj[i]) * (6 - (i % 8));
        }
        let secondVerifier = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
        console.log("Segundo dígito verificador calculado:", secondVerifier); // Debug

        if (secondVerifier !== parseInt(cnpj[13])) {
            console.log("CNPJ inválido: segundo dígito verificador não corresponde."); // Debug
            return false;
        }

        return true;
    };


    const handleCNPJChange = (e) => {
        const value = e.target.value;
        setCnpj(value);
        if (validateCNPJ(value)) {
            setCNPJErro('');
        } else {
            setCNPJErro('CNPJ inválido');
        }
    };

    function voltarincon() {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-32 w-32 mb-4"></div>
                </div>

            ) : (
                <>
                    <div>
                        <Modal isOpen={isModalOpen} message={modalMessage} />
                    </div>

                    <div className='h-full w-full flex flex-col items-center justify-center gap-4'>

                        <div className='w-full h-fit flex flex-col items-center justify-center'>
                            <div className='w-full justify-end flex items-center px-14'>
                                <button onClick={voltarincon} className='flex h-fit items-center gap-1 '>
                                    <p className='font-medium'>Voltar</p>
                                    <MdExitToApp className='text-4xl text-gray-800 iconhover ' />
                                </button>
                            </div>
                            <h1 className="font-extrabold text-3xl my-4">Cadastro Empresa</h1>
                            <div className='w-full h-fit flex justify-center items-center gap-8'>
                                <div className="flex flex-col items-center">
                                    <TbCircleNumber1Filled size={30} className={` ${step === 1 ? 'text-blue-600' : 'text-gray-900'}`} />
                                </div>
                                <div className="flex flex-col items-center">
                                    <TbCircleNumber2Filled size={30} className={`${step === 2 ? 'text-blue-600' : 'text-gray-900'}`} />
                                </div>
                                <div className="flex flex-col items-center">
                                    <TbCircleNumber3Filled size={30} className={`${step === 3 ? 'text-blue-600' : 'text-gray-900'}`} />
                                </div>
                            </div>
                            <div className="w-2/5 bg-gray-200 rounded-full h-2 ">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>

                        <div className='w-full h-fit grid  registerinputsgrid justify-items-center mt-2 gap-y-4'>
                            {step === 1 && (
                                <>
                                    <label htmlFor="profile-image-input" className='flex flex-col items-center w-fit  h-fit justify-center cursor-pointer gap-1'>
                                        <img src={profileImagePreview}
                                            className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover" alt="Preview Perfil" />
                                        <p className='text-center font-medium'>Foto Perfil</p></label>
                                    <input required id="profile-image-input" type="file" className='hidden' accept="image/*" onChange={handleProfileImageChange} />

                                    <div>

                                        <label htmlFor="background-image-input" className='flex flex-col items-center w-fit  h-fit justify-center cursor-pointer gap-1'>
                                            <img src={profilebackgroundpreview}
                                                className="w-60 h-32 rounded-3xl border-2 border-blue-600 object-cover" alt="Preview Background" />
                                            <p className='text-center font-medium'>Background Perfil</p>
                                        </label>
                                        <input required id="background-image-input" type="file" className='hidden' accept="image/*" onChange={handleProfileBackgroundChange} />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-lg font-medium">Nome</label>
                                        <input required type="text" className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                            placeholder="Insira o nome da empresa" value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Email</label>
                                        <input required type="text" className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                            placeholder="Insira seu Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Senha</label>
                                        <input required type="password" className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                            placeholder="Insira sua Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Confirmar senha</label>
                                        <input required type="password" className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                            placeholder="Confirme sua Senha"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>

                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">CNPJ</label>
                                        <InputMask
                                            required
                                            mask="99.999.999/9999-99"
                                            value={cnpj}
                                            onChange={handleCNPJChange}
                                            className={`w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent ${CNPJError ? 'border-red-500' : ''}`}
                                            placeholder="Digite seu CNPJ"
                                        />
                                        {CNPJError && <span className="text-red-500 text-sm">{CNPJError}</span>}
                                    </div>

                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">CEP</label>
                                        <InputMask
                                            required
                                            mask="99999-999"
                                            value={cep}
                                            onChange={(e) => setCep(e.target.value)}
                                            className={`w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent ${CNPJError ? 'border-red-500' : ''}`}
                                            placeholder="Digite seu CEP"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-lg font-medium">Endereço</label>
                                        <input required
                                            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                            placeholder="insira o Endereço"
                                            value={endereco}
                                            onChange={(e) => setEndereco(e.target.value)} />
                                    </div>


                                </>
                            )}

                            {/* Etapa 3 */}
                            {step === 3 && (
                                <>
                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Sobre a Empresa</label>
                                        <textarea required
                                            ref={textareaRefs.sobre}
                                            className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                                            placeholder="Fale um pouco sobre você"
                                            value={sobre}
                                            onChange={(e) => {
                                                setSobre(e.target.value);
                                                adjustTextareaHeight(textareaRefs.sobre);
                                            }} />
                                    </div>

                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Ramo da Empresa</label>
                                        <select
                                            name="deficiencia"
                                            value={area} onChange={(e) => setArea(e.target.value)}
                                            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                        >
                                            <option value="" disabled>Selecione a área de atuação</option>
                                            <option value="Entretenimento">Entretenimento</option>
                                            <option value="Automotivo">Automotivo</option>
                                            <option value="Tecnologia">Tecnologia</option>
                                            <option value="Saúde">Saúde</option>
                                            <option value="Educação">Educação</option>
                                            <option value="Finanças">Finanças</option>
                                            <option value="Comércio">Comércio</option>
                                            <option value="Segurança">Segurança</option>
                                            <option value="Varejo">Varejo</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="Alimentação">Alimentação</option>
                                            <option value="Esportes">Esportes</option>
                                            <option value="Moda">Moda</option>
                                            <option value="Logística">Logística</option>
                                            <option value="Tecnologia da Informação">Tecnologia da Informação</option>
                                            <option value="Marketing Digital">Marketing Digital</option>
                                            <option value="Entretenimento Digital">Entretenimento Digital</option>
                                            <option value="Saúde e Bem-Estar">Saúde e Bem-Estar</option>
                                        </select>
                                    </div>
                                </>
                            )}



                        </div>
                        <div className='w-full h-fit flex items-center justify-center gap-2 mt-2'>
                            {step > 1 && (
                                <button onClick={handlePrevious}
                                    className="w-32 bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition-all">Voltar</button>
                            )}
                            {step < 3 ? (
                                <button onClick={handleNext}
                                    className="w-32 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all">Próximo</button>
                            ) : (
                                <button onClick={handleRegister}
                                    disabled={loading}
                                    className="w-32 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all">Cadastrar</button>
                            )}
                            <button onClick={handleClear} className="w-32 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full transition-all">Limpar</button>
                        </div>

                    </div>

                </>
            )}
        </>
    );
};

export default EmpresaFormRegister;
