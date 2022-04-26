import React from 'react';
import './App.css';
import styles from './styles.module.css';
import {Outlet} from 'react-router-dom';
import {Route, Routes} from "react-router";

import ProductListingPage from "./Pages/ProductListingPage/ProductListingPage";
import Header from "./Components/Header/Header";
import ProductDescriptionPage from "./Pages/ProductDescriptionPage/ProductDescriptionPage";
import CartPage from "./Pages/CartPage/CartPage";

import { DataProvider } from './Context/DataContext';


function App() {
    const data = {currency: {label: "pumni in gura", symbol: "@"}};
    const setData = () => {};
  return (
      <DataProvider>
          <Header/>
          <Outlet/>
      </DataProvider>

  );
}

export default App;
