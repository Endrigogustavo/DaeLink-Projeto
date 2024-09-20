import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const  CarouselSlider = () => {
    const carouselpages = [
        { image: "https://projy.s3.amazonaws.com/uploads/80133c3b17c74fe4a3959ba67d95b4dd.jpg" },
        { image: "https://cdnsjengenhariae.nuneshost.com/wp-content/uploads/2024/04/microsoft-.jpeg" },
        { image: "https://seele.com/fileadmin/user_upload/images/01_References/Apple-Retail-Store-Singapur/AppleKnightsbridge_c_BrianChongCheeKang__2_.jpg" },
        { image: "https://i0.wp.com/www.nationalreview.com/wp-content/uploads/2018/02/amazon-sphere-02.jpg?fit=1481%2C864&ssl=1" }
    ];

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            navigation={{
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper h-96 w-5/6 rounded-md swiper_container"
        >
            {carouselpages.map((data, index) => (
                <SwiperSlide key={index} className='h-full w-full'>
                    <img src={data.image} alt={`slide_${index}`} className='h-full w-full object-cover' />
                </SwiperSlide>
            ))}
            <div className="custom-prev"><FaArrowLeft size={24} /></div>
            <div className="custom-next"><FaArrowRight size={24} /></div>
        </Swiper>
    );
}

export default CarouselSlider;
