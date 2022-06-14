import React, {PureComponent} from 'react';
import styles from './Cart.module.css';
import CartOverlay from '../CartOverlay/CartOverlay';
import DataContext from '../../Context/DataContext';
import Backdrop from '../Backdrop/Backdrop';
import empty_cart_black from '../../Graphics/empty_cart_black.svg';

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
        const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
        const cartItemsCounter = productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.quantity
            , 0
        );
        return (
            <span>
                <Backdrop visible={this.state.showCartOverlay} onClick={this.toggleCartOverlay}/>
                <span onClick={this.toggleCartOverlay} className={styles.container}>
                    <img src={empty_cart_black} alt={'cart'}
                         className={styles.cart_image}/>
                         <span className={styles.items_counter}
                               style={{display: (cartItemsCounter) ? "flex" : "none"}}>{cartItemsCounter}</span>
                </span>
                <CartOverlay visible={this.state.showCartOverlay}/>
            </span>
        );
    }
}
export default Cart;