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
    const [cadastro_old, setCadastro_old] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showAlert, setshowAlert] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    const {
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
            const resposta_validacao = await axios.get(`${HostConfig.config}:8002/data`);
            const dados = resposta_validacao.data;
            return dados;
        } catch (error) {
            console.log(error);
        }
    }

    data[select - 1]

    const SelectRegister = async () => {
        setCadastro(data[select - 1])
        setCadastro_old(data[select - 1])
        setShowModal(true);
    }

    const PostDataTheCadEdited = async () => {
        if (cadastro.nome != cadastro_old.nome || cadastro.cpf != cadastro_old.cpf || cadastro.data_nascimento != cadastro_old.data_nascimento) {


            try {
                const resposta_validacao = await axios.post(`${HostConfig.config}:8005/edit`, {
                    id: cadastro.id,
                    nome: cadastro.nome,
                    cpf: cadastro.cpf.toString(),
                    nasc: cadastro.data_nascimento,
                });


                if (resposta_validacao.data.error) {
                    const campoErro = Object.keys(resposta_validacao.data.error);

                    // Use a função setError para definir as mensagens de erro para os campos correspondentes
                    campoErro.forEach((key) => {
                        setError(key, {
                            type: 'manual',
                            message: resposta_validacao.data.error[key],
                        });
                    });

                } else {
                    // Limpa os erros se não houver erros
                    clearErrors();
                    reset();
                    // Após Validacao de dados sera feito a confirmacao:
                    setShowModal(false);
                    setShowModal3(true);
                }

            } catch (error) {
                console.log(error);
            }

        } else {
            setshowAlert(true);
        }
    }

    const ConfirmEdit = async () => {
        try {
            const resposta_confirm = await axios.post(`${HostConfig.config}:8005/confirm`, {
                id: cadastro.id,
                nome: cadastro.nome,
                cpf: cadastro.cpf.toString(),
                nasc: cadastro.data_nascimento,
            });

            // Após o POST bem-sucedido, nova requisição GET para obter os dados atualizados
            const resposta_dados = await axios.get(`${HostConfig.config}:8002/data`);
            const dadosAtualizados = resposta_dados.data;

            // Aqui atualiza o estado 'data' com os dados recebidos do servidor
            setData(dadosAtualizados);

            // fecha modal de confirmacao
            setShowModal3(false);

            // Fecha o modal de cadastro
            setShowModal(false);

            // abre modal de cadastro com sucesso
            setShowModal2(true);




        } catch (error) {
            console.log(error);
        }
    }


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
                    <img src="https://i.stack.imgur.com/kOnzy.gif" alt="loading..." width={50} className="mt-3" />
                )}


            </div>
            <div className="">
                <br></br>
                <br></br>
                <a href="/" className="btn btn-primary mx-5">Voltar</a>
                <Button onClick={SelectRegister} className="mx-5">Alterar</Button>
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
                                    value={cadastro.nome}
                                    onChange={(e) => {
                                        setCadastro({ ...cadastro, nome: e.target.value });
                                        clearErrors('nome')
                                    }}
                                    minLength="5"

                                /></p>
                                <div className="form-text">
                                    {!errors.nome && 'Digite um Nome e um Sobrenome.'}
                                    {errors.nome && <p className="text-danger">{errors.nome.message}</p>}
                                </div>

                                <p><strong>CPF</strong><input
                                    className="form-control"
                                    style={{ width: "auto" }}
                                    type="text"
                                    value={cadastro.cpf}
                                    onChange={(e) => {
                                        setCadastro({ ...cadastro, cpf: e.target.value });
                                        clearErrors('cpf')
                                    }}
                                    maxLength="11"

                                /></p>
                                <div className="form-text">
                                    {!errors.cpf && 'Digite um CPF válido.'}
                                    {errors.cpf && <p className="text-danger">{errors.cpf.message}</p>}
                                </div>

                                <p><strong>Data de Nascimento</strong><input
                                    className="form-control"
                                    style={{ width: "auto" }}
                                    type="text"
                                    value={cadastro.data_nascimento}
                                    onChange={(e) => {
                                        setCadastro({ ...cadastro, data_nascimento: e.target.value });
                                        clearErrors('nome')
                                    }}
                                    maxLength="10"

                                /></p>
                                <div className="form-text">
                                    {!errors.nasc && 'Informe sua data de nascimento.'}
                                    {errors.nasc && <p className="text-danger">{errors.nasc.message}</p>}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Alert Pos-Confirmação */} 
                   
                    {showAlert && (<div className="alert alert-warning alert-dismissible fade show alert_Modal" role="alert">
                        <strong>Aviso</strong> Altere o cadastro antes de enviar.
                        <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={() => setshowAlert(false)}>
                        </button>
                    </div>)}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={PostDataTheCadEdited}>
                        Confirmar
                    </Button>

                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p className="h5 text-center">Cadastro Alterado com Sucesso!</p>
                </Modal.Body>
                <Modal.Footer>
                    <a className="btn btn-primary" href="/">Voltar ao Início</a>

                    <Button variant="primary" onClick={() => setShowModal2(false)}>
                        Alterar Outro
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={showModal3} onHide={() => setShowModal3(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p className="h5 text-center">Confirme a alteração do cadastro:</p>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={() => {
                        setShowModal3(false);
                        setShowModal(true);
                    }}>
                        Cancelar
                    </Button>

                    <Button variant="primary" onClick={ConfirmEdit}>
                        Confirmar
                    </Button>

                </Modal.Footer>
            </Modal>


        </div>

    );
};

export default Alterar_Cad;
