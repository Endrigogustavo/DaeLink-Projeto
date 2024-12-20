import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmpresa } from '../../Auth/Auth';
import { auth } from '../../Database/Firebase'
import { MdExitToApp } from "react-icons/md";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";
import { IoDocumentAttachSharp } from "react-icons/io5";
import './CadastroCss.css';
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Modal from './Modal';
import CropEasy from '../../Components/Imagecrop/CropEasy';


const EmpresaFormRegister = () => {
    //Variaveis onde as informações serão setadas
    const [step, setStep] = useState(1);
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
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);

    const [ramosearch, setRamosearch] = useState(""); // Estado para o valor digitado
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Controle de visibilidade do dropdown
    const dropdownRef = useRef(null);

    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [profilebackgroundpreview, setProfileBackgroundpreview] = useState('https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [isProfile, setIsProfile] = useState(false);
    const aspectRatio = isProfile ? 1 : 16 / 9;

    const ramos = [
        "Alimentação",
        "Automotivo",
        "Comércio",
        "E-commerce",
        "Educação",
        "Entretenimento",
        "Entretenimento Digital",
        "Esportes",
        "Finanças",
        "Logística",
        "Marketing Digital",
        "Moda",
        "Saúde e Bem-Estar",
        "Segurança",
        "Tecnologia",
        "Tecnologia da Informação",
        "Varejo",
    ];

    // Filtra as áreas com base na busca
    const filteredAreas = ramos.filter((area) =>
        area.toLowerCase().includes(ramosearch.toLowerCase())
    );

    const handleBlur = (e) => {
        // Verifica se o foco foi perdido para um elemento fora do dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
            setIsDropdownVisible(false);
        }
    };

    const handleSelectArea = (selectedArea) => {
        setArea(selectedArea); // Define a área selecionada
        setRamosearch(selectedArea); // Atualiza o input com o valor selecionado
        setIsDropdownVisible(false); // Esconde o dropdown após a seleção
    };

    //Variavel para fazer gerenciamento de nivel de acesso
    const [tipo] = useState("Empresa");
    //Função de navegação do site
    const navigate = useNavigate();

    const textareaRefs = {
        sobre: useRef(null),
        area: useRef(null),
        enderecoRef: useRef(null)
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
            if (!name || !email || !password || !confirmPassword || !profileImage || !backgroundImage) {
                setWorksModal(false)
                setModalMessage("Por favor, preencha todos os campos da Etapa 1.")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
                isValid = false;
            }

            if (password !== confirmPassword) {
                setWorksModal(false)
                setModalMessage("As senhas não coincidem.")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                    return;
                }, 2200);
                isValid = false;
            }

            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                setWorksModal(false);
                setModalMessage("Email Inválido");
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                    return;
                }, 2200);
                isValid = false;
            }
        }

        // Validação para a etapa 2
        if (step === 2) {
            if (!cep || !cnpj || !endereco) {
                setWorksModal(false)
                setModalMessage("Por favor, preencha todos os campos da Etapa 2.")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
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
        if (!ramos.includes(area)) {
            setWorksModal(false)
            setModalMessage("Ramo inválido")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false);
                return;
            }, 2200);
        } else {

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

                setWorksModal(true)
                setModalMessage("Cadastro Realizado com Sucesso");
                setModalOpen(true);

                await sendEmailVerification(auth.currentUser)
                    .then(() => {
                        setModalOpen(true);
                    });

                setTimeout(() => {
                    const auth = getAuth();
                    onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            const uid = user.uid;
                            try {
                                await axios.post('http://localhost:3000/cookie', { uid }, {
                                    withCredentials: true
                                });
                            } catch (error) {
                                console.error("Error posting cookie: ", error);
                            }
                        }
                    })
                    navigate(`/homeempresa/`);
                }, 3000);

            } else {
                setWorksModal(false)
                setModalMessage("Falha ao Criar Registro")
                setModalOpen(true)
                setLoading(false);
                setTimeout(() => {
                    navigate(0)
                }, 2200);

            }
        }
    };

    useEffect(() => {
        Object.values(textareaRefs).forEach(adjustTextareaHeight);
    }, []);


    const progressPercentage = (step / 3) * 100; // Calcular a porcentagem de progresso

    const validateCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj === '') return false;
        if (cnpj.length !== 14) return false;

        // Elimina CNPJs inválidos conhecidos
        const invalidCNPJs = [
            "00000000000000", "11111111111111", "22222222222222",
            "33333333333333", "44444444444444", "55555555555555",
            "66666666666666", "77777777777777", "88888888888888",
            "99999999999999"
        ];
        if (invalidCNPJs.includes(cnpj)) return false;

        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);

        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;

        tamanho++;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;

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

    function voltarincon(e) {
        e.preventDefault();
        navigate('/cadastro');
    }

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        const filesize = file.size / 1024 / 1024;

        if (file) {
            if (filesize > 5) {
                setWorksModal(false);
                setModalMessage("Arquivo maior de 5MB");
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
                setProfileImage("");
                setProfileImagePreview("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
            } else {
                setIsProfile(true)
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageToCrop(reader.result); // Abre o modal de recorte para a imagem de perfil
                    setIsProfile(true); // Indicador de que é para o perfil
                };
                reader.readAsDataURL(file);
            }
        } else {
            setProfileImagePreview("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
        }
    };

    const handleProfileBackgroundChange = (e) => {
        const file = e.target.files[0];
        const filesize = file.size / 1024 / 1024;

        if (file) {
            if (filesize > 5) {
                setWorksModal(false);
                setModalMessage("Arquivo maior de 5MB");
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
                setBackgroundImage("");
                setProfileBackgroundpreview("https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png");
            } else {
                setIsProfile(false)
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageToCrop(reader.result); // Abre o modal de recorte para a imagem de fundo
                    setIsProfile(false); // Indicador de que é para o background
                };
                reader.readAsDataURL(file);
            }
        } else {
            setProfileBackgroundpreview("https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png");
        }
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-32 w-32 mb-4"></div>
                </div>

            ) : (
                <>
                    <div>
                        <Modal isOpen={isModalOpen} message={modalMessage} Works={isWorksModal} />
                        {imageToCrop && (
                            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50'>
                                <div className={` h-fit rounded-3xl border-2 border-gray-300 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden
                                    ${isProfile ? 'w-96  ' : 'w-backgroundcrop'}`}>
                                    <CropEasy
                                        imageToCrop={imageToCrop}
                                        setImageToCrop={setImageToCrop}
                                        setPreview={isProfile ? setProfileImagePreview : setProfileBackgroundpreview}
                                        setFile={isProfile ? setProfileImage : setBackgroundImage}
                                        aspectRatio={aspectRatio}

                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='h-full w-full flex flex-col items-center justify-center gap-4'>

                        <div className='w-full h-fit flex flex-col items-center justify-center'>
                            <div className='w-full justify-end flex items-center px-14'>
                                <button onClick={(e) => voltarincon(e)} className='flex h-fit items-center gap-1 iconhover '>
                                    <p className='font-medium'>Voltar</p>
                                    <MdExitToApp className='text-4xl  ' />
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
                                            <p className='text-center font-medium'>Foto Background</p>
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
                                        <input required type="email" className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
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
                                            className={`w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent `}
                                            placeholder="Digite seu CEP"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-lg font-medium">Endereço</label>
                                        <textarea
                                            ref={textareaRefs.enderecoRef}
                                            className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                                            placeholder="Insira seu Endereço"
                                            value={endereco}
                                            name="endereco"
                                            onChange={(e) => setEndereco(e.target.value)} 
                                        />
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

                                    <div className="flex flex-col w-80 relative ">
                                        <label className="text-lg font-medium">Ramo da Empresa</label>
                                        <input
                                            type="text"
                                            placeholder="Digite para filtrar a área"
                                            value={ramosearch}
                                            onChange={(e) => {
                                                setRamosearch(e.target.value);
                                                handleSelectArea(e.target.value)
                                                setIsDropdownVisible(e.target.value.length > 0 && filteredAreas.length > 0); // Mostra o dropdown apenas se houver texto e resultados
                                            }}
                                            onFocus={() => setIsDropdownVisible(ramosearch.length > 0 && filteredAreas.length > 0)} // Mostra o dropdown ao focar no input se houver resultados
                                            onBlur={handleBlur}
                                            className="w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                        />
                                        {isDropdownVisible && filteredAreas.length > 0 && (
                                            <ul className="border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto bg-white absolute top-20  w-full"
                                                ref={dropdownRef}
                                            >
                                                {filteredAreas.map((filteredArea) => (
                                                    <li
                                                        key={filteredArea}
                                                        onMouseDown={() => handleSelectArea(filteredArea)}
                                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {filteredArea}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </>
                            )}



                        </div>
                        <div className='w-full h-fit flex items-center justify-center gap-2 my-2'>
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
                            <button onClick={handleClear} className="w-32 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full transition-all">Limpar</button>
                        </div>

                    </div>

                </>
            )}
        </>
    );
};

export default EmpresaFormRegister;
