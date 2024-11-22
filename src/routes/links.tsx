import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import "../assets/css/links.css";

interface Link {
  id: number;
  nome: string;
  descricao: string;
  departamento: string;
  url: string;
}

// Componente Inicial
const ComponentLink: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [filtroDepartamento, setFiltroDepartamento] = useState<string>("");
  const [termoPesquisa, setTermoPesquisa] = useState<string>("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("http://10.165.4.83:8000/api/links/");
        const data: Link[] = await response.json();
        setLinks(data);
      } catch (error) {
        console.error("Erro ao buscar links:", error);
      }
    };

    fetchLinks();
  }, []);

  const handleFiltroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroDepartamento(event.target.value);
  };

  const handlePesquisaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermoPesquisa(event.target.value.toLowerCase());
  };

  const linksFiltrados = links.filter(
    (link) =>
      (!filtroDepartamento || link.departamento === filtroDepartamento) &&
      (link.nome.toLowerCase().includes(termoPesquisa) ||
        link.descricao.toLowerCase().includes(termoPesquisa))
  );

  // Extrair departamentos únicos
  const departamentos = Array.from(
    new Set(links.map((link) => link.departamento))
  );

  return (
    <div className="main-link-container">
      <a href="/" className="icon-back">
        ◀<p>Voltar</p>
      </a>
      <h2>Portal Links</h2>
      <div className="main-link">
        <label htmlFor="filtroDepartamento">Filtrar por departamento:</label>
        <select
          id="filtroDepartamento"
          value={filtroDepartamento}
          onChange={handleFiltroChange}
        >
          <option value="">Todos</option>
          {departamentos.map((departamento) => (
            <option key={departamento} value={departamento}>
              {departamento}
            </option>
          ))}
        </select>

        <label htmlFor="termoPesquisa">Pesquisar:</label>
        <input
          type="text"
          id="termoPesquisa"
          value={termoPesquisa}
          onChange={handlePesquisaChange}
          placeholder="Pesquisar"
        />

        <Link href="links/adicionar">
          <span>Adicionar</span>
        </Link>
      </div>

      <div className="table-container">
        <table className="table-link">
          <thead>
            <tr>
              <th className="flex gap-2">Acessar Link</th>
              <th>Setor específico?</th>
            </tr>
          </thead>
          <tbody>
            {linksFiltrados.map((link) => (
              <tr key={link.id}>
                <td>
                  <a href={link.url} target="_blank" rel="noreferrer">
                  {link.nome}
                  </a>
                </td>
                <td>{link.departamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Footer

const Footer: React.FC = () => (
  <footer className="footer">
    <p>© 2024 Desenvolvido pelo Suporte TI - joao.saraujo</p>
  </footer>
);

const AppLink = () => {
  return (
    <div className="home-container">
      <Link href="/">
        <img src="/src/assets/img/logobrancagsc.png" alt="Logo" width={150} />
      </Link>
      <main>
        <ComponentLink />
      </main>
      <Footer />
    </div>
  );
};

export default AppLink;
