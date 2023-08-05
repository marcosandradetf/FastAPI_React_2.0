import subprocess

if __name__ == '__main__':
    # Comando para executar o servidor do auth_service
    auth_command = ["uvicorn", "auth_service:app", "--host", "localhost", "--port", "8001"]

    # Comando para executar o servidor do data_service
    data_command = ["uvicorn", "data_service:app", "--host", "localhost", "--port", "8002"]

    # Comando para executar o servidor de cadastro
    cad_command = ["uvicorn", "cad_service:app", "--host", "localhost", "--port", "8003"]

    # Comando para executar o servidor de delete
    del_command = ["uvicorn", "delete_service:app", "--host", "localhost", "--port", "8004"]

    # Inicia os dois servidores em processos separados
    auth_process = subprocess.Popen(auth_command)
    data_process = subprocess.Popen(data_command)
    cad_process = subprocess.Popen(cad_command)
    del_process = subprocess.Popen(del_command)

    # Aguarda a conclusão dos processos (isso não bloqueará o loop principal)
    auth_process.wait()
    data_process.wait()
    cad_process.wait()
    del_process.wait()
