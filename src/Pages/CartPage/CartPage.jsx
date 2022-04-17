import React, {PureComponent} from 'react';
import styles from './CartPage.module.css';
import CartItemCard from "../../Components/CartItemCard/CartItemCard";


export class CartPage extends PureComponent {
    render () {
        return (
            <div className={styles.page}>
                {/* TODO: display big versions of CartItemCard */}
                <CartItemCard/>
                <CartItemCard/>
                <CartItemCard/>
            </div>
        )
    }
}

export default CartPage;