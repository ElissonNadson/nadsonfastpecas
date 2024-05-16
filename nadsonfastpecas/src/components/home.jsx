import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center body">
      <header className="text-center">
        <div className="container px-4 px-lg-5">
          <h1 className="mb-1">Bem-vindo ao NADSONFASTPEÇAS</h1>
          <h2 className="mb-3">Sua loja de venda de peças automotivas</h2>
          <p className="mb-5 descricao">
            A NADSONFASTPEÇAS é sua parceira confiável para encontrar peças de qualidade e 
            com preços acessíveis. Oferecemos uma ampla seleção de componentes para 
            diversos modelos de veículos, garantindo que você encontre exatamente o que 
            precisa para manter seu carro em perfeito estado.
          </p>
          <Link to="./loginAdm" className="btn btn-primary btn-iniciar">Iniciar</Link>
        </div>
      </header>
    </div>
  );
}

