
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Vagas() {
	const navigate = useNavigate();


	const [trabalho, setTrabalho] = useState('');
	const [recommendations, setRecommendations] = useState([]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/recommend', { trabalho: trabalho });
			setRecommendations(response.data);
		} catch (error) {
			console.error('Error fetching recommendations:', error);
		}
	};

	const handleButtonClick = (id) => {
		navigate(`/profile/${id}`);
	  };
	


	return (
		<>
			<br /><br /><br /><br />
			<div class="bg-white p-8 rounded-md w-full">
				<div class=" flex items-center justify-center pb-6">
					<div class="flex items-center justify-between">
						<div class="flex bg-gray-50 items-center p-2 rounded-md">


							<form onSubmit={handleSubmit} class="flex">
								<div class="relative w-full">
									<input value={trabalho} onChange={(e) => setTrabalho(e.target.value)} type="text" id="voice-search" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Procurar vagas" required="" />

								</div>
								<button type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									<svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
								</button>
							</form>

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
											Id
										</th>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Trabalho
										</th>
										<th
											class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Descrição
										</th>
									</tr>
								</thead>
								<tbody>
									{recommendations.map((rec) => (
										<tr>
											<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<div class="flex items-center">
													<div class="ml-3">
														<p class="text-gray-900 whitespace-no-wrap">
															{rec.id}
														</p>
													</div>
												</div>
											</td>
											<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p class="text-gray-900 whitespace-no-wrap">{rec.descrição}</p>
											</td>
											<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p class="text-gray-900 whitespace-no-wrap">
													{rec.trabalho}
												</p>
											</td>
											<td>
									           
												<button onClick={() => handleButtonClick(rec.id)} type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
													<svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Perfil
												</button>
											
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}

export default Vagas
