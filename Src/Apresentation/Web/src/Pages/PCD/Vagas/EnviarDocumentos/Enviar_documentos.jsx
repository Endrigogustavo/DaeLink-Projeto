import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../Navbar/Navbar";
import DocumentosForm from "./DocumentosForm";

import {
  FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";

const EnviarDocumentos = () => {

  return (
    <>
      <Navbar />
      <DocumentosForm />

      <div className="w-full bg-gray-900 h-16 ">
        <div className="flex w-full h-full items-center justify-center gap-4">
          <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  mediahover" /></Link>
          <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
          <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
        </div>
      </div>
    </>
  );
};

export default EnviarDocumentos;