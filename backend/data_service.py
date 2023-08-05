from fastapi import FastAPI, Request
import pandas as pd
import os
from cors_setup import setup_cors

app = FastAPI()
setup_cors(app)

@app.get('/data')
async def dados(request: Request):
    meus_dados = "library"
    dir_csv = os.path.join(meus_dados, 'data.csv')
    
    df = pd.read_csv(dir_csv)
    df_dict = df.to_dict(orient='records')

    # Verifica o cabeçalho 'Accept' para decidir o tipo de resposta
    accept_header = request.headers.get('accept', '').lower()
    if 'application/json' in accept_header:
        # Retorna os dados como resposta JSON
        return df_dict
    else:
        # Renderiza o template HTML e passa os dados para serem exibidos no frontend
        return {"data": df_dict}
