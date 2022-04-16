import React, {PureComponent} from 'react';
import Heading from "../../Components/Heading/Heading";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";

export class ProductListingPage extends PureComponent {
    render () {
        return (
            <>
                <Heading text={'Category Name'}/>
                <ProductGrid/>
            </>
        )
    }
}

export default ProductListingPage;