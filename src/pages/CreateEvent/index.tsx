import { Nav } from "../../components/Nav";
import Button from "react-bootstrap/esm/Button";

import './styles.css';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { EQUIPMENTS, NETWORK } from "../../utils/endpoints";
import api from "../../utils/api";
import Form from "../../components/Form";

export function CreateEvent() {
    const [equipments, setEquipments] = useState([]);

    function onSubmit(data: any) {
        console.log("Create test: ", { data });
        api.post(NETWORK, data)
            .then((res) => {
                alert("Cadastro realizado com sucesso!");
                history.push("/");
            }).catch((err) => {
                alert("Falha ao realizar cadastro: " + err);
            });
    }

    async function loadEquipments() {
        await api.get(EQUIPMENTS)
            .then((res: any) => {
                const newDataEquipments = res.data.data.map((item: any) => {
                    return {
                        id: item.id, 
                        name: item.title, 
                        title: item.title, 
                        host: item.host
                    }
                });
                setEquipments(newDataEquipments);

            }).catch((err) => {
                console.log("Erro na rota EQUIPMENTS: ", err.message);
            });
    }

    useEffect(() => {
        console.log({equipments});
    }, [])

    useEffect(() => {
        loadEquipments();
    }, [])

    const history = useHistory();

    return (
        <>
            <Nav title="Adicionar evento - REDE" />
            <div id='create-event-back'>
                <Button
                    variant="light"
                    type="button"
                    onClick={() => history.push('/')}
                >{'< '}voltar</Button>
            </div>
            <div className="container-create-event">
                <div className="content-create-event">

                <Form 
                    fields={[
                        {type: "text", placeholder: "Titulo:", name: "title", required: true},
                        {type: "select", placeholder: "Equipamento:", name: "equipment_id", options: equipments},
                        {type: "number", placeholder: "Tempo de solução (em horas)", name: "solution_time"},
                        {type: "datetime-local", placeholder: "Data de Início:", name: "start", required: true},
                    ]}
                    titleSubmit="Salvar"
                   
                    submit={onSubmit}
                />

                </div>

            </div>
        </>
    )
}