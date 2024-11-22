import React, { useState, useEffect } from "react";
import "../assets/css/manuais.css";
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

const ComponenteManual: React.FC = () => {
  const [manuais, setManuais] = useState<Link[]>([]);
  const [filtroDepartamento, setFiltroDepartamento] = useState<string>("");
  const [termoPesquisa, setTermoPesquisa] = useState<string>("");

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch("http://10.165.4.83:8000/api/manuais/");
        const data: Link[] = await response.json();
        setManuais(data);
      } catch (error) {
        console.error("Erro ao buscar manuais:", error);
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

  const manuaisFiltrados = manuais.filter(
    (manual) =>
      (!filtroDepartamento || manual.departamento === filtroDepartamento) &&
      (manual.nome.toLowerCase().includes(termoPesquisa) ||
        manual.descricao.toLowerCase().includes(termoPesquisa))
  );

  // Extrair departamentos únicos
  const departamentos = Array.from(
    new Set(manuais.map((manual) => manual.departamento))
  );

  return (
    <div className="main-manual-container">
      <a href="/" className="icon-back">
        ◀<p>Voltar</p>
      </a>
      <h2>Portal Manuais</h2>
      <div className="main-manual">
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

        <Link href="manuais/adicionar">
          <span>Adicionar</span>
        </Link>
      </div>

      <div className="table-container">
        <table className="table-manual">
          <thead>
            <tr>
              <th className="flex gap-2">Nome do Manual</th>
              <th>Download</th>
              <th>Setor específico?</th>
              <th>Descrição/Sobre</th>
            </tr>
          </thead>
          <tbody>
            {manuaisFiltrados.map((manual) => (
              <tr key={manual.id}>
                <td className="uppercase">{manual.nome}</td>
                <td>
                  <a
                    href={manual.arquivo || manual.link_download}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📤
                  </a>
                </td>
                <td>{manual.departamento}</td>
                <td>{manual.descricao}</td>
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

const AppManual = () => {
  return (
    <div className="home-container">
      <Link href="/">
        <img src="/src/assets/img/logobrancagsc.png" alt="Logo" width={150} />
      </Link>
      <main>
        <ComponenteManual />
      </main>
      <Footer />
    </div>
  );
};

export default AppManual;
