import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './ProductImage.module.css';

export class ProductImage extends PureComponent {
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
    inStock: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired
}