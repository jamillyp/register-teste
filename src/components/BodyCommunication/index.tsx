import { NavBar } from "../NavBar";

import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner'

import './styles.css';
import { useEffect, useState } from "react";
import { Products } from "../../pages/Home";

interface BodyCommunicationProps {
    products: Products[];
}

export function BodyCommunication({ products }: BodyCommunicationProps) {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<Products[]>([]);

    const [channel, setChannel] = useState("");

    const [totalPages, setTotalPages] = useState(0);

    function paginate(array: Array<any>, page_size: number, page_number: number) {
        setData(array.slice((page_number - 1) * page_size, page_number * page_size));
    }

    function goToFirstPage() {
        setCurrentPage(1);
    }

    function goToPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function goToLastPage() {
        setCurrentPage(totalPages);
    }

    useEffect(() => {
        paginate(products, itemsPerPage, currentPage);
    }, [products, currentPage, itemsPerPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / itemsPerPage));
    }, [products, itemsPerPage]);

    return (
        <div className="container-communication">
            <div className="content-communication">
                <div className="title-communication">
                    {[false].map((expand) => (
                        <NavBar key={Number(expand)} expand={expand} />
                    ))}
                </div>

                <div className="content-body-communication">
                    <div className="subtitle-communication">

                        <span>Canal selecionado:  {channel ? <h3>{channel}</h3> : <h3>-</h3>}</span>
                        <select onChange={(e) => setChannel(e.target.value)}>
                            <option>Selecione o canal</option>
                            <option value='Whatsapp'>WhatsApp</option>
                            <option value='SMS'>SMS</option>
                            <option value='URA'>URA</option>
                        </select>
                    </div>

                    <div className="table-body-communication">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            {
                                data ?
                                data.map((product) => (
                                    <tbody><tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.status}</td>
                                    </tr></tbody>
                                )) : <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>
                            }


                        </table>

                        <div className='pagination-communication'>

                            <div className='row-for-page'>
                                <span>Linha por página: </span>
                                <select onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                    <option value={25}>25</option>
                                    <option value={30}>30</option>
                                </select>
                            </div>

                            <Pagination>
                                <Pagination.First onClick={goToFirstPage} disabled={currentPage === 1} />
                                <Pagination.Prev onClick={goToPrevPage} disabled={currentPage === 1} />
                                <Pagination.Next onClick={goToNextPage} disabled={currentPage === totalPages} />
                                <Pagination.Last onClick={goToLastPage} disabled={currentPage === totalPages} />
                            </Pagination>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}