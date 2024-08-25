import React from "react";
import './style.css'
import Img from './fundoImg.jpg'

//https://www.deviantart.com/wabisabiwonders/gallery

const Tela404 = () => {

    return (
        <>
            <div className="gradient text-white min-h-screen flex items-center">
                <div className="container mx-auto p-4 flex flex-wrap items-center">
                    <div className="w-full md:w-5/12 text-center p-4">
                        <img src={Img} alt="Not Found" />
                    </div>
                    <div className="w-full md:w-7/12 text-center md:text-left p-4">
                        <div className="text-6xl font-medium">404</div>
                        <div className="text-xl md:text-3xl font-medium mb-4">
                            Oops. This page has gone missing.
                        </div>
                        <div className="text-lg mb-8">
                            You may have mistyped the address or the page may have moved.
                        </div>
                        <a href="#" className="border border-white rounded p-4">Go Home</a>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Tela404;

