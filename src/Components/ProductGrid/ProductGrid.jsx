import React, {PureComponent} from 'react';
import styles from './ProductGrid.module.css';
import ProductCard from '../ProductCard/ProductCard';
import DataContext from '../../Context/DataContext';

export class ProductGrid extends PureComponent {
    static contextType = DataContext;

    componentDidMount() {
        console.log('context', this.context);
    }

    render () {
        return (
            <div className={styles.product_grid}>
                {this.context.products.map(details => {
                    return (
                        <ProductCard key={details.id} details={details}/>
                    );
                })}
            </div>
        )
    }
}

export default ProductGrid;