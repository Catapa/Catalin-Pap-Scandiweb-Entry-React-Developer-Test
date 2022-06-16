import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';
import {Route, Routes} from 'react-router';
import ProductListingPage from './Pages/ProductListingPage/ProductListingPage';
import ProductDescriptionPage from './Pages/ProductDescriptionPage/ProductDescriptionPage';
import CartPage from './Pages/CartPage/CartPage';

export const client = new ApolloClient({
    uri: 'http://localhost:4000/', // endpoint running on port 4000
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<App/>}>
                        <Route path={'/'} element={<ProductListingPage/>}/>
                        <Route path={`product/*`} element={<ProductDescriptionPage/>}/>
                        <Route path={'cart'} element={<CartPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ApolloProvider>

    </React.StrictMode>,
    document.getElementById('root')
);
