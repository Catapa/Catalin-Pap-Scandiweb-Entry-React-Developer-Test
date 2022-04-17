import React, {PureComponent} from 'react';
import styles from './CartItemCard.module.css';


// TODO: Create a 'minimize' prop so that you can choose whether to show a big or minimized version of the card (e.g. CartOverlay vs. CartPage)
export class CartItemCard extends PureComponent {
    render () {
        return (
            <div className={styles.item_card}>
                <div className={styles.product_info}>
                    <div>
                        <p className={styles.product_info__name}>Apollo Running Short</p>
                        <p className={styles.product_info__price}>$50.00</p>
                    </div>
                    <div className={styles.product_info__sizes}>
                        <button className={styles.button}>S</button>
                        <button className={`${styles.button} ${styles.button_disabled}`}>M</button>
                    </div>
                </div>

                <div className={styles.quantity_selector}>
                    <button className={styles.button}>-</button>
                    <span className={styles.quantity_label}>1</span>
                    <button className={styles.button}>+</button>
                </div>

                <img src={'./assets/demo_cart.svg'} alt={'product'}  className={styles.image}/>
            </div>
        )
    }
}

export default CartItemCard;