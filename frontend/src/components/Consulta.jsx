import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import HostConfig from "./HostConfig";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-2">
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button
                            className={
                                number === currentPage ? "page-link active" : "page-link"
                            }
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
            <a href="/home" className="btn btn-primary mb-3" style={{marginLeft:'-100px'}}>Voltar</a>
        </nav>
    );
};

const Consulta = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        MyQuery().then((dados) => setData(dados)).catch((error) => console.log('Erro ao obter dados', error));
    }, []);

    const MyQuery = async () => {
        try {
            const resposta = await axios.get(`${HostConfig.config}:8002/data`);
            const dados = resposta.data;
            return dados
        } catch (error) {
            console.log('Erro ao obter dados')
        }
    }


    const [searchValue, setSearchValue] = useState("");

    const PesquisaCad = (e) => {
        setSearchValue(e.target.value);
    };

    const FiltroCad = searchValue ? data.filter(
        (item) => item.nome.toLowerCase().includes(
            searchValue.toLowerCase())) : data;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Defina a quantidade de itens a serem exibidos por página

    // Obtenha os itens a serem exibidos na página atual com base no estado currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = FiltroCad.slice(indexOfFirstItem, indexOfLastItem);

    // Função para mudar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className="text-center mt-4">Consulta</h2>
            <div className="mb-2" style={{ width: 'auto' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filtrar Busca:"
                    value={searchValue}
                    onChange={PesquisaCad}
                />
            </div>

            <div className="table-container">
                <Table striped bordered style={{ width: "auto" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.cpf}</td>
                                <td>{item.data_nascimento}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


            <div className="mt-3">
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={FiltroCad.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>


        </div>
    );
}

export default Consulta;