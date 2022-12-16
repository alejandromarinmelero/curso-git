import React, { useContext, useState } from 'react'
import './style.scss';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NewContext } from '../../Context/GlobalContext';
import Accordion from 'react-bootstrap/Accordion';

const Sidebar = () => {

    const { categories }: any = useContext(NewContext);

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='sidebar'>
            <Button variant="primary" onClick={handleShow}>
                <img src='https://img.icons8.com/ios/30/1A1A1A/menu--v1.png' alt='menu-img'></img>
                <span>Menu</span>
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>ShopOnline</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Link to='/'>Home</Link>
                    <Link to='/products'>All Products</Link>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Categories</Accordion.Header>
                            <Accordion.Body>
                                {categories.map((category: any) => {
                                    return <Link className={category.name}
                                        to={`/categories/${category.name}`}
                                        key={category.id}>{category.name}</Link>
                                })}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </div>

    )
}

export default Sidebar