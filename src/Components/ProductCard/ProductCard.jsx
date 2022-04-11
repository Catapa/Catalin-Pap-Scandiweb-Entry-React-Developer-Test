import React, {PureComponent} from 'react';
import styles from './ProductCard.module.css';

export class ProductCard extends PureComponent {
    render () {
        return (
            <div className={styles.product_card}>
                <img src={'assets/demo_product.svg'} alt={'product image'} className={styles.product_image}/>
                <button className={styles.product_buy_button}>
                    <img src={'assets/empty_cart_white.svg'} alt={'Add to cart'}/>
                </button>
                <span className={styles.product_name}>Apollo Running Short</span>
                <span className={styles.product_price}>$50.00</span>
            </div>
        )
    }
}

export default ProductCard;