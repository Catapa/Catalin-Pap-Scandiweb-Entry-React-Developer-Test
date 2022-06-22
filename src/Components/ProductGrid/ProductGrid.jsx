import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './ProductGrid.module.css';
import ProductCard from '../ProductCard/ProductCard';
import DataContext from '../../Context/DataContext';

/**
 * Component that displays multiple ProductCard components in grid format
 */
export class ProductGrid extends PureComponent {
    static contextType = DataContext;
    /**
     * @constructor
     * @param {any} props
     **/
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className={styles.product_grid}>
                {this.props.products.map(details => {
                    return (
                        <ProductCard className={styles} key={details.id} details={details}/>
                    );
                })}
            </div>
        )
    }
}
export default ProductGrid;

ProductGrid.propTypes = {
    /** The list of products that should be displayed */
    products: PropTypes.array.isRequired
}