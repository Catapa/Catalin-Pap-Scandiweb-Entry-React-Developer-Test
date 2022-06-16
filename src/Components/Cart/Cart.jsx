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
    closeCartOverlayOnBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.setState({
                showCartOverlay: false
            })
        }
    }
    componentDidMount() {
        try {
            const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
            this.context.setData({productsInCart: productsInCart});
        }
        catch (error) {
            console.log(error);
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
            <span tabIndex={4} onBlur={(e) => this.closeCartOverlayOnBlur(e)}>
                <Backdrop visible={this.state.showCartOverlay} onClick={this.toggleCartOverlay}/>
                <span onClick={this.toggleCartOverlay} className={styles.container}>
                    <img src={empty_cart_black} alt={'cart'}
                         className={styles.cart_image}/>
                         <span className={styles.items_counter}
                               style={{display: (cartItemsCounter) ? "flex" : "none"}}>{cartItemsCounter}</span>
                </span>
                <CartOverlay visible={this.state.showCartOverlay} toggleCartOverlay={this.toggleCartOverlay}/>
            </span>
        );
    }
}
export default Cart;