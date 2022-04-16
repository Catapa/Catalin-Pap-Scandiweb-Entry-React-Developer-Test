import React, {PureComponent} from 'react';
import Header from "../../Components/Header/Header";
import Heading from "../../Components/Heading/Heading";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";

export class ProductListingPage extends PureComponent {
    render () {
        return (
            <>
                <Header/>
                <Heading text={'Category Name'}/>
                <ProductGrid/>
            </>
        )
    }
}

export default ProductListingPage;