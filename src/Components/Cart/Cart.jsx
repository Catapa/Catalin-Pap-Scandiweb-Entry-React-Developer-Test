import React, {PureComponent} from 'react';
import styles from './Cart.module.css';
import CartOverlay from "../CartOverlay/CartOverlay";

class Cart extends PureComponent {
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
        return (
            <span onClick={this.toggleCartOverlay}>
                <img src={'assets/empty_cart_black.svg'} alt={'cart'}
                     className={styles.cart_image}/>
                <CartOverlay visible={this.state.showCartOverlay}/>
            </span>
        )
    }
}
export default Cart;