import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import CandidatosPage from './CandidatosPage';


function Candidatos() {
	return (
		<>
			<Navbar />
			<CandidatosPage />
		</>

	)

}

export default Candidatos
