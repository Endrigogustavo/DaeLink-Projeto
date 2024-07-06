import './Home.css'
import './Card.css'

import Navbar from '../Navbar/Navbar'
import Card from './Card'
import Def from '../../../Img/HomeImg.png'


function Home() {

  return (
    <>

    <Navbar/>
    
      <main class="main">
        <section class="section banner banner-section">
          <div class="container banner-column">
            <img class="banner-image" src={Def} alt="banner" />
            <div class="banner-inner">
              <h1 class="heading-xl leading-snug font-serif">DaeLink a melhor plataforma de trabalho</h1>
              <p class="paragraph leading-snug font-serif">
                Uma plataforma de empregabilidade com foco em empresas contratarem pessoas portadoras de deficiencia
              </p>
            </div>
            <div class="banner-links">
              <a href="#" title=""><i class="bx bxl-facebook"></i></a>
              <a href="#" title=""><i class="bx bxl-instagram"></i></a>
              <a href="#" title=""><i class="bx bxl-twitter"></i></a>
              <a href="#" title=""><i class="bx bxl-youtube"></i></a>
            </div>
          </div>
        </section>

        <div className="card-home">
          <Card />
        </div>

      </main>

    </>
  )
}

export default Home