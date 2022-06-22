import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';
import {BrowserRouter, Navigate} from 'react-router-dom';
import {Route, Routes} from 'react-router';
import ProductListingPage from './Pages/ProductListingPage/ProductListingPage';
import ProductDescriptionPage from './Pages/ProductDescriptionPage/ProductDescriptionPage';
import CartPage from './Pages/CartPage/CartPage';

export const client = new ApolloClient({
    uri: 'http://localhost:4000/', // endpoint running on port 4000
    cache: new InMemoryCache()
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/*'} element={<App/>}>
                        <Route exact path={'products/*'} element={<ProductListingPage/>}/>
                        <Route exact path={`product/*`} element={<ProductDescriptionPage/>}/>
                        <Route exact path={'cart'} element={<CartPage/>}/>
                        <Route path={'*'} element={<Navigate to={'products/?category=all'}/>}/> {/* TODO: find a non-hard-coded solution for this (optional) */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);
