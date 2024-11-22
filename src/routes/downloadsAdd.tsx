import React, { useState } from "react";
import { Link } from "wouter";
import "../assets/css/addDownloads.css";

interface LinkFormData {
  nome: string;
  link_download: string;
  arquivo: File | null;
  descricao: string;
  departamento: string;
}

const ComponentAddDownload: React.FC = () => {
  const [formData, setFormData] = useState<LinkFormData>({
    nome: "",
    link_download: "",
    arquivo: null,
    departamento: "",
    descricao: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;


    if (type === "file" && files) {
      setFormData({
        ...formData,
        arquivo: files[0],
        link_download: "", 
      });
    } else if (name === "link_download") {
      setFormData({
        ...formData,
        [name]: value,
        arquivo: null, 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nome", formData.nome);
    data.append("descricao", formData.descricao);
    data.append("departamento", formData.departamento);
    if (formData.link_download) {
      data.append("link_download", formData.link_download);
    }
    if (formData.arquivo) {
      data.append("arquivo", formData.arquivo);
    }

    try {
      const response = await fetch(
        "http://10.165.4.83:8000/api/create_programa/",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        setMessage("Programa adicionado com sucesso!");
        setFormData({
          nome: "",
          link_download: "",
          arquivo: null,
          descricao: "",
          departamento: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Erro ao adicionar o programa:", errorData);
        setMessage("Erro ao adicionar o programa");
      }
    } catch (error) {
      console.error("Erro ao adicionar o programa:", error);
      setMessage("Erro ao adicionar o programa");
    }
  };

  return (
    <div className="add-programa-container">
      <a href="/downloads" className="icon-back">
        ◀<p>Voltar</p>
      </a>
      <h2 className="add-programa-title">Adicionar Novo Programa</h2>
      {message && <p className="add-programa-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome do Programa"
          required
        />
        <br />
        <input
          type="file"
          id="arquivo"
          name="arquivo"
          onChange={handleChange}
          className="my-2"
        />
        <br />
        <hr />
        <label htmlFor="link_download">URL Download</label>
        <input
          type="url"
          id="link_download"
          name="link_download"
          value={formData.link_download}
          onChange={handleChange}
          placeholder="Insira uma URL ou selecione um arquivo ácima"
        />

        <label htmlFor="departamento">Departamento</label>
        <select
          name="departamento"
          id="departamento"
          value={formData.departamento} 
          onChange={handleChange}
        >
          <option value="">Selecione...</option>
          <option value="GERAL">GERAL</option>
          <option value="TI">TI</option>
          <option value="RH">RH</option>
          <option value="FISCAL">FISCAL</option>
          <option value="LOGÍSTICA">LOGÍSTICA</option>
          <option value="ADM">ADM</option>
          <option value="OUTROS">OUTROS</option>
        </select>

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Observações ou Comentário"
        />

        <button type="submit" className="add-programa-button">
          Adicionar Programa
        </button>
      </form>
    </div>
  );
};

// Footer

const Footer: React.FC = () => (
  <footer className="footer">
    <p>© 2024 Desenvolvido pelo Suporte TI - joao.saraujo</p>
  </footer>
);

const AddDownload = () => {
  return (
    <div className="home-container">
      <Link href="/">
        <img src="/src/assets/img/logobrancagsc.png" alt="Logo" width={150} />
      </Link>
      <main>
        <ComponentAddDownload />
      </main>
      <Footer />
    </div>
  );
};

export default AddDownload;
