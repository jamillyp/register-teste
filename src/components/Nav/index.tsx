
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logoMob from '../../assets/logo.svg';
import { Filters, Products } from '../../pages/Home';

import './styles.css';
interface NavProps {
    title?: string;
    img?: string;
    filterProducts?: (filters: Filters) => Promise<void>;
    // filterProducts?: () => Promise<Products[]>;
}

export function Nav({ title, img, filterProducts }: NavProps) {
    const [idProduct, setIdProduct] = useState('');


    function handleSubmitSearch(event : FormEvent) {
        event.preventDefault();
        
        if(filterProducts) {
            filterProducts({id : Number(idProduct)})
        }
    }

    let history = useHistory();

    return (
        <div className="container-nav">
            <div className="content-nav">

                <img
                    src={logoMob} alt='logo-mob'
                    onClick={() => history.push('/')}
                    style={{ cursor: 'pointer' }}
                />

                <h3>
                    {title}
                </h3>
                {
                    title === 'Eventos de Massiva' ?

                        <form onSubmit={handleSubmitSearch}>
                            <input onChange={e => setIdProduct(e.target.value)} placeholder='Buscar pelo ID ..' />
                        </form> : <div style={{ width: '170px' }}></div>
                }

            </div>
        </div>
    );
}