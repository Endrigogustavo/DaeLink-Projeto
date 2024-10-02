import React from "react";
import { MdTravelExplore } from "react-icons/md";
import CarouselSlider from "./CarouselSlider";

const Carousel = () => {


    return (
        <div className="flex flex-col w-100  bg-gray-900 py-10 max-md-content ">
            <div className="w-full  flex justify-center pb-8 ">
                <h1 className="text-3xl uppercase font-semibold text-white text-center">Descubra hoje sua empresa ideal</h1>

            </div>
            <div className="flex w-full  h-full max-md-flex-col justify-center ">
                <div className="w-1/2 flex items-center flexfullcaroussel ">
                    <CarouselSlider />

                </div>
                <div className="w-1/2 flexfulltext sm:px-12">
                    <div className="flex w-full h-full flex-col items-center justify-center gap-4  sm-carouseltextcontainer  bg-gray-800  rounded-lg p-8">
                        <h1 className="text-white carousel-text text-2xl font-bold flex">Empresas ao redor do Mundo <MdTravelExplore /></h1>
                        <p className="text-white text-justify font-normal ">Devido ao nosso comprometimento e desempenho excepcionais em realizar nosso objetivo, conquistamos a confiança das principais empresas do mercado, como IBM, Apple, Microsoft, Google, Amazon, e muitas outras. Nosso sucesso é refletido não apenas na nossa capacidade de atender às necessidades dos nossos clientes, mas também na nossa dedicação contínua à inovação e à excelência. </p>
                        <p className="text-white text-justify font-normal ">Trazendo-se em evidência com nosso sucesso a necessidade da inclusão social pelo meio tecnológico, não nos limitamos apenas à área trabalhista, mas também nos dedicamos a outros meios sociais que são essenciais para a nossa convivência populacional. Acreditamos que a tecnologia deve ser uma força inclusiva, proporcionando oportunidades e melhorando a qualidade de vida de todas as pessoas, independentemente de suas circunstâncias.</p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
