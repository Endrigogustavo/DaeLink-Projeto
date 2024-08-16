import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CandidatosTable from './CandidatosTable';

import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";

const CandidatosPage = () => {
    return (
        <>

            <CandidatosTable />

            <div className='w-full h-80 flex ' >
                <div className='w-1/2 h-full flex justify-center align-center '>
                    <img src="https://i.postimg.cc/bYMRV8d8/Andrew.png" className="h-full" alt="" />

                </div>

                <div className='w-1/2 h-full flex justify-center align-center  bg-gray-900 '>
                    <div className='w-full h-full flex justify-center items-center'>
                            <h1 className='text-white'>Não encontrou o que procurava?</h1>
                    </div>
                </div>

            </div>

            <div className="w-full bg-gray-900 h-16 ">
                <div className="flex w-full h-full items-center justify-center gap-4">
                    <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  mediahover" /></Link>
                    <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
                    <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
                </div>
            </div>
        </>
    )

}

export default CandidatosPage;