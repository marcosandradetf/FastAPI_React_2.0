from fastapi import FastAPI, Form
import pandas as pd
import os
from cors_setup import setup_cors
from pydantic import BaseModel

app = FastAPI()
setup_cors(app)

# Modelo de dados
class Cadastro_alterar(BaseModel):
    Cadastro_enviado: list[int]

@app.post("/change")
async def alterar(request: Cadastro_alterar):
    id_enviado = request.Cadastro_enviado

    local = "library"

    arquivo_csv = os.path.join(local, "data.csv")

    df = pd.read_csv(arquivo_csv)

    cadastro_selecionado = df.loc[df["id"].isin(id_enviado)]

    if not cadastro_selecionado.empty:
        print(cadastro_selecionado)
        return cadastro_selecionado.to_dict(orient="records")
    else:
        print("nenhum cadastro encontrado")