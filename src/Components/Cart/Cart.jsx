import React, {PureComponent} from 'react';
import styles from './Cart.module.css';
import CartOverlay from "../CartOverlay/CartOverlay";
import DataContext from "../../Context/DataContext";

class Cart extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            showCartOverlay: false
        }
    }
    toggleCartOverlay = () => {
        if (this.state.showCartOverlay === true) {
            this.setState({
                showCartOverlay: false
            })
        }
        else {
            this.setState({
                showCartOverlay: true
            })
        }
    }
    render() {
        const cartItemsCounter = this.context.productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.quantity
            , 0
        );
        return (
            <span onClick={this.toggleCartOverlay} className={styles.container}>
                <img src={'assets/empty_cart_black.svg'} alt={'cart'}
                     className={styles.cart_image}/>
                     <span className={styles.items_counter} style={{display: (cartItemsCounter) ? "flex": "none"}}>{cartItemsCounter}</span>
                <CartOverlay visible={this.state.showCartOverlay}/>
            </span>
        );
    }
}
export default Cart;