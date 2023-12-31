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

    // Estado para controlar modal de confirmacao de exclusao
    const [showModal, setShowModal] = useState(false);

    // Estado para controlar modal de aviso no sucesso de exclusao
    const [showModalPos, setShowModalPos] = useState(false);

    // Estado para controlar alert de selecao de cadastro para exclusao
    const [showAlert, setShowAlert] = useState(false);
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

    // Função para filtrar os dados com base no valor de busca fornecido pelo usuário.
    const FiltroCad = searchValue ? data.filter(
        (item) => item.nome.toLowerCase().includes(
            searchValue.toLowerCase())) : data;

    // Função para mudar de página na paginação dos dados e atualizar o conteúdo exibido na interface.
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const PostItems = () => {
        // abrir o modal de confirmação
        if (selectedItems.length > 0) {
            setShowModal(true);
        } else {
            setShowAlert(true)
        }

    }

    const PostConfirm = async () => {
        setShowModal(false);
        try {
            const envio = await axios.post(`${HostConfig.config}:8004/delete`, {
                ItensSelecionadosPeloCliente: selectedItems,
            });

            setShowModalPos(true);

            // Após o POST bem-sucedido, nova requisição GET para obter os dados atualizados
            const resposta = await axios.get(`${HostConfig.config}:8002/data`);
            const dadosAtualizados = resposta.data;

            // Aqui atualiza o estado 'data' com os dados recebidos do servidor
            setData(dadosAtualizados);

        } catch (error) {
            console.log(error)
        }
    }



    const Item_select = (id) => {
        // Verifica se o item já está selecionado no array de itens selecionados com base no index
        const itemIndex = selectedItems.indexOf(id);

        if (itemIndex !== -1) {
            const Itens_selecionados = [...selectedItems];
            Itens_selecionados.splice(itemIndex, 1);
            setSelectedItems(Itens_selecionados);
        } else {
            setSelectedItems([...selectedItems, id]);
        }

    };

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
            <h2 className="text-center mt-4">Exclusão de Cadastro</h2>
            <div className="mb-2" style={{ width: 'auto' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filtrar Busca:"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
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
                                        onChange={() => Item_select(item.id)}
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

            <div className="d-flex justify-content-between w-50">
                <a href="/home" className="btn btn-primary mb-3">Voltar</a>
                <button type="button" className="btn btn-primary mb-3" onClick={PostItems}>Excluir</button>
            </div>


            {/* Modal de Confirmação */}


            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <p className="h5 text-center">Confirme exclusão dos itens selecionados:</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={PostConfirm}>
                        Confirmar
                    </Button>

                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>

                </Modal.Footer>
            </Modal>

            {/* Modal Pos-Confirmação */}
            <Modal show={showModalPos} onHide={() => setShowModalPos(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <p className="h4 text-center">Items Excluídos com Sucesso!</p>

                </Modal.Body>
                <Modal.Footer>

                    <a href="/" className="btn btn-primary">Voltar ao Início</a>

                    <Button variant="primary" onClick={() => setShowModalPos(false)}>
                        Excluir Outro
                    </Button>

                </Modal.Footer>
            </Modal>

            {/* Alert Pos-Confirmação */}
            {showAlert && (<div className="alert alert-warning alert-dismissible fade show" role="alert" style={{ position: "absolute", top: "500px" }}>
                <strong>Aviso</strong> Você precisa selecionar o cadastro que deseja excluir.
                <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}>
                </button>
            </div>)}
            

        </div>
    );
}

export default Delete;