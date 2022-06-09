import React, {PureComponent} from 'react';
import styles from './CartOverlay.module.css';
import Backdrop from "../Backdrop/Backdrop";
import CartItemCard from "../CartItemCard/CartItemCard";
import DataContext from "../../Context/DataContext";
import {Link} from "react-router-dom";

export class CartOverlay extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
    }

    render() {
        const {visible} = this.props;
        const visibilityClass = visible ? styles.show : styles.hidden;
        const cartItemsCount = this.context.productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.quantity
            , 0
        );
        const cartItemsTotal = this.context.productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.prices.find(price => price.currency.label === this.context.currency.label).amount *
                product.quantity
            , 0
        );

        return (
            <div className={visibilityClass}>
                <div className={styles.container}>
                    {/*Heading*/}
                    <span className={styles.heading}>
                        <span className={styles.heading__title}>my bag</span>
                        <span className={styles.heading__items_count}>, {cartItemsCount} items</span>
                    </span>
                    {/*Items*/}
                    <span className={styles.items}>
                        {
                            this.context.productsInCart.map(product => {
                                if (product.quantity > 0)
                                    return (
                                        <CartItemCard key={product.id} details={product}/>
                                    );
                            })
                        }
                    </span>
                    {/*Total*/}
                    <span className={styles.total}>
                        <span className={styles.total__label}>total</span>
                        <span className={styles.total__amount}>{this.context.currency.symbol}{cartItemsTotal.toFixed(2)}</span>
                    </span>
                    {/*Buttons*/}
                    <span className={styles.actions}>
                        <Link to={'/cart'} className={styles.actions__button}>view bag</Link>
                        <button className={`${styles.actions__button} ${styles.contrast}`}>check out</button>
                    </span>

                </div>
            </div>
        )
    }
}

export default CartOverlay;