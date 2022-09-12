import menuIcon from '../../assets/menuIcon.svg';
import massivas from '../../assets/massivas.svg';
import canais from '../../assets/canais.svg';

import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';

interface NavBarProps {
    expand: boolean | undefined;
}

export function NavBar({expand}: NavBarProps) {
    return (
        <Navbar expand={expand} className="mb-3" key={Number(expand)}>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                <img src={menuIcon} alt="menu-icon" />MENU
            </Navbar.Toggle>
            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} />
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="/">
                            <img src={massivas} alt='massivas' />
                            Eventos de Massiva
                        </Nav.Link>
                        <Nav.Link href="/communication">
                            <img src={canais} alt='canais-de-comunicação' />
                            Canais de Comunicação
                        </Nav.Link>
                    </Nav>

                </Offcanvas.Body>
            </Navbar.Offcanvas>

        </Navbar>
    )
}