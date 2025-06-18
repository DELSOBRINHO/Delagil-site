
import React from 'react';
import { Users, Target, Eye, Gem, Award, Lightbulb } from 'lucide-react'; // Example icons

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4">Sobre a Delagil</h1>
        <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
          Conheça a nossa história, nossa paixão por inovação e o compromisso que temos com o sucesso dos nossos clientes.
        </p>
      </header>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://picsum.photos/seed/aboutus/600/400" 
              alt="Equipe Delagil em colaboração" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-brand-primary mb-6">Nossa História</h2>
            <p className="text-brand-text-secondary mb-4 leading-relaxed">
              A Delagil nasceu da união de especialistas apaixonados por tecnologia e resultados. Com anos de experiência no mercado, percebemos a necessidade de uma abordagem ágil e integrada para resolver os desafios de negócios modernos. Nosso foco é combinar expertise em marketing digital, consultoria estratégica e desenvolvimento de software para entregar soluções que verdadeiramente impulsionam o crescimento.
            </p>
            <p className="text-brand-text-secondary leading-relaxed">
              Desde a nossa fundação, temos orgulho de construir parcerias duradouras, baseadas na transparência, colaboração e na busca incessante por excelência. Cada projeto é uma oportunidade de inovar e superar expectativas.
            </p>
          </div>
        </div>
      </section>
      
      <section className="grid md:grid-cols-3 gap-8 mb-16 text-center">
        <div className="bg-brand-surface p-8 rounded-lg shadow-lg">
          <Target size={48} className="text-brand-accent mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-brand-primary mb-2">Missão</h3>
          <p className="text-brand-text-secondary">Capacitar negócios a prosperarem na era digital através de soluções inovadoras, estratégias inteligentes e tecnologia de ponta, entregando resultados mensuráveis e impacto positivo.</p>
        </div>
        <div className="bg-brand-surface p-8 rounded-lg shadow-lg">
          <Eye size={48} className="text-brand-accent mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-brand-primary mb-2">Visão</h3>
          <p className="text-brand-text-secondary">Ser reconhecida como a principal parceira estratégica para empresas que buscam liderança e crescimento sustentável, através da inovação contínua e da excelência em serviços.</p>
        </div>
        <div className="bg-brand-surface p-8 rounded-lg shadow-lg">
          <Gem size={48} className="text-brand-accent mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-brand-primary mb-2">Valores</h3>
          <ul className="text-brand-text-secondary list-none space-y-1">
            <li><strong className="text-brand-secondary">Inovação:</strong> Buscar constantemente novas ideias.</li>
            <li><strong className="text-brand-secondary">Cliente no Centro:</strong> Foco total nas necessidades do cliente.</li>
            <li><strong className="text-brand-secondary">Excelência:</strong> Compromisso com a alta qualidade.</li>
            <li><strong className="text-brand-secondary">Colaboração:</strong> Trabalhar juntos para alcançar mais.</li>
            <li><strong className="text-brand-secondary">Integridade:</strong> Agir com ética e transparência.</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-brand-primary mb-8 text-center">Nossos Diferenciais</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Lightbulb, title: "Abordagem Personalizada", description: "Entendemos que cada negócio é único. Criamos estratégias sob medida." },
            { icon: Award, title: "Foco em Resultados", description: "Nossas soluções são orientadas para gerar resultados tangíveis e mensuráveis." },
            { icon: Users, title: "Equipe Multidisciplinar", description: "Especialistas em diversas áreas trabalhando juntos para o seu sucesso." }
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 bg-brand-surface rounded-lg shadow">
              <item.icon size={36} className="text-brand-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-semibold text-brand-primary mb-1">{item.title}</h4>
                <p className="text-brand-text-secondary text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section (Optional) - Placeholder */}
      {/* 
      <section>
        <h2 className="text-3xl font-bold text-brand-primary mb-8 text-center">Conheça Nossa Equipe</h2>
        <p className="text-center text-brand-text-secondary mb-8">Nossos especialistas estão prontos para ajudar.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => (
            <Card key={i} className="text-center p-6">
              <img src={\`https://picsum.photos/seed/team\${i}/200/200\`} alt="Membro da equipe" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md" />
              <h4 className="text-lg font-semibold text-brand-primary">Nome do Membro {i}</h4>
              <p className="text-sm text-brand-accent">Cargo</p>
            </Card>
          ))}
        </div>
      </section>
      */}
    </div>
  );
};

export default AboutPage;
