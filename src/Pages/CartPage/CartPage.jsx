import React, {Component} from 'react';
import styles from './CartPage.module.css';
import CartItemCard from "../../Components/CartItemCard/CartItemCard";
import DataContext from "../../Context/DataContext";
import Heading from "../../Components/Heading/Heading";


export class CartPage extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            cartItemsQuantity: 0
        }
    }


    // componentDidUpdate = (prevProps, prevState, snapshot) => {
    //     this.setState({
    //         ...prevState,
    //         cartItemsQuantity: this.context.productsInCart.reduce(
    //             (accumulator, product) =>
    //                 accumulator +
    //                 product.quantity
    //             , 0
    //         )
    //     })
    // }
    // shouldComponentUpdate = () => {
    //     console.log('check');
    //     const cartItemsQuantity = this.context.productsInCart.reduce(
    //         (accumulator, product) =>
    //             accumulator +
    //             product.quantity
    //         , 0
    //     )
    //     return cartItemsQuantity !== this.state.cartItemsQuantity;
    // }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("kurwa");
        return nextContext !== this.context;
    }


    placeOrder = () => {
        alert('Order placed successfully');
    }
    // TODO: fix re-render problems on context change
    render () {
        const cartItemsTotal = this.context.productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.prices.find(price => price.currency.label === this.context.currency.label).amount *
                product.quantity
            , 0
        );
        const cartItemsQuantity = this.context.productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.quantity
            , 0
        );
        return (
            <div className={styles.page}>
                <h1>Cart</h1>
                {
                    this.context.productsInCart.map(product => {
                        if (product.quantity > 0)
                            return (
                                <CartItemCard key={product.id} details={product} big_format={true}/>
                            );
                    })
                }
                <section>
                    <p>
                        <span className={styles.label}>Tax 21%: </span>
                        <span className={styles.value}>{this.context.currency.symbol}{((21 * cartItemsTotal)/100).toFixed(2)}</span>
                    </p>
                    <p>
                        <span className={styles.label}>Quantity: </span>
                        <span className={styles.value}>{cartItemsQuantity}</span>
                    </p>
                    <p>
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