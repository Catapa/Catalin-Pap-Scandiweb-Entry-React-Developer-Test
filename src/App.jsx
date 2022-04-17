import React from 'react';
import './App.css';
import styles from './styles.module.css';

import ProductListingPage from "./Pages/ProductListingPage/ProductListingPage";
import Header from "./Components/Header/Header";
import ProductDescriptionPage from "./Pages/ProductDescriptionPage/ProductDescriptionPage";
import CartPage from "./Pages/CartPage/CartPage";

function App() {
  return (
      <>
          <Header/>
          {/*<ProductListingPage/>*/}
          {/*<ProductDescriptionPage/>*/}
          <CartPage/>
      </>

  );
}

export default App;
