import React from "react";
import "./CarregamentoStyle.css"


const CarregamentoTela = () => {

    return (
        <>
            <div className="tela">
                <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className='w-56' alt="Logo" />
                <p className="text-carregando">Carregando...</p>
            </div>

        </>
    )

}

export default CarregamentoTela;