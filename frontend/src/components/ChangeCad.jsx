import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import HostConfig from "./HostConfig";

const Alterar_Cad = () => {
    const [data, setData] = useState([]);

    useEffect( () => {
        request_data().then( (dados) =>setData(dados).catch( (error) => console.log(error) ) );
    }, []);

    const request_data = async () => {
        try{
            const resposta  = await axios.get(`${HostConfig}:8002/data`);
            const dados = resposta.data;
            return dados;
        } catch (error){
            console.log(error);
        }
    }

    return(
        <div>hello world</div>
    );
};

export default Alterar_Cad;