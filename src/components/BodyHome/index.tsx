import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import addEvent from '../../assets/addEvent.svg';
import idIcon from '../../assets/id.svg';
import editEvent from '../../assets/editEvent.svg';

import { Products } from '../../pages/Home';
import { NavBar } from '../NavBar';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';

interface BodyHomeProps {
    products: Products[];
}

export function BodyHome({ products }: BodyHomeProps) {

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<Products[]>([]);

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

    function handleSortableId() {
        if (currentPage < totalPages) {
            goToNextPage();
            console.log('próxima página');
        } else if(currentPage > 1) {
            goToFirstPage();
        }
    }

    useEffect(() => {
        paginate(products, itemsPerPage, currentPage);
    }, [products, currentPage, itemsPerPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / itemsPerPage));
    }, [products, itemsPerPage]);

    const handleEdit = (item: any) => {
        history.push("/editEvent", { item })
    }

    const history = useHistory();

    return (
        <div className='container-home'>
            <div className='content-home'>
                <div className='add-event-button-home'>

                    {[false].map((expand) => (
                        <NavBar expand={expand} />
                    ))}

                    <Button
                        onClick={() => history.push('/createEvent')}
                        variant='light'><img src={addEvent} alt="add-event-icon" />Adicionar Evento
                    </Button>
                </div>

                <div className='table-home'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID <img src={idIcon} alt="id-icon" onClick={handleSortableId} /></th>
                                <th>Título</th>
                                <th>Host</th>
                                <th>Início</th>
                                <th>Fim</th>
                                <th>Tempo de Solução</th>
                                <th>Status</th>
                                <th>Opções</th>
                            </tr>
                        </thead>

                        {data ? <> {
                            data.map((dataItem) => (
                                <tbody key={dataItem.id}>
                                    <tr key={dataItem.id}>
                                        {dataItem.id ? <td>{dataItem.id}</td> : <td>-</td>}
                                        {dataItem.title ? <td>{dataItem.title}</td> : <td>-</td>}
                                        {dataItem.host ? <td>{dataItem.host}</td> : <td>-</td>}
                                        {dataItem.start ? <td>{dataItem.start}</td> : <td>-</td>}
                                        {dataItem.final ? <td>{dataItem.final}</td> : <td>-</td>}
                                        {dataItem.solution_time ? <td>{dataItem.solution_time}</td> : <td>-</td>}
                                        {dataItem.status ? <td>{dataItem.status}</td> : <td>-</td>}
                                        <td onClick={() => handleEdit(dataItem)} style={{ cursor: 'pointer' }}>
                                            Editar
                                            <img src={editEvent} alt="edit-event-icon" />
                                        </td>
                                    </tr>
                                </tbody>
                            )
                            )

                        }</> : <h1>carregando...</h1>}

                    </table>
                    <div className='pagination-home'>

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
    );
}