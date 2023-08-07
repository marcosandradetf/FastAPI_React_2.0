import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import HostConfig from "./HostConfig";
import { Table, Button, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';

const Alterar_Cad = () => {
    const [data, setData] = useState([]);
    const [select, setSelect] = useState('');
    const [cadastro, setCadastro] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editCadastro, setEditCadastro] = useState({
        nome: "",
        cpf: 0,
        data_nascimento: ""
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        clearErrors,
        reset
    } = useForm();



    useEffect(() => {
        request_data().then((dados) => setData(dados)).catch((error) => console.log(error));
    }, []);



    const request_data = async () => {
        try {
            const resposta = await axios.get(`${HostConfig.config}:8002/data`);
            const dados = resposta.data;
            return dados;
        } catch (error) {
            console.log(error);
        }
    }

    const Post_ID = async () => {
        try {
            const resposta = await axios.post(`${HostConfig.config}:8005/change`, {
                Cadastro_enviado: [select],
            });

            const cadastro_recebido = resposta.data[0];
            setCadastro(cadastro_recebido)
            setShowModal(true);


        } catch (error) {
            console.log(error);
        }
    }
    console.log(editCadastro)

    return (
        <div className="d-flex flex-column align-items-center justify-content-center HomeAltura" >
            <div>
                <br></br>
                <select className="form-select" onChange={(e) => setSelect(e.target.value)}>
                    <option value="">Selecione o cadastro que deseja alterar</option>
                    {data.map((item) => (
                        <option key={item.id} value={item.id}>{item.nome}</option>
                    ))}
                </select>
            </div>
            <div>
                <br></br>
                {select && data.length > 0 ? (
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

                            <tr>
                                <td>{data[select - 1].id}</td>
                                <td>{data[select - 1].nome}</td>
                                <td>{data[select - 1].cpf}</td>
                                <td>{data[select - 1].data_nascimento}</td>
                            </tr>
                        </tbody>
                    </Table>
                ) : (
                    <img src="https://i.stack.imgur.com/kOnzy.gif" alt="loading" width={50} />
                )}


            </div>
            <div className="d-flex justify-content-between w-50">
                <br></br>
                <a href="/" className="btn btn-primary">Voltar</a>
                <Button onClick={Post_ID}>Alterar</Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="d-flex justify-content-center">
                        <div className="stacked-table">
                            <div className="stacked-table-item">
                                <p><strong>Nome</strong><input
                                    className="form-control"
                                    style={{ width: "auto" }}
                                    type="text"
                                    placeholder={cadastro.nome}
                                    onChange={(e) => setEditCadastro({ ...editCadastro, nome: e.target.value })}
                                    minLength="5"
                                /></p>
                                <p><strong>CPF</strong><input
                                    className="form-control"
                                    style={{ width: "auto" }}
                                    type="text"
                                    placeholder={cadastro.cpf}
                                    onChange={(e) => setEditCadastro({ ...editCadastro, cpf: e.target.value })}
                                    maxLength="11"
                                /></p>
                                <p><strong>Data de Nascimento</strong><input
                                    className="form-control"
                                    style={{ width: "auto" }}
                                    type="text"
                                    placeholder={cadastro.data_nascimento}
                                    onChange={(e) => setEditCadastro({ ...editCadastro, data_nascimento: e.target.value })}
                                    maxLength="10"
                                /></p>
                            </div>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Confirmar
                    </Button>

                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>

                </Modal.Footer>
            </Modal>



        </div>

    );
};

export default Alterar_Cad;