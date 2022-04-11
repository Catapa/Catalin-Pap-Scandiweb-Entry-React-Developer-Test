import React from 'react';
import './App.css';
import styles from './styles.module.css';
import Header from "./Components/Header/Header";
import Heading from "./Components/Heading/Heading";
import ProductGrid from "./Components/ProductGrid/ProductGrid";

function App() {
  return (
      <>
          <Header/>
          <Heading text={'Category Name'}/>
          <ProductGrid/>
      </>

  );
}

export default App;
