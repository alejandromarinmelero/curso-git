import React, { useState, useEffect, createContext } from 'react'

export const NewContext:any = createContext({});

const GlobalContext = ({ children }:any) => {

    const [products, setProducts] = useState<[]>([]);
    const [categories, setCategories] = useState<[]>([]);
    const [ filteredProducts, setFilteredProducts ] = useState<[]>([]);


    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    // Obtener 20 productos
    const getProducts = async () => {
        const getData = await fetch('https://api.escuelajs.co/api/v1/products', { method: 'GET' });
        const productsData = await getData.json();
        const getFirstTwentyProducts = productsData.filter((producto: any) => producto.id <= 31);
        setProducts(getFirstTwentyProducts);
    }


    // Obtener Categorias
    const getCategories = async () => {
        const getData = await fetch('https://api.escuelajs.co/api/v1/categories', { method: 'GET' });
        const categoriesData = await getData.json();
        categoriesData.pop();       
        setCategories(categoriesData)
    }

    const filter = (e:any) => {
        e.preventDefault();

        const form:HTMLFormElement = e.target;

        const formData = new FormData(form);
       
        let newValues:number[] = [];

        for (const values of formData) {
            newValues.push(Number(values[1]));
        }

        let filterProducts:[] = products.filter((product:any) => product.price >= newValues[0] && product.price <= newValues[1]);

        console.log(filterProducts);

        setFilteredProducts(filterProducts);
        
        
    }
    

    return (
        <NewContext.Provider value={{categories, products, filter}}>
            {children}
        </NewContext.Provider>
    )
}

export default GlobalContext