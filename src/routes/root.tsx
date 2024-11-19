import React from "react";

// Criação de interfaces de rotas para Home...
interface AppPagesProps {
  title: string;
  icon: string;
  href?: string;
}
const AppComponentPages: React.FC = () => {
  const appPages: AppPagesProps[] = [
    { title: "Portal Links", icon: "🌐", href: "/links" },
    { title: "Portal Downloads", icon: "📂", href: "/programas" },
    { title: "Manuais e Recursos", icon: "📚", href: "/manuals" },
    { title: "breve", icon: "🛠️" },
  ];

  return (
    <div>
      {appPages.map((appPage) => (
        <a key={appPage.title} href={appPage.href || "#"}>
          <span>{appPage.icon}</span>
          <span>{appPage.title}</span>
        </a>
      ))}
    </div>
  );
};

// Componente Inicial
const AppComponentMain: React.FC = () => (
  <div>
    <h2>Portal Colaborador TI</h2>
    <p>
      Bem-vindo ao portal de suporte! <br /> Este espaço é dedicado aos técnicos
      e colaboradores, oferecendo <br /> acesso rápido a links úteis, programas
      essenciais para o trabalho e recursos compartilhados <br /> por outros
      técnicos para facilitar o seu dia a dia.
    </p>
    <h3>Acesse os portais disponíveis</h3>
    <AppComponentPages />
  </div>
);

const AppHome = () => {
  return (
    <div>
      <p>Navigation</p>
      <main>
        <AppComponentMain />
      </main>
      <p>Footer</p>
    </div>
  );
};

export default AppHome;
