import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './CartOverlay.module.css';
import CartItemCard from "../CartItemCard/CartItemCard";
import DataContext from "../../Context/DataContext";
import {Link} from "react-router-dom";

export class CartOverlay extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
    }
    checkOut = () => {
        alert("Successfully checked out");
        this.props.toggleCartOverlay();
    }
    render() {
        const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
        let {visible} = this.props;
        const cartItemsCount = productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.quantity
            , 0
        );
        const cartItemsTotal = productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.prices.find(price => price.currency.label === JSON.parse(window.sessionStorage.getItem('currency')).label).amount *
                product.quantity
            , 0
        );
        return (
            visible && <div>
                <div className={styles.container}>
                    {/*Heading*/}
                    <span className={styles.heading}>
                        <span className={styles.heading__title}>my bag</span>
                        <span className={styles.heading__items_count}>, {cartItemsCount} items</span>
                    </span>
                    {/*Items*/}
                    <span className={styles.items}>
                        {
                            productsInCart.map(product => {
                                    return  (
                                        <CartItemCard key={`${product.id} ${JSON.stringify(product.attributesSelect)}`} details={product} big_format={false}/>
                                    );
                            })
                        }
                    </span>
                    {/*Total*/}
                    <span className={styles.total}>
                        <span className={styles.total__label}>total</span>
                        <span className={styles.total__amount}>{JSON.parse(window.sessionStorage.getItem('currency')).symbol}{cartItemsTotal.toFixed(2)}</span>
                    </span>
                    {/*Buttons*/}
                    <span className={styles.actions}>
                        <Link to={'/cart'} className={styles.actions__button} onClick={this.props.toggleCartOverlay}>view bag</Link>
                        <button className={`${styles.actions__button} ${styles.contrast}`} onClick={this.checkOut}>check out</button>
                    </span>

                </div>
            </div>
        )
    }
}
export default CartOverlay;

CartOverlay.propTypes = {
    visible: PropTypes.bool.isRequired
}