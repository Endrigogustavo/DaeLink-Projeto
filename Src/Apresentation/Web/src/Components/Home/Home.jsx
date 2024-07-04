import './Home.css'
import Def from './Img/HomeImg.png'


function Home() {

    return (
        <>
<main class="main">
   <section class="section banner banner-section">
      <div class="container banner-column">
         <img class="banner-image" src={Def} alt="banner"/>
         <div class="banner-inner">
            <h1 class="heading-xl">DaeLink a melhor plataforma de trabalho</h1>
            <p class="paragraph">
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
</main>


  <div class="row1-container">
    <div class="box box-down cyan">
      <h2>Supervisor</h2>
      <p>Monitors activity to identify project roadblocks</p>
      <img src="https://assets.codepen.io/2301174/icon-supervisor.svg" alt=""/>
    </div>

    <div class="box red">
      <h2>Team Builder</h2>
      <p>Scans our talent network to create the optimal team for your project</p>
      <img src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt=""/>
    </div>

    <div class="box box-down blue">
      <h2>Calculator</h2>
      <p>Uses data from past projects to provide better delivery estimates</p>
      <img src="https://assets.codepen.io/2301174/icon-calculator.svg" alt=""/>
    </div>
  </div>
  <div class="row2-container">
    <div class="box orange">
      <h2>Karma</h2>
      <p>Regularly evaluates our talent to ensure quality</p>
      <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt=""/>
    </div>
  </div>
        </>
    )
}

export default Home