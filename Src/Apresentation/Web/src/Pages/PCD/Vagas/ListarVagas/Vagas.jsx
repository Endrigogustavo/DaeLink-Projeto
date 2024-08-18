
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { db } from '../../../../Database/Firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import Navbar from '../../Navbar/Navbar';
import VagasPage from './VagasPage';

function Vagas() {

	return (
		<>
			<Navbar />
			<VagasPage />
		</>
	)
}

export default Vagas
