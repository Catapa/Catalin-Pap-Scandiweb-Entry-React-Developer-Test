import React, {PureComponent} from 'react';
import styles from './ProductCard.module.css';
import {Link} from "react-router-dom";

export class ProductCard extends PureComponent {
    constructor(props) {
        super(props);
    }

    gotoProductPage() {

    }

    render () {
        const {brand, name} = this.props.details;
        return (
            <Link to={'/product'}>
                <div className={styles.product_card}>
                    <img src={'assets/demo_product.svg'} alt={'product image'} className={styles.product_image}/>
                    <button className={styles.product_buy_button}>
                        <img src={'assets/empty_cart_white.svg'} alt={'Add to cart'}/>
                    </button>
                    <span className={styles.product_name}>{brand} {name}</span>
                    <span className={styles.product_price}>$50.00</span>
                </div>
            </Link>
        );
    }
}

export default ProductCard;