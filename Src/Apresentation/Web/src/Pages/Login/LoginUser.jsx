import React, { useState } from 'react';
import Form from './Form'

const Login = () => {

 

  return (

    <>
      <div className='flex w-full h-screen'>
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
          <Form/>
        </div>
        <div className='hidden lg:flex lg:w-1/2 bg-gray-300 items-center justify-center 0'>
          <img src="https://i.postimg.cc/Jzsv83S9/Sem-T-tulo-1.png" className="" alt=""/>
        </div>



      </div>
    </>

  );
};

export default Login;
