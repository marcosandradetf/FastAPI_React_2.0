from fastapi.middleware.cors import CORSMiddleware

# Função para configurar o middleware do CORS
def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
