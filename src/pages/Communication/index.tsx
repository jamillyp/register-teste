import { Nav } from "../../components/Nav";
import { BodyCommunication } from '../../components/BodyCommunication';

import './styles.css';
import { useEffect, useState } from "react";
import { Products } from "../Home";
import { NETWORK } from "../../utils/endpoints";
import api from "../../utils/api";

export function Communication() {
    const [products, setProducts] = useState<Products[]>([]);
    // const [filters, setFilters] = useState({} as Filters);

    async function loadData() {
        await api.get(NETWORK)
            .then((res: any) => {
                console.log({res});
                
                const data = res.data?.data;
                setProducts(data);
            }).catch((err) => {
                console.log("Erro ao carregar dados na rota NETWORK: ", err.message);
            });
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Nav title="Canais de Comunicação" />
            <BodyCommunication products={products} />
        </>
    )
}