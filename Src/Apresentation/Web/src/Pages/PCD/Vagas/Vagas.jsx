
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from '../../../Database/Firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { decrypt, encrypt } from '../../../Security/Cryptography_Rotes';



function Vagas() {
	//Vagas onde ficara as informações dos usuarios e das vagas
	const [userId, setUserId] = useState("");
	const [vagas, setVagas] = useState([]);
	const [userProfile, setUserProfile] = useState(null);
	//Pegando o ID do urusario com base na URL
	const { id } = useParams();
	const decryptedId = decrypt(decodeURIComponent(id))

	//useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
	useEffect(() => {
		const getUserProfile = async () => {
			//Caminho das informações espeficias de um documento com base no ID
			const ProfileUser = doc(db, "PCD", decryptedId);
			//Pega os resultados utilizando getDoc
			const GetProfileUser = await getDoc(ProfileUser);
			//Tratamento caso não exista registros
			if (GetProfileUser.exists()) {
				//Setando as informações
				setUserProfile(GetProfileUser.data());
				setUserId(GetProfileUser.decryptedId);
			} else {
				setUserProfile(null);
				alert("Nenhuma vaga encontrada!");
			}
		};

		getUserProfile();
	}, [decryptedId]);


	//Função de navegação do site
	const navigate = useNavigate()


	//useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
	useEffect(() => {
		//Vai pegar todas a vagas da coleção
		const VagasCollection = collection(db, "Vagas");

		//Pega as informações e permite listalas de forma visual
		const getUsers = async () => {
			const data = await getDocs(VagasCollection);
			setVagas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		};

		getUsers();

	}, []);

	//Botão para is para a tela de enviar entrar na vaga, enviando o ID do usuario e o da vaga
	const handleButtonClick = (vagaId) => {
		const encryptedId = encrypt(encodeURIComponent(decryptedId))
		const encryptedVaga = encrypt(encodeURIComponent(vagaId))
 
		navigate(`/entrarvaga/${encryptedId}/${encryptedVaga}`);
	};

	return (
		<>
			<div class="bg-white p-8 rounded-md w-full">
				<div class=" flex items-center justify-between pb-6">
					<div class="flex items-center justify-between">
						<div class="flex bg-gray-50 items-center p-2 rounded-md">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clip-rule="evenodd" />
							</svg>
							<input class="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
						</div>
						<div class="lg:ml-40 ml-10 space-x-8">
							<button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</button>
							<button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
						</div>
					</div>
				</div>
				<div>
					<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
						<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
							<table class="min-w-full leading-normal">
								<thead>
									<tr>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Vaga
										</th>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Area
										</th>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Empresa
										</th>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Exigencias
										</th>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Salario
										</th>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Tipo
										</th>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Local
										</th>
									</tr>
								</thead>
								{Array.isArray(vagas) && vagas.length > 0 ? (
									vagas.map((vaga) => (
										<tbody>
											<tr>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<div class="flex items-center">
														<div class="ml-3">
															<p class="text-gray-900 whitespace-no-wrap">
																{vaga.id}
															</p>
														</div>
													</div>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<div class="flex items-center">
														<div class="ml-3">
															<p class="text-gray-900 whitespace-no-wrap">
																{vaga.vaga}
															</p>
														</div>
													</div>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{vaga.area}
													</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{vaga.empresa}
													</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{vaga.exigencias}
													</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{vaga.salario}
													</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{vaga.tipo}
													</p>
												</td>
												<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
													<p class="text-gray-900 whitespace-no-wrap">
														{vaga.local}
													</p>
												</td>

												<button onClick={() => handleButtonClick(vaga.id)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
													<svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Perfil
												</button>
											</tr>
										</tbody>
									))
								) : (
									<p>No vagas available</p>
								)}
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Vagas
