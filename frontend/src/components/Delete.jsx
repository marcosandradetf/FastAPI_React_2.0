import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import HostConfig from "./HostConfig";
import Pagination from "./Delete_Pagination"

const Delete = () => {

    //  ESTADOS(STATES)
    // State(Estado) para armazenar os dados da aplicação oriundos do backend.
    const [data, setData] = useState([]);

    // State para armazenar o valor de busca do usuário.
    const [searchValue, setSearchValue] = useState("");

    // State para armazenar o número da página atual na paginação dos dados.
    // Esse estado é utilizado para controlar qual página dos dados está sendo visualizada pelo usuário.
    // Ao atualizar esse estado, a interface é re-renderizada para exibir o conteúdo da página selecionada.
    const [currentPage, setCurrentPage] = useState(1);

    // State(Estado) para armazenar os itens selecionados pelo usuário.
    const [selectedItems, setSelectedItems] = useState([]);

    // useEffect para obter os dados iniciais da API ao montar o componente.
    useEffect(() => {
        MyQuery().then((dados) => setData(dados)).catch((error) => console.log('Erro ao obter dados', error));
    }, []);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //FUNCOES
    // Função assíncrona para realizar uma consulta à API e retornar os dados obtidos.
    const MyQuery = async () => {
        try {
            const resposta = await axios.get(`${HostConfig.config}:8002/data`);
            const dados = resposta.data;
            return dados
        } catch (error) {
            console.log('Erro ao obter dados')
        }
    }

    // Função para atualizar o estado de busca conforme o usuário digita no campo de pesquisa.
    const PesquisaCad = (e) => {
        setSearchValue(e.target.value);
    };

    // Função para filtrar os dados com base no valor de busca fornecido pelo usuário.
    const FiltroCad = searchValue ? data.filter(
        (item) => item.nome.toLowerCase().includes(
            searchValue.toLowerCase())) : data;

    // Função para mudar de página na paginação dos dados e atualizar o conteúdo exibido na interface.
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const PostItems = () => {
        alert();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Obtenha os itens a serem exibidos na página atual com base no estado currentPage.
    // Nesta lógica de paginação, definimos que cada página exibirá 20 itens.
    // Calculamos os índices do primeiro e último item a serem mostrados na página com base no currentPage.
    // Em seguida, utilizamos esses índices para obter o subconjunto de itens correspondente à página atual.
    const itemsPerPage = 20; // Definir a quantidade de itens a serem exibidos por página.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = FiltroCad.slice(indexOfFirstItem, indexOfLastItem);

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
                            <th><img src="https://cdn-icons-png.flaticon.com/512/39/39220.png?w=740&t=st=1689557971~exp=1689558571~hmac=f78d7adedcd64aab755997f00c7235234857f27e5184747ce472ed1d180675f9" alt="delete" width={20} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.cpf}</td>
                                <td>{item.data_nascimento}</td>
                                <td>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => ItemSelection(item.id)}
                                    />
                                </td>
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

            <div className="d-flex justify-content-around w-25">
                <a href="/home" className="btn btn-primary mb-3" style={{ marginLeft: '-100px' }}>Voltar</a>
                <button type="button" className="btn btn-primary mb-3" onClick={PostItems}>Excluir</button>
            </div>

        </div>
    );
}

export default Delete;