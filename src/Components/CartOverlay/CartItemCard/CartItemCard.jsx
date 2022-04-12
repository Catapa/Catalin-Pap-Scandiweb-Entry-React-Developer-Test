import React, {PureComponent} from 'react';
import styles from './CartItemCard.module.css';

export class CartItemCard extends PureComponent {
    render () {
        return (
            <div className={styles.item_card}>
                    Item in cart
            </div>
        )
    }
}

export default CartItemCard;