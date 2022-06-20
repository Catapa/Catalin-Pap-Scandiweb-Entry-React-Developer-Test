import React, {PureComponent} from 'react';
import Heading from '../../Components/Heading/Heading';
import ProductGrid from '../../Components/ProductGrid/ProductGrid';
import DataContext from '../../Context/DataContext';
import {client} from "../../index";
import {PRODUCTS_BY_CATEGORY} from "../../Queries/queries";

export class ProductListingPage extends PureComponent {
    static contextType = DataContext;
    constructor() {
        super();
    }
    //Get product's info from the search params of the URL
    querySearchParam = (paramName) => {
        const params = new URLSearchParams(window.location.search);
        const paramValue = params.get(paramName);
        return paramValue;
    }
    queryProducts(category) {
        try {
            client.query({query: PRODUCTS_BY_CATEGORY, variables: {title: category}})
                .then(result => {
                    const {name, products} = result.data.category;
                    this.context.setData({category: category, products: products});
                    return products;
                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (error) {
            console.log('Error on queryProducts', error);
        }
    }
    render () {
        const categoryName = this.querySearchParam('category');
        this.queryProducts(categoryName);
        return (
            <>
                <Heading text={categoryName}/>
                <ProductGrid products={this.context.products}/>
            </>
        )
    }
}
export default ProductListingPage;