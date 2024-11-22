import React, { useState, useEffect } from "react";
import "../assets/css/downloads.css";
import { Link } from "wouter";

interface Link {
  id: number;
  nome: string;
  link_download: string;
  arquivo: string;
  descricao: string;
  departamento: string;
}

// Componente inicial

const ComponentDownload: React.FC = () => {
  const [programas, setProgramas] = useState<Link[]>([]);
  const [filtroDepartamento, setFiltroDepartamento] = useState<string>("");
  const [termoPesquisa, setTermoPesquisa] = useState<string>("");

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch("http://10.165.4.83:8000/api/programas/");
        const data: Link[] = await response.json();
        setProgramas(data);
      } catch (error) {
        console.error("Erro ao buscar programas:", error);
      }
    };

    fetchProgramas();
  }, []);

  const handleFiltroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroDepartamento(event.target.value);
  };

  const handlePesquisaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermoPesquisa(event.target.value.toLowerCase());
  };

  const programasFiltrados = programas.filter(
    (programa) =>
      (!filtroDepartamento || programa.departamento === filtroDepartamento) &&
      (programa.nome.toLowerCase().includes(termoPesquisa) ||
        programa.descricao.toLowerCase().includes(termoPesquisa))
  );

  // Extrair departamentos únicos
  const departamentos = Array.from(
    new Set(programas.map((programa) => programa.departamento))
  );

  return (
    <div className="main-programas-container">
      <a href="/" className="icon-back">
        ◀<p>Voltar</p>
      </a>
      <h2>Portal Downloads</h2>
      <div className="main-programas">
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

        <Link href="downloads/adicionar">
          <span>Adicionar</span>
        </Link>
      </div>

      <div className="table-container">
        <table className="table-programas">
          <thead>
            <tr>
              <th className="flex gap-2">Nome do Programa</th>
              <th>Download</th>
              <th>Setor específico?</th>
              <th>Descrição/Sobre</th>
            </tr>
          </thead>
          <tbody>
            {programasFiltrados.map((programa) => (
              <tr key={programa.id}>
                <td className="uppercase">{programa.nome}</td>
                <td>
                  <a
                    href={programa.arquivo || programa.link_download}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📤
                  </a>
                </td>
                <td>{programa.departamento}</td>
                <td>{programa.descricao}</td>
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

const AppDownload = () => {
  return (
    <div className="home-container">
      <Link href="/">
        <img src="/src/assets/img/logobrancagsc.png" alt="Logo" width={150} />
      </Link>
      <main>
        <ComponentDownload />
      </main>
      <Footer />
    </div>
  );
};

export default AppDownload;
