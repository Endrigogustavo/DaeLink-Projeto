import React from "react";

function Sliders() {
  const InfiniteLogos = [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Android_logo_2019_%28stacked%29.svg/1173px-Android_logo_2019_%28stacked%29.svg.png",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/625px-Apple_logo_black.svg.png",
    },
    {
      url: "https://cdn.prod.website-files.com/5ee732bebd9839b494ff27cd/5eef3a3260847d0d2783a76d_Microsoft-Logo-PNG-Transparent-Image.png",
    },
    {
      url: "https://seeklogo.com/images/L/linux-logo-704D6BB91C-seeklogo.com.png",
    },
    {
      url: "https://cdn.icon-icons.com/icons2/2699/PNG/512/amazon_logo_icon_169612.png",
    },
    {
      url: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png"
    }


  ];

  return (
    <div className="w-full h-44 flex flex-col max-sm-h-size items-center overflow-hidden my-8">
      <h1 className="text-1xl font-bold text-center pb-8 uppercase">Disponível em todas as plataformas</h1>
      <div className="scroller max-w-full flex justify-center" data-animated="true">
        <div className="scroller__inner flex h-full items-center gap-8 justify-center">
          {InfiniteLogos.map((data, index) => (
            <img key={index} src={data.url} alt={`Logo ${index}`} className="h-14" />
          ))}
          {/* Duplicate the logos to ensure continuous scrolling */}
          {InfiniteLogos.map((data, index) => (
            <img key={index + InfiniteLogos.length} src={data.url} alt={`Logo ${index}`} className="h-14" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sliders;
