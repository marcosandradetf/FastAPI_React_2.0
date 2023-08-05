import React from "react";



const Home = () => {
 
  return (
    <div className="d-flex justify-content-center align-items-center HomeAltura">

      <div className="border rounded p-5">
        
        <h2>Menu de Opções</h2>
        <div className="border-top mt-3"></div>
        <a className="dropdown-item border rounded p-1 my-3 text-center" href="/cadastro">Iniciar Cadastro</a>
        <a className="dropdown-item border rounded p-1 my-3 text-center" href="/consulta">Consultar Cadastro</a>
        <a className="dropdown-item border rounded p-1 my-3 text-center" href="/delete">Excluir Cadastro</a>
        <a className="dropdown-item border rounded p-1 my-3 text-center" href="/alterar">Alterar Cadastro</a>
      </div>

    </div>
  );
};

export default Home;
