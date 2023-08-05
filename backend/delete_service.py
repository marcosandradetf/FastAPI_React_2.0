from fastapi import FastAPI, Request
import pandas as pd
import os
from cors_setup import setup_cors
from pydantic import BaseModel

app = FastAPI()
setup_cors(app)

"""
Classe para representar os itens selecionados enviados pelo cliente.

Atributos:
- ItensSelecionadosPeloCliente (list[int]): Uma lista de inteiros representando os IDs dos itens selecionados pelo cliente.
"""
class ItensEnviadosPeloCliente(BaseModel):
    ItensSelecionadosPeloCliente: list[int]

# Rota para excluir os itens selecionados
@app.post("/delete")
async def delete_items(request: ItensEnviadosPeloCliente):
    selected_items = request.ItensSelecionadosPeloCliente
    # Execute a lógica de exclusão dos itens selecionados aqui
    # Você pode usar o pandas para manipular o arquivo CSV e excluir os itens correspondentes
    
    # Exemplo de lógica de exclusão: removendo os itens selecionados do DataFrame

    # path para file.csv
    meus_dados = "meus_dados"
    dir_csv = os.path.join(meus_dados, 'dados.csv')

    # leitura do csv
    df = pd.read_csv(dir_csv)

    # fazendo a exclusao do csv
    df = df[~df["id"].isin(selected_items)]

    # realocando o id
    df["id"] = range(1, len(df) + 1)

    # salvando o arquivo
    df.to_csv(dir_csv, index=False)

    # Retorne uma resposta adequada após a exclusão
    return {"message": "Itens excluídos com sucesso"}