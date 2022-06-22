import React, {PureComponent} from 'react';
import Heading from '../../Components/Heading/Heading';
import ProductGrid from '../../Components/ProductGrid/ProductGrid';
import DataContext from '../../Context/DataContext';
import {client} from "../../index";
import {PRODUCTS_BY_CATEGORY} from "../../Queries/queries";
import {handleError, querySearchParam} from '../../utils/utils';

export class ProductListingPage extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
    }
    queryProducts(category) {
        try {
            client.query({query: PRODUCTS_BY_CATEGORY, variables: {title: category}})
                .then(result => {
                    const { products } = result.data.category;
                    this.context.setData({category: category, products: products});
                    return products;
                })
                .catch(error => {
                    handleError(error);
                });
        }
        catch (error) {
            handleError(`Error on queryProducts ${error}`);
        }
    }
    render () {
        const categoryName = querySearchParam('category');
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