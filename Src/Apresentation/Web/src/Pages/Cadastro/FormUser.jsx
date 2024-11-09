import './CadastroCss.css';
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Auth/Auth';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { MdExitToApp } from "react-icons/md";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";
import { IoDocumentAttachSharp } from "react-icons/io5";
import InputMask from 'react-input-mask';
import axios from 'axios'
import Modal from './Modal';
import { FaClipboardList, FaCloudUploadAlt, FaIdCard, FaUser } from 'react-icons/fa';


const UserFormRegister = () => {
    const [step, setStep] = useState(1);
    const [laudomedico, setLaudoMedico] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [profilebackgroundpreview, setProfileBackgroundpreview] = useState('https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [trabalho, setTrabalho] = useState("");
    const [descricao, setDescricao] = useState("");
    const [idade, setIdade] = useState("");
    const [sobre, setSobre] = useState("");
    const [CPF, setCPF] = useState("");
    const [cpfError, setCpfError] = useState('');
    const [experiencias, setExperiencia] = useState("");
    const [deficiencia, setDeficiencia] = useState("");
    const [tipo, setTipo] = useState("PCD");
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [LaudoName, setLaudoName] = useState('');

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('Processando...');
    const [isWorksModal, setWorksModal] = useState(false);

    const [trabalhosearch, setTrabalhosearch] = useState(""); // Estado para o valor digitado
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Controle de visibilidade do dropdown
    const dropdownRef = useRef(null);

    const trabalhos = [
        "Desenvolvedor de Sistemas",
        "Administrador",
        "Marketeiro",
        "Designer",
        "Engenheiro",
        "Recursos Humanos",
        "Vendedor",
        "Economista",
        "Médico",
        "Enfermeiro",
        "Advogado",
        "Professor",
        "Psicólogo",
        "Consultor Financeiro",
        "Arquiteto",
        "Farmacêutico",
        "Cientista de Dados",
        "Analista de Sistemas",
        "Gestor de Projetos",
        "Redator",
        "Publicitário",
        "Nutricionista",
        "Técnico em Informática",
        "Assistente Administrativo",
        "Analista de Marketing",
        "Operador de Máquinas",
        "Contador",
        "Químico",
        "Engenheiro Civil",
        "Engenheiro de Software",
        "Analista de Recursos Humanos",
        "Gerente de Produto",
        "Consultor de Vendas",
    ];
    

    // Filtra as áreas com base na busca
    const filteredAreas = trabalhos.filter((area) =>
        area.toLowerCase().includes(trabalhosearch.toLowerCase())
    );

    const handleBlur = (e) => {
        // Verifica se o foco foi perdido para um elemento fora do dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
            setIsDropdownVisible(false);
        }
    };

    const handleSelectArea = (selectedArea) => {
        setTrabalho(selectedArea); // Define a área selecionada
        setTrabalhosearch(selectedArea); // Atualiza o input com o valor selecionado
        setIsDropdownVisible(false); // Esconde o dropdown após a seleção
    };



    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const navigate = useNavigate();

    const textareaRefs = {
        sobre: useRef(null),
        experiencias: useRef(null),
        descricao: useRef(null),
    };

    const adjustTextareaHeight = (ref) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };


    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        const filesize = e.target.files[0].size / 1024 / 1024
        setProfileImage(file);

        if (file) {
            if (filesize > 5) {
                setWorksModal(false)
                setModalMessage("Arquivo maior de 5MB")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
                setProfileImage("")
                setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfileImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            }

        } else {
            setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
        }
    };

    const handleProfileBackgroundChange = (e) => {
        const file = e.target.files[0]
        const filesize = e.target.files[0].size / 1024 / 1024

        setBackgroundImage(file)
        if (file) {
            if (filesize > 5) {
                setWorksModal(false)
                setModalMessage("Arquivo maior de 5MB")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
                setProfileBackgroundpreview('https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png');
                setBackgroundImage("")
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfileBackgroundpreview(reader.result);
                };
                reader.readAsDataURL(file);
            }

        } else {
            setProfileBackgroundpreview('https://themeskills.com/wp-content/uploads/2017/08/add-background-image-wordpress-website.png');
        }

    }

    const handleLaudoMedicoChange = (e) => {
        const file = e.target.files[0]
        const filesize = e.target.files[0].size / 1024 / 1024

        setLaudoMedico(file)
        if (file) {
            if (filesize > 1) {
                setWorksModal(false)
                setModalMessage("Arquivo maior de 50MB")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
                setLaudoMedico("")
            } else {
                setLaudoName(file.name); // Atualiza o estado com o nome do arquivo
            }
        }
    }

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleClear = () => {
        setProfileImage(null);
        setProfileImagePreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
        setBackgroundImage(null);
        setEmail("");
        setPassword("");
        setName("");
        setTrabalho("");
        setDescricao("");
        setIdade("");
        setSobre("");
        setExperiencia("");
        setDeficiencia("");
        setTipo("PCD");
        setStep(1); // Reiniciar para o primeiro passo
    };

    const handleRegister = async () => {
        // Validações

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setWorksModal(false);
            setModalMessage("Email Inválido");
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
                return;
            }, 2200);
        }


        if (password !== confirmPassword) {
            setWorksModal(false)
            setModalMessage("As senhas não coincidem.")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false);
            }, 2200);
        }


        if (!isChecked) {
            setWorksModal(false)
            setModalMessage("Você deve aceitar os termos de uso.")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false);
            }, 2200);
            return;
        }


        if (!trabalhos.includes(trabalho)) {
            setWorksModal(false)
            setModalMessage("Área inválida")
            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false);
                return;
            }, 2200);
        } else {


            setLoading(true);
            const response = await registerUser(name, email, password, idade, deficiencia, descricao, trabalho, profileImage, backgroundImage, sobre, experiencias, tipo, laudomedico, CPF, {});

            try {
                if (response.success) {
                    const auth = getAuth();
                    const user = auth.currentUser; // Certifique-se de obter o 'user' da autenticação
                    const id = user.uid; // Pegue o UID do usuário autenticado
                    localStorage.setItem('userId', id);

                    setWorksModal(true)
                    setModalMessage("Cadastro Realizado com Sucesso");
                    setModalOpen(true);
                    await sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setModalOpen(true);
                        });

                    setTimeout(() => {
                        navigate('/homeuser');
                    }, 3000);
                }
            } catch (error) {
                setWorksModal(false)
                setModalMessage(error.message)
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
            } finally {
                setLoading(false); // Desativar o loading
            }
        }

    }

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
        }

        const validateDate = (dateString) => {
            const today = new Date();
            const selectedDate = new Date(dateString);

            // Verifica se a data é válida
            if (isNaN(selectedDate)) {
                return false;
            }

            // Verifica se a data não está no futuro
            if (selectedDate > today) {
                return false;
            }

            // Calcula a idade
            const age = today.getFullYear() - selectedDate.getFullYear();
            const monthDifference = today.getMonth() - selectedDate.getMonth();

            // Verifica se a idade é maior ou igual a 18 anos
            if (age > 18 || (age === 18 && monthDifference > 0) || (age === 18 && monthDifference === 0 && today.getDate() >= selectedDate.getDate())) {
                return true;
            }

            return false;
        };

        // Validação para a etapa 2
        if (step === 2) {
            if (!idade || !trabalho || !descricao || !CPF) {
                setWorksModal(false)
                setModalMessage("Por favor, preencha todos os campos da Etapa 2.")
                setModalOpen(true)
                setTimeout(() => {
                    setModalOpen(false);
                }, 2200);
                isValid = false;
            } else if (!validateDate(idade)) {
                setWorksModal(false)
                setModalMessage("Data de Nascimento Inválida")
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

    const validateCPF = (value) => {
        const cleanCPF = value.replace(/\D/g, '');
        if (cleanCPF.length !== 11) {
            return false;
        }

        let sum = 0;
        let remainder;

        if (cleanCPF === "00000000000") return false;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }

        if (remainder !== parseInt(cleanCPF.charAt(9))) {
            return false;
        }

        sum = 0;

        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }

        if (remainder !== parseInt(cleanCPF.charAt(10))) {
            return false;
        }

        return true;
    };

    function voltarincon(e) {
        e.preventDefault();
        navigate(-1);
    }

    const handleCpfChange = (e) => {
        const value = e.target.value;
        setCPF(value);
        if (validateCPF(value)) {
            setCpfError('');
        } else {
            setCpfError('CPF inválido');
        }
    };


    const progressPercentage = (step / 3) * 100; // Calcular a porcentagem de progresso

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
                    </div>

                    <div className='h-full w-full flex flex-col items-center justify-center gap-4'>

                        <div className='w-full h-fit flex flex-col items-center justify-center'>
                            <div className='w-full justify-end flex items-center px-14'>
                                <button onClick={(e) => voltarincon(e)} className='flex h-fit items-center gap-1 '>
                                    <p className='font-medium'>Voltar</p>
                                    <MdExitToApp className='text-4xl text-gray-800 iconhover ' />
                                </button>
                            </div>
                            <h1 className="font-extrabold text-3xl my-4">Cadastro PCD</h1>
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
                                            placeholder="Insira seu Nome Completo" value={name}
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
                                        <label className="text-lg font-medium">Data de Nascimento</label>
                                        <input required type="date" className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                            placeholder="Insira sua Idade"
                                            value={idade}
                                            onChange={(e) => setIdade(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">CPF</label>
                                        <InputMask
                                            required
                                            mask="999.999.999-99"
                                            value={CPF}
                                            onChange={handleCpfChange}
                                            className={`w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent ${cpfError ? 'border-red-500' : ''}`}
                                            placeholder="Digite seu CPF"
                                        />
                                        {cpfError && <span className="text-red-500 text-sm">{cpfError}</span>}
                                    </div>

                                    <div className="flex flex-col w-80 relative ">
                                        <label className="text-lg font-medium">Área</label>
                                        <input
                                            type="text"
                                            placeholder="Digite para filtrar a área"
                                            value={trabalho}
                                            onChange={(e) => {
                                                setTrabalhosearch(e.target.value);
                                                handleSelectArea(e.target.value)
                                                setIsDropdownVisible(e.target.value.length > 0 && filteredAreas.length > 0); // Mostra o dropdown apenas se houver texto e resultados
                                            }}
                                            onFocus={() => setIsDropdownVisible(trabalhosearch.length > 0 && filteredAreas.length > 0)} // Mostra o dropdown ao focar no input se houver resultados
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

                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Descrição</label>
                                        <textarea required
                                            ref={textareaRefs.descricao}
                                            className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                                            placeholder="Importante!!! você será recomendado atarvez dessa informação"
                                            value={descricao}
                                            onChange={(e) => {
                                                setDescricao(e.target.value);
                                                adjustTextareaHeight(textareaRefs.descricao);
                                            }}
                                        />
                                    </div>


                                </>
                            )}

                            {/* Etapa 3 */}
                            {step === 3 && (
                                <>
                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Sobre você</label>
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
                                        <label className="text-lg font-medium">Experiências</label>
                                        <textarea required
                                            ref={textareaRefs.experiencias}
                                            className="w-80 border-2 border-gray-300 rounded-3xl p-4 mt-1 bg-transparent overflow-y-hidden"
                                            placeholder="Descreva suas experiências anteriores"
                                            value={experiencias}
                                            onChange={(e) => {
                                                setExperiencia(e.target.value);
                                                adjustTextareaHeight(textareaRefs.experiencias);
                                            }} />
                                    </div>

                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Deficência</label>
                                        <select
                                            name="deficiencia"
                                            value={deficiencia} onChange={(e) => setDeficiencia(e.target.value)}
                                            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                                        >
                                            <option value="" disabled>Selecione sua Deficiência</option>
                                            <option value="Auditiva">Auditiva</option>
                                            <option value="Visual">Visual</option>
                                            <option value="Física">Física</option>
                                            <option value="Intelectual">Intelectual</option>
                                            <option value="Múltipla">Múltipla</option>
                                            <option value="Psíquica">Psíquica</option>
                                        </select>
                                    </div>


                                    <div className="flex flex-col ">
                                        <label className="text-lg font-medium">Laudo Médico</label>
                                        <label htmlFor="laudoinput" className='h-16 w-80 rounded-3xl flex 
                                        items-center justify-center gap-4 bg-transparent border-gray-400 border-2 cursor-pointer'>
                                            <IoDocumentAttachSharp className='text-3xl text-gray-900 text-center ' />
                                            <h1 className='font-medium text-lg truncate'>{LaudoName ? `${LaudoName}` : `Insira o Laudo Médico`}</h1>
                                        </label>
                                        <input hidden type="file" id='laudoinput' accept=".pdf,.doc,.docx" onChange={handleLaudoMedicoChange} required />
                                    </div>



                                </>
                            )}



                        </div>

                        <div className="flex flex-row w-full items-center justify-center space-x-2 col-span-2">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className="h-5 w-5"
                            />
                            <span className="text-gray-900">
                                Aceito os <Link to="/termos" className="text-blue-600">Termos</Link> de Uso
                            </span>
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
                            <button onClick={handleClear} className="w-32 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full transition-all">Limpar</button>
                        </div>

                    </div>
                </>
            )}
        </>
    );
};

export default UserFormRegister;
