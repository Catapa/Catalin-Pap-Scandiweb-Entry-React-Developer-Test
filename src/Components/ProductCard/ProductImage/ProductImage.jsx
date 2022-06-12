import React, {PureComponent} from 'react';
import styles from './ProductImage.module.css';

export class ProductImage extends PureComponent {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <span className={styles.container}>
                { !this.props.inStock && <span className={styles.overlay}/> }
                { !this.props.inStock && <span className={styles.label}>out of stock</span> }
                <img  src={this.props.src} alt={'out of stock'} className={styles.product_image}/>
            </span>
    )
    }
}
export default ProductImage;