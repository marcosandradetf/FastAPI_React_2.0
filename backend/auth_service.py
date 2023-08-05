from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from cors_setup import setup_cors

app = FastAPI()
setup_cors(app)

class User(BaseModel):
    username: str
    password: str

# Simulando um usuário registrado no sistema
registered_user = User(username="admin", password="password")

@app.post("/login")
async def login(user: User):
    # Verifica se as credenciais recebidas são válidas
    if user.username == registered_user.username and user.password == registered_user.password:
        return {"message": "Login bem-sucedido!"}
    else:
        raise HTTPException(status_code=401, detail="Credenciais inválidas.")
