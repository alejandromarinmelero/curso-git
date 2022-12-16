import React, { useContext, useEffect, useState } from 'react'
import './style.scss';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/esm/Spinner';
import { NewContext } from '../../Context/GlobalContext';
import { useParams } from 'react-router-dom';

const Categories = () => {

    const { categoryId } = useParams();

    const { products }: any = useContext(NewContext);

    const [selectedProducts, setSelectedProducts] = useState<[]>([]);

    useEffect(() => {
        const productByCategory = products.filter((product: any) => product.category.name === categoryId);
        setSelectedProducts(productByCategory)

    }, [categoryId, products]);

    console.log(selectedProducts);



    return (
        <div className='categories-section'>
            <h1>{categoryId}</h1>
            <div className='categories'>
                {selectedProducts.map((product: any) => {
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

        </div>
    )
}

export default Categories