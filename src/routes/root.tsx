import React from "react";
import { Link } from "wouter";
import '../assets/css/root.css'

// Criação de interfaces de rotas para Home...
interface AppPagesProps {
  title: string;
  icon: string;
  href?: string;
}
const AppComponentPages: React.FC = () => {
  const appPages: AppPagesProps[] = [
    { title: "Portal Links", icon: "🌐", href: "/links" },
    { title: "Portal Downloads", icon: "📂", href: "/downloads" },
    { title: "Manuais e Recursos", icon: "📚", href: "/manuais" },
    { title: "...", icon: "🔒" },
    { title: "...", icon: "🔒" },
    { title: "...", icon: "🔒" },
  ];

  return (
    <div className="portal-container">
      {appPages.map((appPage) => (
        <a key={appPage.title} href={appPage.href || "#"}>
          <span className="portal-icon">{appPage.icon}</span>
          <span>{appPage.title}</span>
        </a>
      ))}
    </div>
  );
};

// Componente Inicial
const AppComponentMain: React.FC = () => (
  <div className="main-container">
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

// Footer

const Footer: React.FC = () => (
  <footer className="footer">
    <p>© 2024 Desenvolvido pelo Suporte TI - joao.saraujo</p>
  </footer>
);

const AppHome = () => {
  return (
    <div className="home-container">
      <Link href="/">
        <img src="/src/assets/img/logobrancagsc.png" alt="Logo" width={150} />
      </Link>
      <main>
        <AppComponentMain />
      </main>
      <Footer />
    </div>
  );
};

export default AppHome;
