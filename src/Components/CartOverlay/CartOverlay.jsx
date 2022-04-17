import React, {PureComponent} from 'react';
import styles from './CartOverlay.module.css';
import Backdrop from "../Backdrop/Backdrop";
import CartItemCard from "../CartItemCard/CartItemCard";

export class CartOverlay extends PureComponent {
    render () {
        return (
            <div>
                <Backdrop/>


                <div className={styles.container}>
                    {/*Heading*/}
                    <span className={styles.heading}>
                        <span className={styles.heading__title}>my bag</span>
                        <span className={styles.heading__items_count}>, 2 items</span>
                    </span>

                    {/*Items*/}
                    <span className={styles.items}>
                        <CartItemCard/>
                        <CartItemCard/>
                        <CartItemCard/>
                    </span>
                    {/*Total*/}
                    <span className={styles.total}>
                        <span className={styles.total__label}>total</span>
                        <span className={styles.total__amount}>$100</span>
                    </span>

                    {/*Buttons*/}
                    <span className={styles.actions}>
                        <button className={styles.actions__button}>view bag</button>
                        <button className={`${styles.actions__button} ${styles.contrast}`}>check out</button>
                    </span>

                </div>
            </div>
        )
    }
}

export default CartOverlay;