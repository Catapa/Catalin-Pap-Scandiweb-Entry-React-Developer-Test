import React, {PureComponent} from 'react';
import styles from './ProductGrid.module.css';
import ProductCard from '../ProductCard/ProductCard';

export class ProductGrid extends PureComponent {
    render () {
        return (
            <div className={styles.product_grid}>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        )
    }
}

export default ProductGrid;