import React, { useState, useEffect, createContext } from 'react'
import { useParams } from 'react-router-dom';

export const NewContext: any = createContext({});

const GlobalContext = ({ children }: any) => {

    const { filtered } = useParams();

    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<[]>([]);


    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    // Obtener 20 productos
    const getProducts = async () => {
        const getData = await fetch('https://api.escuelajs.co/api/v1/products', { method: 'GET' });
        const productsData = await getData.json();
        const getSomeProducts = productsData.filter((producto: any) => producto.id <= 31);
        setProducts(getSomeProducts);
    }


    // Obtener Categorias
    const getCategories = async () => {
        const getData = await fetch('https://api.escuelajs.co/api/v1/categories', { method: 'GET' });
        const categoriesData = await getData.json();
        categoriesData.pop();
        setCategories(categoriesData)
    }

    // Filtrar productos
    const filter = (e: any) => {

        e.preventDefault();

        const form = e.target;

        const formData = new FormData(form);

        let newValues: any = {};

        for (const [name, values] of formData) {
            newValues[name] = values;
        }


        if (Object.keys(newValues).length !== 0) {

            if (newValues.select !== 'Choose Category') {
                let filterCategory: any[] = products.filter((product: any) => product.category.name === newValues.select);
                // Filtrar precio
                if ((newValues.from !== '' && newValues.to !== '') || (newValues.from === '' && newValues.to !== '')) {
                    let filterPriceByCategory: any[] = filterCategory.filter((product: any) => product.price >= newValues.from.toString() && product.price <= newValues.to.toString());
                    setProducts([]);
                    setProducts(filterPriceByCategory);
                    setFilteredProducts(filterPriceByCategory);
                } else if ((newValues.from !== '' && newValues.to === '') || (newValues.from === '' && newValues.to === '')) {
                    setProducts([]);
                    setProducts(filterCategory);
                    setFilteredProducts(filterCategory);
                }
            } else {
                // Filtrar precio
                let filterPrice: any[] = products.filter((product: any) => product.price >= newValues.from.toString() && product.price <= newValues.to.toString());

                setProducts([]);
                setProducts(filterPrice);
                setFilteredProducts(filterPrice);
            }
        }

    }

    // Eliminar filtros
    const deletedFilters = () => {
        setFilteredProducts([]);
        getProducts();
    }


    return (
        <NewContext.Provider value={{ categories, products, setProducts, filter, filteredProducts, deletedFilters }}>
            {children}
        </NewContext.Provider>
    )
}

export default GlobalContext