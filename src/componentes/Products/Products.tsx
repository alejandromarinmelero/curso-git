import React, { useContext, useState } from 'react';
import './style.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/esm/Spinner';
import { NewContext } from '../../Context/GlobalContext';
import { FormGroup } from 'react-bootstrap';

const Products = () => {

    const { products, categories, filter }: any = useContext(NewContext)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    

    return (
        <div className='products-section'>
            <h1>Products</h1>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>

            <Button className='filter-button' variant="primary" onClick={handleShow}>
                <img src="https://img.icons8.com/ios/35/null/sorting-options--v1.png" alt="" />
                Filters
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => {filter(e)}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option disabled={true}>Choose Category</option>
                                {categories.map((category: any) => {
                                    return <option key={category.id}>{category.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Group className="select-price">
                                <span>From</span>
                                <Form.Control type="number" placeholder="0" name='from'/>
                                <span>to</span>
                                <Form.Control type="number" placeholder="100" name='to'/>
                            </Form.Group>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Filter
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            {
                products.length > 0 ?
                    <div className='products'>
                        {products.map((product: any) => {
                            return <Card key={product.id}>
                                <Card.Img variant="top" src={product.images[0]} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text>Price:{product.price}</Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Link href="#">Card Link</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body>
                            </Card>
                        })}
                    </div>
                    :
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
            }
        </div>
    )
}

export default Products