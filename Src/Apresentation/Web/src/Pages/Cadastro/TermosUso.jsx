import React from "react";
import { useNavigate } from "react-router-dom";

const TermsOfUse = () => {
    const navigate = useNavigate()
    const Nav = () => {
        navigate(-1)
    }
  return (
    <div className="terms-container p-6">
      <h1 className="text-3xl font-bold mb-4">Termos de Uso do Daelink</h1>
      <p className="text-gray-600 mb-2">Última atualização: [Inserir data]</p>

      <p className="mb-4">
        Bem-vindo ao Daelink, uma plataforma que conecta pessoas com deficiência
        a oportunidades de emprego em empresas. Ao acessar ou utilizar a
        plataforma, você concorda com os seguintes Termos de Uso. Se você não
        concordar com estes termos, por favor, não utilize o Daelink.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Aceitação dos Termos</h2>
      <p className="mb-4">
        Ao acessar ou usar o Daelink, você concorda em estar legalmente
        vinculado a estes Termos de Uso, que podem ser modificados a qualquer
        momento. Recomendamos revisar regularmente esta página para estar
        ciente de quaisquer mudanças.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Elegibilidade</h2>
      <p className="mb-4">
        Para usar o Daelink, você deve ser maior de idade (18 anos ou mais) ou
        ter permissão legal para trabalhar. Empresas devem estar devidamente
        registradas e autorizadas a recrutar profissionais. Pessoas com
        deficiência (PCD) interessadas em se candidatar devem fornecer
        informações verdadeiras e precisas sobre suas qualificações e
        necessidades.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Cadastro e Conta</h2>
      <p className="mb-4">
        Para usar o Daelink, você precisa criar uma conta, fornecendo
        informações corretas e atualizadas. Você é responsável por manter a
        confidencialidade dos seus dados de login e por todas as atividades que
        ocorram em sua conta.
      </p>
      <ul className="list-disc pl-8 mb-4">
        <li>
          <strong>PCDs:</strong> Informações como habilidades, qualificações e
          tipos de deficiência devem ser inseridas de forma clara.
        </li>
        <li>
          <strong>Empresas:</strong> Detalhes da vaga, como requisitos, ambiente
          de trabalho e acessibilidade, devem ser especificados.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Uso Permitido</h2>
      <p className="mb-4">
        Você concorda em usar o Daelink apenas para os propósitos a que ele se
        destina, ou seja, conectar pessoas com deficiência com oportunidades de
        emprego. É estritamente proibido:
      </p>
      <ul className="list-disc pl-8 mb-4">
        <li>Fornecer informações falsas ou enganosas.</li>
        <li>
          Usar a plataforma para qualquer outro fim além do recrutamento e da
          busca por emprego.
        </li>
        <li>
          Fazer discriminação de qualquer natureza nas descrições de vagas ou
          nos processos seletivos.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Privacidade</h2>
      <p className="mb-4">
        A coleta e uso das informações pessoais dos usuários seguem as
        diretrizes da nossa <a href="/privacy" className="text-blue-600 underline">Política de Privacidade</a>. Suas informações serão utilizadas
        exclusivamente para conectar candidatos a oportunidades de trabalho e
        para melhorar os serviços da plataforma.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Responsabilidades</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>
          <strong>Para Empresas:</strong> A empresa é responsável por assegurar
          que todas as vagas publicadas no Daelink estejam em conformidade com a
          legislação trabalhista, especialmente no que diz respeito às cotas
          para pessoas com deficiência e à acessibilidade no ambiente de
          trabalho.
        </li>
        <li>
          <strong>Para Candidatos (PCDs):</strong> O candidato é responsável por
          garantir a veracidade das informações fornecidas, incluindo
          habilidades, experiências e dados de contato.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Propriedade Intelectual</h2>
      <p className="mb-4">
        Todo o conteúdo da plataforma, incluindo marca, logo, layout, design,
        textos, imagens e software, é de propriedade exclusiva do Daelink ou de
        seus licenciadores. O uso não autorizado desse conteúdo é estritamente
        proibido.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Limitação de Responsabilidade</h2>
      <p className="mb-4">
        O Daelink não se responsabiliza por qualquer dano ou perda resultante do
        uso ou da impossibilidade de uso da plataforma. A plataforma é
        fornecida "como está" e sem garantias expressas ou implícitas de
        qualquer tipo.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Encerramento da Conta</h2>
      <p className="mb-4">
        O Daelink reserva-se o direito de suspender ou encerrar contas que
        violem estes Termos de Uso ou que estejam envolvidas em atividades
        fraudulentas ou inadequadas.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">10. Alterações nos Termos</h2>
      <p className="mb-4">
        O Daelink pode, a seu critério, alterar estes Termos de Uso a qualquer
        momento. O uso contínuo da plataforma após as alterações implica a
        aceitação dos novos termos.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">11. Contato</h2>
      <p className="mb-4">
        Se você tiver dúvidas sobre estes Termos de Uso ou sobre o funcionamento
        da plataforma, entre em contato conosco através do e-mail: [email de
        contato].
      </p>

      <footer className="mt-8">
        <p className="text-gray-600">
          [DaeLink] <br />
          [Daelink@gmail.com] <br />
          [11 9292-9292] <br />
        </p>
      </footer>

      <br />
      <button onClick={Nav} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-colors">Confirmar</button>
                    
    </div>
  );
};

export default TermsOfUse;
