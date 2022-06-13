import React, {PureComponent} from 'react';
import './App.css';
import styles from './styles.module.css';
import {Outlet} from 'react-router-dom';
import {Route, Routes} from "react-router";

import ProductListingPage from "./Pages/ProductListingPage/ProductListingPage";
import Header from "./Components/Header/Header";
import ProductDescriptionPage from "./Pages/ProductDescriptionPage/ProductDescriptionPage";
import CartPage from "./Pages/CartPage/CartPage";

import DataContext, { DataProvider } from './Context/DataContext';


class App extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        if (!JSON.parse(window.sessionStorage.getItem("productsInCart")))
            window.sessionStorage.setItem('productsInCart', JSON.stringify([]));
    }
    render () {
        return (
            <DataProvider value={this.context}>
                <Header/>
                <Outlet/>
            </DataProvider>

        );
    }
}

export default App;
