import React from "react";



const Home = () => {
 
  return (
    <div className="d-flex justify-content-center align-items-center HomeAltura">

      <div className="border rounded p-5">
        
        <h2>Menu de Opções</h2>
        <div className="border-top mt-3"></div>
        <a className="dropdown-item border rounded p-1 my-3 text-center" href="/reg">Iniciar Cadastro</a>
        <a className="dropdown-item border rounded p-1 my-3 text-center" href="/query">Consultar Cadastro</a>
        <a className="dropdown-item border rounded p-1 my-3 text-center" href="/delete">Excluir Cadastro</a>
        <a className="dropdown-item border rounded p-1 my-3 text-center" href="/change">Alterar Cadastro</a>
      </div>

    </div>
  );
};

export default Home;
