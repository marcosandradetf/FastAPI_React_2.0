import React, { useState } from "react";
import axios from "axios";
//import Cookies from "js-cookie";
import HostConfig from './HostConfig'


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const autenticacao = async () => {
    try {
      const resposta = await axios.post(`${HostConfig.config}:8001/login`, {
        username,
        password,
      });

      // Armazena o token
      //Cookies.set("token", resposta.data.token);
      sessionStorage.setItem("token", resposta.data.token);
      
      setError("");
      //redireciona para /home
      window.location.replace("/home");
    } catch (error) {
      // Se ocorrer um erro (por exemplo, credenciais inválidas), exibe uma mensagem de erro
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center HomeAltura">
      <div className="border rounded p-5">
        <h2 className="font-weight-bold text-center">Login</h2>
        <br></br>
        <div>
          <label className="form-label">Username:</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Password:</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        {error && <p>{error}</p>}
        <button className="btn btn-primary" onClick={autenticacao}>Login</button>
      </div>
    </div>
  );
};

export default Login;
