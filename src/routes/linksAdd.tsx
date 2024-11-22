import React, { useState } from "react";
import "../assets/css/addlinks.css";
import { Link } from "wouter";

interface LinkFormData {
  nome: string;
  url: string;
  departamento: string;
  descricao: string;
}

const ComponenteAddLink: React.FC = () => {
  const [formData, setFormData] = useState<LinkFormData>({
    nome: "",
    url: "",
    departamento: "",
    descricao: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      nome: formData.nome,
      url: formData.url,
      departamento: formData.departamento,
      descricao: formData.descricao,
    };

    try {
      const response = await fetch("http://10.165.4.83:8000/api/create_link/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Link adicionado com sucesso!");
      } else {
        const errorData = await response.json();
        console.error("Erro ao adicionar o link:", errorData);
      }
    } catch (error) {
      console.error("Erro ao adicionar o link:", error);
    }
  };

  return (
    <div className="main-link-container">
      <a href="/links" className="icon-back">
        ◀<p>Voltar</p>
      </a>
      <h2 className="add-link-title">Adicionar Novo Link</h2>
      {message && <p className="add-link-message">{message}</p>}

      <form className="add-link-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome do Sistema"
          required
        />

        <label htmlFor="url">URL:</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Insira a URL/Link"
          required
        />

        <label htmlFor="departamento">Departamento:</label>
        <select
          id="departamento"
          name="departamento"
          value={formData.departamento}
          onChange={handleChange}
          required
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

        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />

        <button type="submit" className="add-link-button">
          Adicionar Link
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

const AddLink = () => {
  return (
    <div className="home-container">
      <Link href="/">
        <img src="/src/assets/img/logobrancagsc.png" alt="Logo" width={150} />
      </Link>
      <main>
        <ComponenteAddLink />
      </main>
      <Footer />
    </div>
  );
};

export default AddLink;

