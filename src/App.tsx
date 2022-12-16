import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Categories from './componentes/Categories/Categories';
import Home from './componentes/Home/Home';
import Products from './componentes/Products/Products';
import Sidebar from './componentes/Sidebar/Sidebar';
import GlobalContext from './Context/GlobalContext';

function App() {
  return (
    <GlobalContext>
      <BrowserRouter>
        <div className="App">
          <Sidebar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products/' element={<Products />}></Route>
            <Route path='/categories/:categoryId' element={<Categories />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalContext>
  );
}

export default App;
