import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './ProductImage.module.css';

/**
 * Component that contains a product's image inside a ProductCard component
 */
export class ProductImage extends PureComponent {
    /**
     * @constructor
     * @param {any} props
     **/
    constructor(props) {
        super(props);
    }
    render () {
        const {inStock, src} = this.props;
        return (
            <span className={styles.container}>
                { !inStock && <span className={styles.overlay}/> }
                { !inStock && <span className={styles.label}>out of stock</span> }
                <img  src={src} alt={src} className={styles.product_image}/>
            </span>
    )
    }
}
export default ProductImage;

ProductImage.propTypes = {
    /** Specify whether the product is in stock or not */
    inStock: PropTypes.bool.isRequired,
    /** The path to image that should be displayed */
    src: PropTypes.string.isRequired
}