import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

import LoginPage from "./components/LoginPage";
import NavBarPage from "./components/NavBarPage";
import FooterBarPage from "./components/FooterBarPage"
import HomePage from "./components/HomePage";
import Cadastro from "./components/Cadastro";
import Consulta from "./components/Consulta";
import Delete from "./components/Delete";
import Alterar_Cad from "./components/ChangeCad";
// import OutraPage from "./components/OutraPage";


const App = () => {
  const ifAuthenticated = () => {
    //const token = localStorage.getItem("token");
    const token = sessionStorage.getItem("token");
    //const token = Cookies.get("token");
    // Verifica se o token existe e não está expirado
    return token !== null;
  };


  return (
    <div>

      <Router>
        <NavBarPage />
        <div className="MyScreen">

          <Routes>

            <Route
              path="/auth"
              element={ifAuthenticated() ? <Navigate to="/home" /> : <LoginPage />} />
            {/* Rota protegida para a página inicial */}
            <Route
              path="/home"
              element={ifAuthenticated() ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/reg"
              element={ifAuthenticated() ? <Cadastro /> : <Navigate to="/login" />}
            />
            <Route
              path="/query"
              element={ifAuthenticated() ? <Consulta /> : <Navigate to="/login" />}
            />
            <Route
              path="/delete"
              element={ifAuthenticated() ? <Delete /> : <Navigate to="/login" />}
            />

            <Route
              path="/change"
              element={ifAuthenticated() ? <Alterar_Cad /> : <Navigate to="/login" />}
            />

            {/* Redireciona para a página de login se nenhuma rota corresponder */}
            <Route path="*" element={<Navigate to="/home" />} />

          </Routes>

        </div>
        <FooterBarPage />
      </Router>

    </div>
  );
};


export default App;
