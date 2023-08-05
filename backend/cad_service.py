from fastapi import FastAPI, Form
import pandas as pd
import os
from cors_setup import setup_cors
from library.validacoes_cadastro import Sistema
from pydantic import BaseModel

app = FastAPI()
setup_cors(app)
sistema = Sistema()

# Modelo de dados
class Item(BaseModel):
    nome: str
    cpf: str
    nasc: str

@app.post("/cadastro")
async def cadastrar(item: Item):
    # variaveis de cadastro
    nome = item.nome
    cpf = item.cpf
    nasc = item.nasc

    errors = {}

    while True:
        nome_ok, error_msg = sistema.verifica_nome_ok(nome)
        if not nome_ok:
            errors['nome'] = error_msg
            return {'error': errors}


        cpf_ok, error_msg = sistema.ver_cpf_ok(cpf)
        if not cpf_ok:
            errors['cpf'] = error_msg
            print({'error': errors})
            return {'error': errors}

        nasc_ok, error_msg = sistema.ver_nasc_ok(nasc)
        if nasc_ok:
            break
        errors['nasc'] = error_msg
        return {'error': errors}

    # caminho
    library = "library"
    dir_csv = os.path.join(library, 'data.csv')
    # gerando id
    try:
        # Ler o arquivo CSV existente
        df = pd.read_csv(dir_csv)

        # Obter o valor máximo do ID atual
        max_id = df['id'].max()

        # Calcular o próximo ID disponível
        next_id = max_id + 1
    except FileNotFoundError:
        # Se o arquivo CSV não existir, definir o próximo ID como 1
        next_id = 1
    except pd.errors.EmptyDataError:
        # Se o arquivo CSV estiver vazio, definir o próximo ID como 1
        next_id = 1
    # criando dicionario
    dados = {
        "id": next_id,
        "nome": nome,
        "cpf": cpf,
        "data_nascimento": nasc
    }

    # Criar um DataFrame com os dados
    df = pd.DataFrame([dados])

    # Salvar o DataFrame em um arquivo CSV
    header = not (os.path.isfile(dir_csv) and os.stat(dir_csv).st_size > 0)
    df.to_csv(dir_csv, mode='a', header=header, index=False)
    
    return {'message': 'Dados cadastrados com sucesso!'}