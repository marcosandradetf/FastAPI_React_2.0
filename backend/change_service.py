from fastapi import FastAPI, Form
import pandas as pd
import os
from cors_setup import setup_cors
from pydantic import BaseModel
from library.validacoes_cadastro import Sistema

app = FastAPI()
setup_cors(app)
sistema = Sistema()


# Modelo de dados para edição de cadastro
class Cadastro(BaseModel):
    id: int
    nome: str
    cpf: str
    nasc: str


@app.post("/edit")
async def cad_edit(request: Cadastro):
    # acesso ao cadastro
    id = request.id
    nome = request.nome
    cpf = request.cpf
    nasc = request.nasc

    errors = {}

    # validação de dados
    while True:
        nome_ok, error_msg = sistema.verifica_nome_ok(nome)
        if not nome_ok:
            errors["nome"] = error_msg
            return {"error": errors}

        cpf_ok, error_msg = sistema.ver_cpf_ok(cpf)
        if not cpf_ok:
            errors["cpf"] = error_msg
            print({"error": errors})
            return {"error": errors}

        nasc_ok, error_msg = sistema.ver_nasc_ok(nasc)
        if nasc_ok:
            break
        errors["nasc"] = error_msg
        return {"error": errors}

    return {"message": "Dados OK!"}


@app.post("/confirm")
async def cad_confirm(request: Cadastro):
    # acesso ao cadastro
    id = request.id
    nome = request.nome
    cpf = request.cpf
    nasc = request.nasc

    # caminho para arquivo csv
    library = "library"
    dir_csv = os.path.join(library, "data.csv")

    # ler csv
    df = pd.read_csv(dir_csv)

    # Localizando a linha do CAD correspondente ao ID no DataFrame
    cadastro_selecionado = df[df["id"] == id].index[0]

    # Atualizando os valores da linha correspondente
    df.loc[cadastro_selecionado] = [id, nome, cpf, nasc]

    # Após atualizar os valores da linha correspondente
    df.to_csv(dir_csv, index=False)  # Salvar o DataFrame no arquivo CSV

    return {"message": "Cadastro atualizado com sucesso!"}
