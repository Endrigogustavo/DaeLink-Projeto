import React from 'react';
import Form from './Form';
import LoginU from '../../Img/LoginU.png'

const Login = () => {

  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
          <Form />
        </div>
        <div className='hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden h-full bg-gray-200'>
          {/*<img src="https://i.postimg.cc/Jzsv83S9/Sem-T-tulo-1.png" className="object-cover" alt="Side Image" />*/}
          <img src={LoginU} className="object-cover h-5/6" alt="Side Image" />
        </div>
      </div>
    </>
  );
};

export default Login;
