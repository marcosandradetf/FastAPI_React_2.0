import React from "react";
import HostConfig from "./HostConfig";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useState } from "react";

// Importe o Modal e defina o elemento raiz do aplicativo
import { Modal, Button } from "react-bootstrap";
//Modal.setAppElement("#root");

const Cadastro = () => {
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        clearErrors,
        reset
    } = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const SendData = async (data) => {

        try {
            const resposta = await axios.post(`${HostConfig.config}:8003/cadastro`, data);

            if (resposta.data.error) {
                const campoErro = Object.keys(resposta.data.error);

                // Use a função setError para definir as mensagens de erro para os campos correspondentes
                campoErro.forEach((key) => {
                    setError(key, {
                        type: 'manual',
                        message: resposta.data.error[key],
                    });
                });
            } else {
                // Limpa os erros se não houver erros
                clearErrors();
                reset();
                // Define o estado para mostrar o modal
                setIsModalOpen(true);
            }


        } catch (error) {
            console.log(error)
            console.log('Erro ao Enviar Formulário.')
        }

    };

    return (

        <div className="d-flex justify-content-center align-items-center HomeAltura">
            <div className="d-flex justify-content-center align-items-center border formulario">
                <form className="formulario" onSubmit={handleSubmit(SendData)}>
                    <h2 className="border-bottom text-center pb-2 mb-4">Cadastro</h2>

                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            name="nome"
                            placeholder="Ex: João Neves"
                            {...register('nome')} />

                        <div className="form-text">
                            {!errors.nome && 'Digite um Nome e um Sobrenome.'}
                            {errors.nome && <p className="text-danger">{errors.nome.message}</p>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cpf" className="form-label">
                            CPF
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            placeholder="Ex: 12345678901"
                            {...register('cpf')} />
                        <div className="form-text">
                            {!errors.cpf && 'Digite um CPF válido.'}
                            {errors.cpf && <p className="text-danger">{errors.cpf.message}</p>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nasc" className="form-label">
                            Data de Nascimento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nasc"
                            name="nasc"
                            maxLength="10"
                            placeholder="dd/mm/aaaa"
                            {...register('nasc')}

                        />
                        <div className="form-text">
                            {!errors.nasc && 'Informe sua data de nascimento.'}
                            {errors.nasc && <p className="text-danger">{errors.nasc.message}</p>}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <a className="btn btn-primary" href="/">
                            VOLTAR
                        </a>
                        <button type="submit" className="btn btn-primary">
                            ENVIAR
                        </button>
                    </div>
                </form>

                <Modal show={isModalOpen} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >

                        <p className="h4 text-center">Cadastro realizado com sucesso!</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>
                            Fazer outro Cadastro
                        </Button>

                        <a href="/" className="btn btn-success">Voltar ao Início</a>

                    </Modal.Footer>
                </Modal>








            </div>
        </div>
    );
};

export default Cadastro;
