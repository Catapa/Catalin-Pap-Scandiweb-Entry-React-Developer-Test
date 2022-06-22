import React, {PureComponent} from 'react';
import './App.css';
import {Outlet} from 'react-router-dom';
import Header from "./Components/Header/Header";
import DataContext, { DataProvider } from './Context/DataContext';


class App extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        if (!JSON.parse(window.sessionStorage.getItem('productsInCart')))
            window.sessionStorage.setItem('productsInCart', JSON.stringify([]));
        if (!JSON.parse(window.sessionStorage.getItem('currency')))
            window.sessionStorage.setItem('currency', JSON.stringify({symbol: '$', label: 'USD'}));
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
