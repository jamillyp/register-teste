import { useEffect, useState } from "react";

import eventIcon from '../../assets/eventIcon.svg';
import { NETWORK } from "../../utils/endpoints";

import { BodyHome } from "../../components/BodyHome";
import { Nav } from "../../components/Nav";

import api from "../../utils/api";
export interface Filters {
    id?: number;
    title?: string;
    status?: string;
    host?: string;
    solution_time?: number;
    start?: string;
    final?: string;
    total_users?: number;
}
export interface Products {
    id: number;
    title: string;
    status: string;
    host: string;
    solution_time: number;
    start: string;
    final: string;
    total_users: number;
}

export function Home() {
    const [products, setProducts] = useState<Products[]>([]);
    const [filters, setFilters] = useState({} as Filters);

    async function filterProducts(filters: Filters) {
        await api.get(NETWORK, { params: { ...filters } })
            .then((res: any) => {
                const data = res.data?.data;
                setProducts(data);
            }).catch((err) => {
                console.log("Erro ao carregar dados na rota NETWORK: ", err.message);
            })
    }

    useEffect(() => {
        filterProducts({});
    }, []);

    return (
        <>
            <Nav title="Eventos de Massiva" img={eventIcon} filterProducts={() => filterProducts(filters)} />
            <BodyHome products={products} />
        </>
    );
}