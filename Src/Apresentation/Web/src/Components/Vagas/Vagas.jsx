
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Vagas() {
	const [jobTitle, setJobTitle] = useState('');
	const [jobId, setJobID] = useState('');
	const [recommendations, setRecommendations] = useState([]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:5000/recommend', { job_title: jobTitle });
			//const response = await axios.post('http://localhost:5000/recommend', { job_id: parseInt(jobId) });
			setRecommendations(response.data);
		} catch (error) {
			console.error('Error fetching recommendations:', error);
		}
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
									<input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" id="voice-search" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Procurar vagas" required="" />

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
												<p class="text-gray-900 whitespace-no-wrap"></p>
											</td>
											<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p class="text-gray-900 whitespace-no-wrap">
													
												</p>
											</td>
											<td>
			
											</td>
										</tr>
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>


		{recommendations.map((rec) => (
		<div class="max-w-3xl w-full mx-auto z-10">
		<div class="flex flex-col w-full">
			<div class="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
				<div class="flex-none sm:flex">
					<div class=" relative h-32 w-32   sm:mb-0 mb-3">
						<img src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg" alt="aji" class=" w-32 h-32 object-cover rounded-2xl"/>
						<a href="#"
							class="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
								class="h-4 w-4">
								<path
									d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
								</path>
							</svg>
						</a>
					</div>
					<div class="flex-auto sm:ml-5 justify-evenly">
						<div class="flex items-center justify-between sm:mt-2">
							<div class="flex items-center">
								<div class="flex flex-col">
									<div class="w-full flex-none text-lg text-gray-800 font-bold leading-none">Aji</div>
									<div class="flex-auto text-gray-500 my-1">
										<span class="mr-3 ">{rec.title}</span><span class="mr-3 border-r border-gray-200  max-h-0">
										<br />
										</span><span>{rec.description}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="flex flex-row items-center">
						
							</div>
							<div class="flex pt-2  text-sm text-gray-500">
								<div class="flex-1 inline-flex items-center">
				
								</div>
								<Link  to="/">
												<button type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
													<svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Perfil
												</button>
												</Link></div>
						</div>
					</div>
				</div>
			</div>
		</div>
))}

		</>
	)
}

export default Vagas
