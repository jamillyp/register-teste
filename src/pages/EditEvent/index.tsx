import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useHistory, useLocation } from "react-router-dom";
import Form from "../../components/Form";
import { Nav } from "../../components/Nav";
import api from "../../utils/api";
import { NETWORK } from "../../utils/endpoints";

export function EditEvent() {
    const history = useHistory();
    const { state }: any = useLocation();

    function onUpdate(data: any) {
        const updateData = {
            final: data.final,
            solution_time: data.solution_time,
            status: data.status
        }

        api.put(`${NETWORK}/${state.item.id}`, updateData)
            .then(res => {
                alert("Atualizado com sucesso!");
                history.push("/");
            })
            .catch(error => alert(JSON.stringify(error)));
    }



    const updateFields = {
        title: state.item.title,
        solution_time: state.item.solution_time,
        start: state.item.start,
        status: state.item.status,
        final: state.item.final
    }

    useEffect(() => {
        console.log({ state });
    }, [state])

    return (
        <>
            <Nav title="Editar evento - REDE" />

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
                            { type: "text", placeholder: "Titulo: ", name: "title", required: true, disabled: true },
                            { type: "number", placeholder: "Tempo de solução (em horas)", name: "solution_time" },
                            { type: "datetime-local", placeholder: "Data e Hora de Início:", name: "start", required: true, disabled: true },
                            { type: "datetime-local", placeholder: "Data e Hora Final:", name: "final", required: true },
                            { type: "select", placeholder: "Status:", name: "status", options: [{ id: "OPEN", name: "Aberta" }, { id: "SOLVED", name: "Solucionada" }], required: true },
                        ]}
                        titleSubmit="Salvar"
                        submit={onUpdate}
                        stateField={updateFields}
                    />

                </div>

            </div>
        </>
    )
}