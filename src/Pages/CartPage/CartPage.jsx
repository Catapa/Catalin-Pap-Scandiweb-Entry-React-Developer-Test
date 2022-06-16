import React, {Component} from 'react';
import styles from './CartPage.module.css';
import CartItemCard from "../../Components/CartItemCard/CartItemCard";
import DataContext from "../../Context/DataContext";

export class CartPage extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            cartItemsQuantity: 0
        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextContext !== this.context;
    }

    placeOrder = () => {
        alert('Order placed successfully');
    }
    render () {
        const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
        const cartItemsTotal = productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.prices.find(price => price.currency.label === this.context.currency.label).amount *
                product.quantity
            , 0
        );
        const cartItemsQuantity = productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.quantity
            , 0
        );
        return (
            <div className={styles.page}>
                <h1 className={styles.heading}>Cart</h1>
                {
                    productsInCart.map(product => {
                        // if (product.quantity > 0)
                            return (
                                <CartItemCard key={`${product.id} ${JSON.stringify(product.attributesSelect)}`} details={product} big_format={true}/>
                            );
                    })
                }
                <section className={styles.summary}>
                    <p className={styles.summary_line}>
                        <span className={styles.label}>Tax 21%: </span>
                        <span className={styles.value}>{this.context.currency.symbol}{((21 * cartItemsTotal)/100).toFixed(2)}</span>
                    </p>
                    <p className={styles.summary_line}>
                        <span className={styles.label}>Quantity: </span>
                        <span className={styles.value}>{cartItemsQuantity}</span>
                    </p>
                    <p className={styles.summary_line}>
                        <span className={styles.total_label}>Total: </span>
                        <span className={styles.total_value}>{this.context.currency.symbol}{cartItemsTotal.toFixed(2)}</span>
                    </p>
                    <button className={`${styles.button} ${styles.contrast}`} onClick={this.placeOrder}>order</button>
                </section>
            </div>
        )
    }
}
export default CartPage;