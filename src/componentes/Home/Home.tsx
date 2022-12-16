import React, { useContext } from 'react'
import './style.scss';
import Carousel from 'react-bootstrap/Carousel';
import { NewContext } from '../../Context/GlobalContext';


const Home = () => {

    const { categories }: any = useContext(NewContext);
    

    return (
        <div className='home'>
            <h2>Home</h2>
            <div className='first-section'>
                <div className='title'>
                    <h1>Discover</h1>
                    <span>Our products</span>
                </div>
                <Carousel variant="dark" interval={1500}>
                    {categories.map((category: any) => {
                        return <Carousel.Item key={category.id}>
                            <img
                                className="d-block w-100"
                                src={category.image}
                                alt={category.name}
                            />
                        </Carousel.Item>
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default Home