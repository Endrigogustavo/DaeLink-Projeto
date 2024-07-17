import React from "react";
import CarouselSlider from "./CarouselSlider";

const Carousel = () => {
   

    return (
        <div className="flex flex-col w-100 h-75vh bg-gray-900 py-8 max-md-content">
            <div className="w-full  flex justify-center pb-8 ">
                <h1 className="text-3xl uppercase font-semibold text-white text-center">Descubra hoje sua empresa ideal</h1>

            </div>
            <div className="flex w-full h-full max-md-flex-col justify-center items-center">
                <div className="w-1/2 flex items-center ">
                    <CarouselSlider/>

                </div>
                <div className="w-1/2">
                    <div className="flex w-full h-full items-center justify-center">
                        <p className="text-white text-justify px-8 carouseltextt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat reiciendis sit fugiat iste molestias rem vero, labore numquam, omnis esse temporibus tempora eveniet obcaecati fuga iusto nam atque explicabo culpa asperiores officia ad veniam?</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
