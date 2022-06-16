import React, {PureComponent} from 'react';
import Heading from '../../Components/Heading/Heading';
import ProductGrid from '../../Components/ProductGrid/ProductGrid';
import DataContext from '../../Context/DataContext';

export class ProductListingPage extends PureComponent {
    static contextType = DataContext;
    render () {
        return (
            <>
                <Heading text={this.context.category}/>
                <ProductGrid/>
            </>
        )
    }
}
export default ProductListingPage;