
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4">Política de Privacidade</h1>
      </header>
      <div className="prose prose-lg max-w-none text-brand-text-secondary leading-relaxed">
        <p><strong>Última atualização:</strong> [Data da Última Atualização]</p>

        <h2 className="text-brand-primary">1. Introdução</h2>
        <p>Bem-vindo à Delagil. Nós valorizamos sua privacidade e estamos comprometidos em proteger suas informações pessoais. Esta Política de Privacidade descreve como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site [URL do seu site] (o "Site").</p>

        <h2 className="text-brand-primary">2. Informações que Coletamos</h2>
        <p>Podemos coletar informações sobre você de várias maneiras. As informações que podemos coletar no Site incluem:</p>
        <ul>
          <li><strong>Dados Pessoais:</strong> Informações de identificação pessoal, como seu nome, endereço de e-mail, número de telefone e empresa, que você nos fornece voluntariamente ao preencher formulários de contato ou se inscrever em nossa newsletter.</li>
          <li><strong>Dados de Uso:</strong> Informações que seu navegador envia automaticamente sempre que você visita nosso Site, como seu endereço IP, tipo de navegador, sistema operacional, horários de acesso e as páginas que você visualizou.</li>
          <li><strong>Cookies e Tecnologias de Rastreamento:</strong> Usamos cookies e tecnologias de rastreamento semelhantes para rastrear a atividade em nosso Site e armazenar certas informações. Você pode instruir seu navegador a recusar todos os cookies ou a indicar quando um cookie está sendo enviado.</li>
        </ul>

        <h2 className="text-brand-primary">3. Uso de Suas Informações</h2>
        <p>Usamos as informações coletadas para:</p>
        <ul>
          <li>Fornecer, operar e manter nosso Site;</li>
          <li>Melhorar, personalizar e expandir nosso Site;</li>
          <li>Entender e analisar como você usa nosso Site;</li>
          <li>Desenvolver novos produtos, serviços, recursos e funcionalidades;</li>
          <li>Comunicar com você, diretamente ou através de um de nossos parceiros, inclusive para atendimento ao cliente, para fornecer atualizações e outras informações relacionadas ao Site, e para fins de marketing e promocionais;</li>
          <li>Enviar e-mails;</li>
          <li>Encontrar e prevenir fraudes.</li>
        </ul>

        <h2 className="text-brand-primary">4. Compartilhamento de Suas Informações</h2>
        <p>Não vendemos, trocamos ou alugamos suas informações de identificação pessoal para terceiros. Podemos compartilhar informações genéricas agregadas não vinculadas a nenhuma informação de identificação pessoal sobre visitantes e usuários com nossos parceiros de negócios, afiliados confiáveis e anunciantes para os fins descritos acima.</p>
        
        <h2 className="text-brand-primary">5. Segurança de Suas Informações</h2>
        <p>Implementamos medidas de segurança para proteger suas informações pessoais. No entanto, lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.</p>

        <h2 className="text-brand-primary">6. Seus Direitos de Proteção de Dados</h2>
        <p>Dependendo da sua localização, você pode ter certos direitos em relação às suas informações pessoais, como o direito de acessar, corrigir, atualizar ou solicitar a exclusão de suas informações pessoais.</p>

        <h2 className="text-brand-primary">7. Alterações a Esta Política de Privacidade</h2>
        <p>Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Aconselhamos você a revisar esta Política de Privacidade periodicamente para quaisquer alterações.</p>

        <h2 className="text-brand-primary">8. Contate-Nos</h2>
        <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:</p>
        <p>Email: [Seu Endereço de Email de Contato]</p>
        <p>Telefone: [Seu Número de Telefone de Contato]</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
